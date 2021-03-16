import BackgroundSwitcher, { BackgroundSwitcherProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import caitlynPulsfire from '@assets/background/splash/image-splash-caitlynpulsefire.jpg';
import dianaBloodmoon from '@assets/background/splash/image-splash-dianabloodmoon.jpg';

export default {
  title: 'UiKit/Base/BackgroundSwitcher',
  component: BackgroundSwitcher,
} as Meta;

const Template: Story<BackgroundSwitcherProps> = args => (
  <BackgroundSwitcher {...args} />
);

export const Default = Template.bind({});
Default.args = {
  currentIndex: 0,
  items: [
    {
      src: caitlynPulsfire,
      alt: 'Caitlyn Pulsfire',
    },
    {
      src: dianaBloodmoon,
      alt: 'Diana Bloodmoon',
    },
  ],
};
