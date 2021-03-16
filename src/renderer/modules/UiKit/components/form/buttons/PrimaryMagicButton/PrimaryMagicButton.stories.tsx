import { Meta, Story } from '@storybook/react';
import PrimaryMagicButton, { PrimaryMagicButtonProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/Form/Buttons/PrimaryMagicButton',
  component: PrimaryMagicButton,
} as Meta;

const Template: Story<PrimaryMagicButtonProps> = args => (
  <PrimaryMagicButton {...args}>My Button</PrimaryMagicButton>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
