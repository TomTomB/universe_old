import { Meta, Story } from '@storybook/react';
import SummonerBanner, { SummonerBannerProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/League/SummonerBanner',
  component: SummonerBanner,
} as Meta;

const Template: Story<SummonerBannerProps> = args => (
  <div style={{ width: '240px' }}>
    <SummonerBanner {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  rank: 'challenger',
  showPattern: true,
};
