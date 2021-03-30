import Label, { LabelProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/Form/Label',
  component: Label,
} as Meta;

const Template: Story<LabelProps> = args => <Label {...args}>My label</Label>;

export const Default = Template.bind({});
Default.args = {};

export const Invalid = Template.bind({});
Invalid.args = {
  isInvalid: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
