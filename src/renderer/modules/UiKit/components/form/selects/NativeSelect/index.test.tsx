import '@testing-library/jest-dom';
import NativeSelect from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';
import { useForm } from 'react-hook-form';

describe('NativeSelect', () => {
  it('should render', () => {
    const FormComponent = () => {
      const { register } = useForm();

      return (
        <NativeSelect
          id="abc123"
          items={[
            { label: 'a', value: 'A' },
            { label: 'b', value: 'B' },
          ]}
          onChange={() => {}}
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
