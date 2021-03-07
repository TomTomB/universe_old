import React from 'react';
import { Story, Meta } from '@storybook/react';

import PrimaryMagicButton, { PrimaryMagicButtonProps } from '.';

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
