import CloseButton, { CloseButtonProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/Form/Buttons/CloseButton',
  component: CloseButton,
  args: {
    label: 'Go back',
    type: 'button',
  },
} as Meta;

const Template: Story<CloseButtonProps> = args => <CloseButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  btnStyle: 'back',
};

export const Disabled = Template.bind({});
Disabled.args = {
  btnStyle: 'back',
  disabled: true,
};
