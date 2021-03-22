import { Meta, Story } from '@storybook/react';
import RadioOption, { RadioOptionProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/Form/RadioGroup/Option',
  component: RadioOption,
} as Meta;

const Template: Story<RadioOptionProps> = args => <RadioOption {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Select a foo',
  name: 'foo',
  value: 'foo',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Select a foo',
  name: 'foo',
  value: 'foo',
};
