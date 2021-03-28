import { Meta, Story } from '@storybook/react';
import SecondaryFlatButton, { SecondaryFlatButtonProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/Form/Buttons/SecondaryFlatButton',
  component: SecondaryFlatButton,
} as Meta;

const Template: Story<SecondaryFlatButtonProps> = args => (
  <SecondaryFlatButton {...args}>Click me</SecondaryFlatButton>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
