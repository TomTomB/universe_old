import { Meta, Story } from '@storybook/react';
import ThemedLevelRing, { ThemedLevelRingProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/League/ThemedLevelRing',
  component: ThemedLevelRing,
} as Meta;

const Template: Story<ThemedLevelRingProps> = args => (
  <div
    style={
      args.ringType !== 'social'
        ? { width: 150, height: 150, marginTop: 25, marginLeft: 25 }
        : { width: 80, height: 80, marginTop: 25, marginLeft: 25 }
    }
  >
    <ThemedLevelRing {...args} />
  </div>
);

export const SummonerLevel7 = Template.bind({});
SummonerLevel7.args = {
  progress: 20,
  summonerLevel: 7,
  ringType: 'progress',
};

export const SummonerLevel511 = Template.bind({});
SummonerLevel511.args = {
  progress: 20,
  summonerLevel: 511,
  ringType: 'progress',
};

export const Solid = Template.bind({});
Solid.args = {
  summonerLevel: 70,
  ringType: 'solid',
};

export const Social = Template.bind({});
Social.args = {
  summonerLevel: 70,
  ringType: 'social',
};

export const Simplified = Template.bind({});
Simplified.args = {
  progress: 20,
  summonerLevel: 70,
  ringType: 'simplified',
};
