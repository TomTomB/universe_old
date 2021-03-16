import CometBorder, { CometBorderProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/Decoration/CometBorder',
  component: CometBorder,
} as Meta;

const Template: Story<CometBorderProps> = args => <CometBorder {...args} />;

export const Default = Template.bind({});
Default.args = {
  borderWith: 2,
  height: 30,
  width: 150,
};
