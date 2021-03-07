import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChampionMasteryBanner, { ChampionMasteryBannerProps } from '.';

export default {
  title: 'UiKit/League/ChampionMasteryBanner',
  component: ChampionMasteryBanner,
} as Meta;

const Template: Story<ChampionMasteryBannerProps> = args => (
  <div style={{ width: '75px' }}>
    <ChampionMasteryBanner {...args} />
  </div>
);

export const BannerDefault = Template.bind({});
BannerDefault.args = {};

export const BannerLevel7 = Template.bind({});
BannerLevel7.args = {
  level: 7,
};
