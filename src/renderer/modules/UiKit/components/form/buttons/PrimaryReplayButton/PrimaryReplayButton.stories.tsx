import React from 'react';
import { Story, Meta } from '@storybook/react';

import PrimaryReplayButton, { PrimaryReplayButtonProps } from '.';

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
