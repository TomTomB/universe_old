import LobbyBanner, { LobbyBannerProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/League/Banner/LobbyBanner',
  component: LobbyBanner,
} as Meta;

const Template: Story<LobbyBannerProps> = args => <LobbyBanner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  rank: 'gold',
  showPattern: false,
  bannerType: 'primary',
};

export const Ally = Template.bind({});
Ally.args = {
  rank: 'gold',
  showPattern: false,
  bannerType: 'ally',
};
