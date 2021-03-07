import React from 'react';
import { Story, Meta } from '@storybook/react';

import Backdrop from '.';

export default {
  title: 'UiKit/Base/Backdrop',
  component: Backdrop,
} as Meta;

const Template: Story = args => (
  <div style={{ width: '100%', height: 'calc(100vh - 2rem)' }}>
    <Backdrop {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
