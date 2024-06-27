import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useEditChannelMutation } from '../../api/homeChannelsApi.js';
import { toast } from 'react-toastify';

const RenameChannel = ({ handleCloseModal }) => {
  const { channelNames, editChannelId, editChannelName } = useSelector((state) => state.app);


  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .matches(/\S/, 'Обязательное поле')
      .required('Обязательное поле')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const [editChannel] = useEditChannelMutation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const handleRenameChannel = async (channelName) => {
    const newChannel = { id: editChannelId, name: channelName };
    await editChannel(newChannel);
    toast.success('Канал переименован', {
      position: 'top-right',
      autoClose: 2000,
    });
    handleCloseModal();
  };

  return (
    <Formik
      initialValues={{ name: editChannelName }}
      onSubmit={({ name }) => handleRenameChannel(name)}
      validationSchema={channelSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        errors, values, handleChange, isSubmitting,
      }) => (
        <Modal show centered onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{'Переименовать канал'}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <FormGroup>
                <FormControl name="name" id="name" className="mb-2" value={values.name} onChange={handleChange} isInvalid={!!errors.name} ref={inputRef} />
                <label htmlFor="name" className="visually-hidden">
                  {'Имя канала'}
                </label>
                <FormGroup className="invalid-feedback">{errors.name}</FormGroup>
                <FormGroup className="d-flex justify-content-end">
                  <Button variant="secondary" type="button" className="me-2" onClick={handleCloseModal}>
                    {'Отменить'}
                  </Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {'Отправить'}
                  </Button>
                </FormGroup>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default RenameChannel;