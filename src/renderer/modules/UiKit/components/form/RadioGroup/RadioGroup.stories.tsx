import { Meta, Story } from '@storybook/react';
import RadioGroup, { RadioGroupProps } from '.';
import RadioOption from './Option';
import React from 'react';

export default {
  title: 'UiKit/Form/RadioGroup',
  component: RadioGroup,
} as Meta;

const Template: Story<RadioGroupProps> = args => (
  <RadioGroup {...args}>
    <RadioOption id="a" label="Foo" name="foo" value="foo" />
    <RadioOption id="b" label="Bar" name="foo" value="bar" />
    <RadioOption id="c" label="Baz" name="foo" value="baz" />
  </RadioGroup>
);

export const Default = Template.bind({});
Default.args = {
  direction: 'vertical',
};
