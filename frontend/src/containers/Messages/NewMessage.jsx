import { Formik, Form } from 'formik';
import { FormGroup, FormControl } from 'react-bootstrap';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux"



const NewMessage = () => {
    const { currentChannelId } = useSelector((state) => state.app);

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();

    }, [currentChannelId]);

    return (
        <FormGroup className="mt-auto px-5 py-3">
      <Formik initialValues={{ body: '' }} >
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
                <img src={'http://www.w3.org/2000/svg'} alt={'Отправить сообщение'} width="20" height="20" />
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormGroup>
  );
};

export default NewMessage;