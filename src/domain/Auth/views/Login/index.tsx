import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames';
import Input from '../../../UiKit/components/form/Input';

interface Values {
  firstName: string;
  lastName: string;
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
      <h1>Hi</h1>
      <h2>Hi</h2>
      <h3>Hi</h3>
      <h4>Hi</h4>
      <h5>Hi</h5>
      <h6>Hi</h6>
      <p>Lorem ipsum</p>
      <p>
        Lorem ipsum <br /> with break
      </p>
      <ul className="title-list">
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
      <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
      <a href="https://google.com">Internal</a> <br />
      <a href="https://google.com" className="external">
        External
      </a>
      <br />
      <label htmlFor="hiddenInput1">
        A label
        <input id="hiddenInput1" type="hidden" />
      </label>
      <br />
      <label htmlFor="hiddenInput2" className="is-invalid">
        A invalid label
        <input id="hiddenInput2" type="hidden" />
      </label>
      <div>
        <h1>Sign up</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
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
          {({ isSubmitting, touched, errors }) => (
            <Form noValidate>
              <label
                htmlFor="firstName"
                className={`banner large ${
                  touched.firstName && Boolean(errors.firstName)
                    ? 'is-invalid'
                    : ''
                }`}
              >
                First Name
              </label>

              {/* This is not working */}
              <Input id="hallo1223" label="Hallo" name="hallo" />

              <Field id="firstName" name="firstName" placeholder="John" />

              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" placeholder="Doe" />
              <br />
              <label
                htmlFor="email"
                className={classNames({
                  'is-invalid': touched.email && Boolean(errors.email),
                })}
              >
                Email
              </label>
              <br />
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
              />
              <br />
              {touched.email && errors.email && <p>{errors.email}</p>}
              <br />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginView;
