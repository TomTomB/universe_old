import React from 'react';
import { Story, Meta } from '@storybook/react';

import ButtonGroup, { ButtonGroupProps } from '.';

export default {
  title: 'UiKit/Decoration/ButtonGroup',
  component: ButtonGroup,
} as Meta;

const Template: Story<ButtonGroupProps> = args => (
  <ButtonGroup {...args}>
    <button>Button A</button>
    <button>Button B Lorem</button>
  </ButtonGroup>
);

export const Default = Template.bind({});
Default.args = {};
