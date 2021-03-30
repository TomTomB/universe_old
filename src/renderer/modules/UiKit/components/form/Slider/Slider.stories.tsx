import { Meta, Story } from '@storybook/react';
import Slider, { SliderProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/Form/Slider',
  component: Slider,
} as Meta;

const Template: Story<SliderProps> = args => (
  <div style={{ width: '100%', height: '300px' }}>
    <Slider {...args} />
  </div>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  value: 40,
  min: 0,
  max: 100,
};

export const Vertical = Template.bind({});
Vertical.args = {
  value: 40,
  min: 0,
  max: 100,
  direction: 'vertical',
};
