import { Meta, Story } from '@storybook/react';
import Textarea, { TextareaProps } from '.';
import React from 'react';
import register from '@mocks/register';

export default {
  title: 'UiKit/Form/Textarea',
  component: Textarea,
  args: {
    register,
  },
} as Meta;

const Template: Story<TextareaProps> = args => (
  <div style={{ width: '100%', height: '300px' }}>
    <Textarea {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: 'My Textarea',
};

export const DefaultWithError = Template.bind({});
DefaultWithError.args = {
  label: 'My Invalid Textarea',
  error: { type: 'minLength', message: 'The value is too short' },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'My Disabled Textarea',
  disabled: true,
};
