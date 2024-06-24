import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup, FormControl, Button, FormFloating, FormLabel,
} from 'react-bootstrap';
import LoginComponent from "../сomponents/LoginComponent.jsx";
import useAuthContext from '../hooks/useAuthContext.js';
import { useLoginMutation } from '../Api/autheticateApi.js';
import { useDispatch } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../store/slices/auth.js';



const Login = () => {

  const { setAuth } = useAuthContext();
  const [login] = useLoginMutation();

  const dispatch = useDispatch();

  const setLocalStorageItem = useLocalStorage('set');

  const navigate = useNavigate();

const validateLoginSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
  try {
    const { token, username } = await login({ ...values }).unwrap();

    setLocalStorageItem('token', token);
    setLocalStorageItem('username', username);
    dispatch(setUserData({ token, username }));

    setSubmitting(false);
    setAuth(true);

    navigate('/');
  
  } catch (error) {
    setSubmitting(false);
    const { status } = error;

    switch (status) {
      case 0: {
        setErrors({password:'Ошибка сети'}); 
        break;
      }
      case 401: {
        setErrors({password:'Неверные имя пользователя или пароль'}); 
        break;
      }
      default: {
        setErrors({password:'Неизвестная ошибка'});
        break;
      }
    }
  }
};

  return (
    <LoginComponent>
      <Formik
      initialValues={{ username: '', password: ''}}
      onSubmit={handleFormSubmit}
      validationSchema={validateLoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      >
        {({ errors, values, handleChange, handleBlur, isSubmitting,

        }) => (
          <Form className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Войти</h1>

            <FormFloating className="mb-3">
              <FormControl
              name='username'
              id='username'
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={!!errors.password}
              autoFocus
              />
              <FormLabel htmlFor='password'>Ваш ник</FormLabel>
            </FormFloating>

            <FormFloating className="mb-3">
              <FormControl
              name='password'
              id='password'
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={!!errors.password}
              autoFocus
              />
              <FormLabel htmlFor='password'>Пароль</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.password}</FormGroup>
            </FormFloating>

            <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
            Войти
            </Button>
          </Form>
        )}
      </Formik>
    </LoginComponent>
  );
};

export default Login;