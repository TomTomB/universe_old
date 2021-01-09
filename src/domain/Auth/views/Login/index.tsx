import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import Input from '../../../UiKit/components/form/Input';

interface Values {
  password: string;
  email: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const LoginView = () => {
  return (
    <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Input label="E-Mail" name="email" id="kuchen" type="email" />
            <Input
              label="Password"
              name="password"
              id="password"
              type="password"
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginView;
