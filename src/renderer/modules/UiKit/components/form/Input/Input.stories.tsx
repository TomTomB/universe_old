import React from 'react';
import { Story, Meta } from '@storybook/react';

import Input, { InputProps } from '.';
import register from '@mocks/register';

export default {
  title: 'UiKit/Form/Input',
  component: Input,
  args: {
    register,
  },
} as Meta;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'My Input',
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  label: 'My Disabled Input',
  disabled: true,
};

export const DefaultWithError = Template.bind({});
DefaultWithError.args = {
  label: 'My Invalid Input',
  error: { type: 'minLength', message: 'The value is too short' },
};

export const Search = Template.bind({});
Search.args = {
  type: 'search',
  label: 'My Search',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  label: 'My Password',
};
