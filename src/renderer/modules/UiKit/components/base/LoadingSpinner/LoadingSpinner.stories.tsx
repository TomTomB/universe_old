import { Meta, Story } from '@storybook/react';
import LoadingSpinner from '.';
import React from 'react';

export default {
  title: 'UiKit/Base/LoadingSpinner',
  component: LoadingSpinner,
} as Meta;

const Template: Story = args => <LoadingSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
