import { Meta, Story } from '@storybook/react';
import NavigationBar, { NavigationBarProps } from '.';
import NavigationBarItem from '../NavigationBarItem';
import React from 'react';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';

export default {
  title: 'UiKit/Navigation/Secondary/NavigationBar',
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
Default.args = {};
