import React from 'react';
import { Story, Meta } from '@storybook/react';
import register from '@mocks/register';

import FlatSelect, { FlatSelectProps } from '.';

export default {
  title: 'UiKit/Form/Selects/FlatSelect',
  component: FlatSelect,
  args: {
    register,
  },
} as Meta;

const Template: Story<FlatSelectProps> = args => <FlatSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Select a foo',
  name: 'foo',
  value: 'foo',
  items: {
    grouped: [],
    items: [
      { label: 'Bar', value: 'bar', disabled: true },
      { label: 'Baz', value: 'baz' },
      { label: 'Buz', value: 'buz' },
      { label: 'Biz', value: 'biz' },
      { label: 'Bez', value: 'bez' },
    ],
  },
};

export const DefaultWithGroups = Template.bind({});
DefaultWithGroups.args = {
  label: 'Select a foo',
  name: 'foo',
  value: 'foo',
  items: {
    grouped: [
      {
        group: 'Foo',
        items: [
          { label: 'Foo', value: 'foo' },
          { label: 'Foo2', value: 'foo2' },
          { label: 'Foo3', value: 'foo3' },
        ],
      },
      {
        group: 'Bar',
        items: [
          { label: 'Bar', value: 'bar' },
          { label: 'Bar2', value: 'bar2' },
          { label: 'Bar3', value: 'bar3' },
        ],
      },
    ],
    items: [],
  },
};

export const DefaultWithGroupsAndUngrouped = Template.bind({});
DefaultWithGroupsAndUngrouped.args = {
  label: 'Select a foo',
  name: 'foo',
  value: 'foo',
  items: {
    grouped: [
      {
        group: 'Foo',
        items: [
          { label: 'Foo', value: 'foo' },
          { label: 'Foo2', value: 'foo2' },
          { label: 'Foo3', value: 'foo3' },
          {
            label:
              'Super long Label that should cut off Super long Label that should cut off',
            value: 'foo4',
          },
        ],
      },
    ],
    items: [
      { label: 'Bar', value: 'bar', disabled: true },
      { label: 'Baz', value: 'baz' },
      { label: 'Buz', value: 'buz' },
      { label: 'Biz', value: 'biz' },
      { label: 'Bez', value: 'bez' },
    ],
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  items: { grouped: [], items: [] },
};
