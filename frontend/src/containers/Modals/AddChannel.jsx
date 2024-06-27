import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useAddChannelMutation } from '../../api/homeChannelsApi.js';
import { changeChannel } from '../../store/slices/app.js';
import { toast } from 'react-toastify';

const AddChannel = ({ handleCloseModal }) => {
  const { channelNames } = useSelector((state) => state.app);

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .matches(/\S/, 'Обязательное поле')
      .required('Обязательное поле')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const [addChannel] = useAddChannelMutation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddNewChannel = async (channelName) => {
    const filteredChannelName = channelName;
    const newChannel = { name: filteredChannelName };
    const { data: { name, id } } = await addChannel(newChannel);

    toast.success('Канал создан', {
      position: 'top-right',
      autoClose: 2000,
    });

    handleCloseModal();
    dispatch(changeChannel({ name, id }));
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={({ name }) => handleAddNewChannel(name)}
      validationSchema={channelSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        errors, values, handleChange, isSubmitting,
      }) => (
        <Modal show centered onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{'Добавить канал'}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form disabled>
              <FormGroup>
                <FormControl name="name" id="name" className="mb-2" value={values.name} onChange={handleChange} isInvalid={!!errors.name} ref={inputRef} />
                <label htmlFor="name" className="visually-hidden">
                  {'Добавить канал'}
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

export default AddChannel;