import React from 'react';
import { Story, Meta } from '@storybook/react';

import NavigationBar, { NavigationBarProps } from '.';
import NavigationBarItem from '../NavigationBarItem';
import { createHashHistory } from 'history';
import { Router } from 'react-router-dom';

export default {
  title: 'UiKit/Navigation/NavigationBar',
  component: NavigationBar,
} as Meta;

const Template: Story<NavigationBarProps> = args => (
  <Router history={createHashHistory()}>
    <NavigationBar {...args}>
      <NavigationBarItem linksTo="foo"> Overview </NavigationBarItem>
      <NavigationBarItem linksTo="bar" disabled>
        Match history
      </NavigationBarItem>
      <NavigationBarItem linksTo="baz" alert>
        Ranked
      </NavigationBarItem>
    </NavigationBar>
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  direction: 'left',
  navType: 'primary',
};
