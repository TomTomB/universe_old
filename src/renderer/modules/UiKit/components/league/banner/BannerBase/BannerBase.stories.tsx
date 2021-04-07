import BannerBase, { BannerBaseProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/League/Banner/BannerBase',
  component: BannerBase,
} as Meta;

const Template: Story<BannerBaseProps> = args => (
  <div style={{ width: 220 }}>
    {' '}
    <BannerBase {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  rank: 'challenger',
  showPattern: true,
};
