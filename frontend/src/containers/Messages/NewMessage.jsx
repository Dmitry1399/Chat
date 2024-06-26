import { Formik, Form } from 'formik';
import { FormGroup, FormControl } from 'react-bootstrap';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux"
import { useAddMessageMutation } from '../../Api/homeMessagesApi.js';



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
                aria-label={'Новое сообщение'}
                placeholder={'Введите новое сообщение'}
                className="border-0 p-0 ps-2 form-control"
                ref={inputRef}
                disabled={isSubmitting}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={!values.body.trim() || isSubmitting} style={{ border: 'none' }}>
                <img src={'https://img.lovepik.com/free-png/20220214/lovepik-yellow-duck-png-image_400973987_wh860.png'} alt={'Отправить сообщение'} width="20" height="20" />
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormGroup>
  );
};

export default NewMessage;