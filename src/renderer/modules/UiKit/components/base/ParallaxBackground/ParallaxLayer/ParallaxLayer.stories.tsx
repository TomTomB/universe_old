import React from 'react';
import { Story, Meta } from '@storybook/react';
import ParallaxLayer, { ParallaxLayerProps } from '.';
import smoke4 from '../assets/parallax-smoke4.png';

export default {
  title: 'UiKit/Base/ParallaxBackground/Layer',
  component: ParallaxLayer,
} as Meta;

const Template: Story<ParallaxLayerProps> = args => (
  <div
    style={{
      position: 'relative',
      width: '1280px',
      height: '720px',
      overflow: 'hidden',
    }}
  >
    <ParallaxLayer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  imageSrc: smoke4,
  delay: 0,
  duration: 30,
};
