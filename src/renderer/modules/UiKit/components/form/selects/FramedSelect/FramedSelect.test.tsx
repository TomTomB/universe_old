import '@testing-library/jest-dom';
import FramedSelect from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';
import { useForm } from 'react-hook-form';

describe('FramedSelect', () => {
  it('should render', () => {
    const FormComponent = () => {
      const { register } = useForm();

      return (
        <FramedSelect
          id="abc123"
          items={[
            { label: 'a', value: 'A' },
            { label: 'b', value: 'B' },
          ]}
          label="Test Select"
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
