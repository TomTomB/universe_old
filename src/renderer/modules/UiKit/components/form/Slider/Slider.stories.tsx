import { Meta, Story } from '@storybook/react';
import Slider, { SliderProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/Form/Slider',
  component: Slider,
} as Meta;

const Template: Story<SliderProps> = args => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {};
