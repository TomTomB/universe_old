import '@testing-library/jest-dom';
import React from 'react';
import Textarea from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';
import { useForm } from 'react-hook-form';

describe('Textarea', () => {
  it('should render', () => {
    const FormComponent = () => {
      const { register } = useForm();

      return (
        <Textarea
          id="abc123"
          label="Test Textarea"
          name="abc123"
          register={register}
        />
      );
    };

    expect(
      render(
        <ThemeProvider theme={theme}>
          <FormComponent />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
