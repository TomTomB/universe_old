import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { useForm } from 'react-hook-form';
import Checkbox from '.';

describe('Checkbox', () => {
  it('should render', () => {
    const FormComponent = () => {
      const { register } = useForm();

      return (
        <Checkbox
          id="abc123"
          label="Test Checkbox"
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
