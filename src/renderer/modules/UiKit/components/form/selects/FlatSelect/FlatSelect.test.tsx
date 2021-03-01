import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
// import { useForm } from 'react-hook-form';
import FlatSelect from '.';

describe('FlatSelect', () => {
  it('should render', () => {
    const FormComponent = () => {
      // const { register } = useForm();

      return (
        <FlatSelect
        // id="abc123"
        // items={[
        //   { label: 'a', value: 'A' },
        //   { label: 'b', value: 'B' },
        // ]}
        // label="Test Select"
        // name="abc123"
        // register={register}
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
