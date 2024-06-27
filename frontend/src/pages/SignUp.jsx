import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import useAuthContext from "../hooks/useAuthContext";
import { useSignUpMutation } from "../api/authenticateApi";
import { useDispatch } from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";
import { setUserData } from "../store/slices/auth.js";
import SignupComponent from "../components/SignupComponent";
import { Formik, Form } from "formik";
import {
    FormGroup, FormControl, Button, FormFloating, FormLabel,
  } from 'react-bootstrap';
import signap from '../assets/signup.jpg'


const SignUp = () => {
   const navigate = useNavigate();
    const { setAuth } = useAuthContext();
    const [signUp] = useSignUpMutation();

    const dispatch = useDispatch();

    const setLocalStorageItem = useLocalStorage('set');

    const signupSchema = Yup.object().shape({
        username: Yup.string()
          .min(3, 'От 3 до 20 символов')
          .max(20, 'От 3 до 20 символов')
          .required('Обязательное поле'),
        password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли должны совпадать').required('Обязательное поле'),
      });
      const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
          const { token, username } = await signUp({ ...values }).unwrap();
    
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
              setErrors({ username: ' ', password: ' ', confirmPassword: 'Ошибка сети' });
              break;
            }
            case 409: {
              setErrors({ username: ' ', password: ' ', confirmPassword: 'Такой пользователь уже существует' });
              break;
            }
            default: {
              setErrors({ username: ' ', password: ' ', confirmPassword: 'Неизвестная ошибка' });
              break;
            }
          }
        }
      };
    return (
        <SignupComponent avatar={signap}>
            <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            onSubmit={handleFormSubmit}
            validationSchema={signupSchema}
            validateOnChange={false}
            validateOnBlur
            >
                 {({
          errors, values, handleChange, handleBlur, isSubmitting,
        }) => (
          <Form className="w-50">
            <h1 className="text-center mb-4">{'Регистрация'}</h1>
            <FormFloating className="mb-3">
              <FormControl
                name="username"
                id="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.username}
                autoFocus
              />
              <FormLabel htmlFor="username">{'Имя пользователя'}</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.username}</FormGroup>
            </FormFloating>

            <FormFloating className="mb-3">
              <FormControl
                type="password"
                name="password"
                id="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <FormLabel htmlFor="password">{'Пароль'}</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.password}</FormGroup>
            </FormFloating>

            <FormFloating className=" mb-4">
              <FormControl
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <FormLabel htmlFor="confirmPassword">{'Подтвердите пароль'}</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.confirmPassword}</FormGroup>
            </FormFloating>
            <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
              {'Зарегистрироваться'}
            </Button>
          </Form>
        )}
      </Formik>
    </SignupComponent>
  );
};

export default SignUp;