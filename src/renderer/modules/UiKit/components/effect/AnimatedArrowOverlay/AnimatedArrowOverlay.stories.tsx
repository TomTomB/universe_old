import AnimatedArrowOverlay, {
  AnimatedArrowOverlayProps,
  AnimatedArrowOverlayStateActive,
  AnimatedArrowOverlayStateHoverFocus,
} from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

export default {
  title: 'UiKit/Decoration/AnimatedArrowOverlay',
  component: AnimatedArrowOverlay,
} as Meta;

const HoverHelper = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  padding: 10px 20px;
  position: relative;
  display: inline-block;

  &:hover {
    ${AnimatedArrowOverlayStateHoverFocus}
  }

  &:active {
    ${AnimatedArrowOverlayStateActive}
  }
`;

const Template: Story<AnimatedArrowOverlayProps> = args => (
  <HoverHelper>
    Hover me
    <AnimatedArrowOverlay {...args} />
  </HoverHelper>
);

export const Default = Template.bind({});
Default.args = {
  isCarrot: true,
};
