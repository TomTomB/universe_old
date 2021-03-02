import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { useForm } from 'react-hook-form';
import NativeSelect from '.';

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
