import InfoIcon, { InfoIconProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UiKit/Base/InfoIcon',
  component: InfoIcon,
} as Meta;

const Template: Story<InfoIconProps> = args => <InfoIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
