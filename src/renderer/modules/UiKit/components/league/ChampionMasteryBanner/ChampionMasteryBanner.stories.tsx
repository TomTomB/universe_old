import ChampionMasteryBanner, { ChampionMasteryBannerProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/League/ChampionMasteryBanner',
  component: ChampionMasteryBanner,
} as Meta;

const Template: Story<ChampionMasteryBannerProps> = args => (
  <div style={{ width: '68px' }}>
    <ChampionMasteryBanner {...args} />
  </div>
);

export const BannerDefault = Template.bind({});
BannerDefault.args = {};

export const BannerLevel7 = Template.bind({});
BannerLevel7.args = {
  level: 7,
};
