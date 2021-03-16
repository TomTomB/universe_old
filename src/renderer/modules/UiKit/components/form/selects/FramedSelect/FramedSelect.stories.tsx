import FramedSelect, { FramedSelectProps } from '.';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import register from '@mocks/register';

export default {
  title: 'UiKit/Form/Selects/FramedSelect',
  component: FramedSelect,
  args: {
    register,
  },
} as Meta;

const Template: Story<FramedSelectProps> = args => <FramedSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Select a foo',
  name: 'foo',
  value: 'foo',
  items: [
    { label: 'Bar', value: 'bar', disabled: true },
    { label: 'Baz', value: 'baz' },
    { label: 'Buz', value: 'buz' },
    { label: 'Biz', value: 'biz' },
    {
      label:
        'Super long Label that should cut off Super long Label that should cut off',
      value: 'bez',
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  items: [],
};
