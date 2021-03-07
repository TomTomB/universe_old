import React from 'react';
import { Story, Meta } from '@storybook/react';
import caitlynPulsfire from '@assets/background/splash/image-splash-caitlynpulsefire.jpg';
import dianaBloodmoon from '@assets/background/splash/image-splash-dianabloodmoon.jpg';

import BackgroundSwitcher, { BackgroundSwitcherProps } from '.';

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
