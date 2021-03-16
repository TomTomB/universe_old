import { Meta, Story } from '@storybook/react';
import Thumbnail, { ThumbnailProps } from '.';
import AhriIcon from '@assets/game-data/champion-icons/103.png';
import React from 'react';

export default {
  title: 'UiKit/Base/Thumbnail',
  component: Thumbnail,
} as Meta;

const Template: Story<ThumbnailProps> = args => (
  <Thumbnail {...args}>
    <img src={AhriIcon} alt="Ahri" />
  </Thumbnail>
);

export const Default = Template.bind({});
Default.args = {};
