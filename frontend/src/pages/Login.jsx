import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup, FormControl, Button, FormFloating, FormLabel,
} from 'react-bootstrap';
import LoginComponent from "../сomponents/LoginComponent.jsx";



const Login = () => {

const validateLoginSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

  return (
    <LoginComponent>
      <Formik
      initialValues={{ username: '', password: ''}}
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