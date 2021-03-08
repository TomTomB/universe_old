import React from 'react';
import { Story, Meta } from '@storybook/react';
import AhriIcon from '@assets/game-data/champion-icons/103.png';

import ChampionThumbnail, { ChampionThumbnailProps } from '.';
import ChampionMasteryBanner from '../ChampionMasteryBanner';
import { Thumbnail } from '@uikit/components/base';

export default {
  title: 'UiKit/League/ChampionThumbnail',
  component: ChampionThumbnail,
} as Meta;

const Template: Story<ChampionThumbnailProps> = args => (
  <div style={{ width: '68px' }}>
    <ChampionThumbnail {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  masteryBanner: <ChampionMasteryBanner level={7} />,
  thumbnail: (
    <Thumbnail>
      <img src={AhriIcon} alt="Ahri" />
    </Thumbnail>
  ),
};
