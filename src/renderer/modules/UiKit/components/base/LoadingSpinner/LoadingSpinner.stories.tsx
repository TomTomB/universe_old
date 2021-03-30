import LoadingSpinner, { LoadingSpinnerProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/Base/LoadingSpinner',
  component: LoadingSpinner,
} as Meta;

const Template: Story<LoadingSpinnerProps> = args => (
  <LoadingSpinner {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Large = Template.bind({});
Large.args = {
  isLarge: true,
};
