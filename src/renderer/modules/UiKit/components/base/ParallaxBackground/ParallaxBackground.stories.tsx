import { Meta, Story } from '@storybook/react';
import ParallaxBackground, { ParallaxBackgroundProps } from '.';
import React from 'react';
import smoke1 from './assets/parallax-smoke1.png';
import smoke2 from './assets/parallax-smoke2.png';
import smoke3 from './assets/parallax-smoke3.png';
import smoke4 from './assets/parallax-smoke4.png';
import smokeBackground from './assets/parallax-smoke-background.png';
import smokeForeground from './assets/parallax-smoke-foreground.png';

export default {
  title: 'UiKit/Base/ParallaxBackground',
  component: ParallaxBackground,
} as Meta;

const Template: Story<ParallaxBackgroundProps> = args => (
  <div style={{ position: 'relative', width: '1280px', height: '720px' }}>
    <ParallaxBackground {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  layers: [
    {
      imageSrc: smokeBackground,
      isBackgroundLayer: true,
      delay: 0,
      duration: 0,
    },
    {
      imageSrc: smokeForeground,
      isBackgroundLayer: true,
      delay: 0,
      duration: 0,
    },
    {
      imageSrc: smoke1,
      delay: 7500,
      duration: 30,
    },
    {
      imageSrc: smoke2,
      delay: 5000,
      duration: 25,
    },
    {
      imageSrc: smoke3,
      delay: 15000,
      duration: 28,
    },
    {
      imageSrc: smoke4,
      delay: 0,
      duration: 30,
    },
  ],
};
