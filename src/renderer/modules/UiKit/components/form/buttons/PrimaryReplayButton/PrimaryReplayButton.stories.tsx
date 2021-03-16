import { Meta, Story } from '@storybook/react';
import PrimaryReplayButton, { PrimaryReplayButtonProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/Form/Buttons/PrimaryReplayButton',
  component: PrimaryReplayButton,
} as Meta;

const Template: Story<PrimaryReplayButtonProps> = args => (
  <PrimaryReplayButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
