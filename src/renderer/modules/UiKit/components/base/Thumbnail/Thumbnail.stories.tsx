import React from 'react';
import { Story, Meta } from '@storybook/react';
import AhriIcon from '@assets/game-data/champion-icons/103.png';

import Thumbnail, { ThumbnailProps } from '.';

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
