import { Meta, Story } from '@storybook/react';
import RadialProgress, { RadialProgressProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/Base/RadialProgress',
  component: RadialProgress,
} as Meta;

const Template: Story<RadialProgressProps> = args => (
  <div style={{ width: 100, height: 100 }}>
    <RadialProgress {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  progressType: 'blue',
  progress: 40,
};
