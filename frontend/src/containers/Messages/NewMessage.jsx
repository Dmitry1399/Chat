import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useAddMessageMutation } from '../../api/homeMessagesApi.js';
import sendButton from '../../assets/sendButton.png';

const NewMessage = () => {
  const [addMessage, { data }] = useAddMessageMutation();
  const { currentChannelId } = useSelector((state) => state.app);
  const { username } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, data]);

  const handleAddMessage = async (body, resetForm) => {
    const filteredMessage = filter.clean(body);

    await addMessage({ body: filteredMessage, channelId: currentChannelId, username });
    resetForm();
  };

  return (
    <FormGroup className="mt-auto px-5 py-3">
      <Formik initialValues={{ body: '' }} onSubmit={({ body }, { resetForm }) => handleAddMessage(body, resetForm)}>
        {({
          values, handleChange, isSubmitting,
        }) => (
          <Form noValidate className="py-1 border rounded-2">
            <FormGroup className="input-group has-validation">
              <FormControl
                type="text"
                name="body"
                value={values.body}
                onChange={handleChange}
                aria-label={t('homePage.newMessageInput')}
                placeholder={t('homePage.newMessagePlaceholder')}
                className="border-0 p-0 ps-2 form-control"
                ref={inputRef}
                disabled={isSubmitting}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={!values.body.trim() || isSubmitting} style={{ border: 'none' }}>
                <img src={sendButton} alt={t('homePage.sendMessageButton')} width="20" height="20" />
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormGroup>
  );
};

export default NewMessage;
