import Checkbox, { CheckboxProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/Form/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'My Checkbox',
};

export const DefaultChecked = Template.bind({});
DefaultChecked.args = {
  label: 'My Checkbox',
  value: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'My Disabled Checkbox',
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  label: 'My Disabled Checkbox',
  disabled: true,
  value: true,
};
