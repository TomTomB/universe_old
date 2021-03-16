import '@testing-library/jest-dom';
import Input from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';
import { useForm } from 'react-hook-form';

describe('Input', () => {
  it('should render', () => {
    const FormComponent = () => {
      const { register } = useForm();

      return (
        <Input
          id="abc123"
          label="Test Input"
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
