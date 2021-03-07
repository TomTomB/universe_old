import React from 'react';
import { Story, Meta } from '@storybook/react';

import LoadingSpinner from '.';

export default {
  title: 'UiKit/Base/LoadingSpinner',
  component: LoadingSpinner,
} as Meta;

const Template: Story = args => <LoadingSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
