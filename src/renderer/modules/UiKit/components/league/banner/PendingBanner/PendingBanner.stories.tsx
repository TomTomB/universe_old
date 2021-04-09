import { Meta, Story } from '@storybook/react';
import PendingBanner, { PendingBannerProps } from '.';
import React from 'react';

export default {
  title: 'UiKit/League/Banner/PendingBanner',
  component: PendingBanner,
} as Meta;

const Template: Story<PendingBannerProps> = args => <PendingBanner {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
