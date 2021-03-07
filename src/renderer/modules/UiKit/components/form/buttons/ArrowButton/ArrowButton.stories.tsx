import React from 'react';
import { Story, Meta } from '@storybook/react';

import ArrowButton, { ArrowButtonProps } from '.';

export default {
  title: 'UiKit/Form/Buttons/ArrowButton',
  component: ArrowButton,
  args: {
    label: 'Go back',
    type: 'button',
  },
} as Meta;

const Template: Story<ArrowButtonProps> = args => <ArrowButton {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
