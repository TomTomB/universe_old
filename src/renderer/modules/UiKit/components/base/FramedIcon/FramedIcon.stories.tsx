import FramedIcon, { FramedIconProps } from '.';
import { Meta, Story } from '@storybook/react';
import AhriIcon from '@assets/game-data/champion-icons/103.png';
import React from 'react';

export default {
  title: 'UiKit/Base/FramedIcon',
  component: FramedIcon,
} as Meta;

const Template: Story<FramedIconProps> = args => (
  <div style={{ width: 100, height: 100 }}>
    <FramedIcon {...args}>
      <img src={AhriIcon} alt="Ahri Icon" />
    </FramedIcon>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
