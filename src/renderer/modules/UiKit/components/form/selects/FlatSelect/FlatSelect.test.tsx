import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { useForm } from 'react-hook-form';
import FlatSelect from '.';

describe('FlatSelect', () => {
  it('should render', () => {
    const FormComponent = () => {
      const { register } = useForm();

      return (
        <FlatSelect
          id="sadfa"
          items={{
            grouped: [
              {
                group: 'Foo',
                items: [
                  { label: 'Foo', value: 'foo' },
                  { label: 'Foo2', value: 'foo2' },
                  { label: 'Foo3', value: 'foo3' },
                ],
              },
            ],
            items: [
              { label: 'Bar', value: 'bar', disabled: true },
              { label: 'Baz', value: 'baz' },
              { label: 'Buz', value: 'buz' },
              { label: 'Biz', value: 'biz' },
              { label: 'Bez', value: 'bez' },
            ],
          }}
          label="Select a foo"
          name="foo"
          register={register}
          value="foo"
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
