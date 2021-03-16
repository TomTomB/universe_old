import ChampionThumbnail, { ChampionThumbnailProps } from '.';
import { Meta, Story } from '@storybook/react';
import AhriIcon from '@assets/game-data/champion-icons/103.png';
import ChampionMasteryBanner from '../ChampionMasteryBanner';
import React from 'react';
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
