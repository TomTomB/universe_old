import React from 'react';
import { Story, Meta } from '@storybook/react';

import CloseButton, { CloseButtonProps } from '.';

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
