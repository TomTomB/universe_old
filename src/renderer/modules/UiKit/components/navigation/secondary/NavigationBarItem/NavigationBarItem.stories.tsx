import React from 'react';
import { Story, Meta } from '@storybook/react';

import NavigationBarItem, { NavigationBarItemProps } from '.';
import { Router } from 'react-router';
import { createHashHistory } from 'history';

export default {
  title: 'UiKit/Navigation/Secondary/NavigationBarItem',
  component: NavigationBarItem,
} as Meta;

const Template: Story<NavigationBarItemProps> = args => (
  <Router history={createHashHistory()}>
    <NavigationBarItem {...args}>A nav item</NavigationBarItem>
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  linksTo: 'foo',
};
