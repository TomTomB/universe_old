import React from 'react';
import { Story, Meta } from '@storybook/react';

import InfoIcon, { InfoIconProps } from '.';

export default {
  title: 'UiKit/Base/InfoIcon',
  component: InfoIcon,
} as Meta;

const Template: Story<InfoIconProps> = args => <InfoIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
