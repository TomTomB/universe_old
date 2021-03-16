import FilterFader, { FilterFaderProps } from '.';
import { Meta, Story } from '@storybook/react';
import AhriIcon from '@assets/game-data/champion-icons/103.png';
import React from 'react';
import styled from 'styled-components';

export default {
  title: 'UiKit/Base/FilterFader',
  component: FilterFader,
} as Meta;

const StyledFilterFader = styled(FilterFader)`
  --filter-fader-filter: grayscale(0.75);
  --filter-fader-opacity: 0.75;
`;

const Template: Story<FilterFaderProps> = args => (
  <StyledFilterFader {...args}>
    <img src={AhriIcon} alt="Ahri Icon" />
  </StyledFilterFader>
);

export const Default = Template.bind({});
Default.args = {};
