import React from 'react';
import { Story, Meta } from '@storybook/react';

import Label, { LabelProps } from '.';

export default {
  title: 'UiKit/Form/Label',
  component: Label,
} as Meta;

const Template: Story<LabelProps> = args => <Label {...args}>My label</Label>;

export const Default = Template.bind({});
Default.args = {};

export const Invalid = Template.bind({});
Invalid.args = {
  isInvalid: true,
};
