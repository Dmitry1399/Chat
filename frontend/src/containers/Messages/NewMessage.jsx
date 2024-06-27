import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

import { useAddMessageMutation } from '../../api/homeMessagesApi.js';

const NewMessage = () => {
  const [addMessage, { data }] = useAddMessageMutation();
  const { currentChannelId } = useSelector((state) => state.app);
  const { username } = useSelector((state) => state.auth);
  
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, data]);

  const handleAddMessage = async (body, resetForm) => {

    await addMessage({ body: body, channelId: currentChannelId, username });
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
                aria-label={'Ввндите сообщение...'}
                placeholder={'Новое сообщение'}
                className="border-0 p-0 ps-2 form-control"
                ref={inputRef}
                disabled={isSubmitting}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={!values.body.trim() || isSubmitting} style={{ border: 'none' }}>
                <img src={'#'} alt={'Отправить сообщение'} width="20" height="20" />
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormGroup>
  );
};

export default NewMessage;