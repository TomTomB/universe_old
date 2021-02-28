import { ConnectedRouter } from 'connected-react-router';
import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { history } from '@store';
import Styleguide from '@uikit/views/Styleguide';
import LoginView from '../../../Auth/views/Login';
import TitleBarComponent from '../../components/TitleBar';
import SettingsHost from '../../../Settings/views/SettingsHost';

const Shell = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: ${props => props.theme.colors.black};
  border: 1px solid ${props => props.theme.colors.grey.frame};
  border-top: 2px solid ${props => props.theme.colors.gold[5]};
`;

const RootView: FC = () => {
  return (
    <Shell>
      <TitleBarComponent />
      <ConnectedRouter history={history}>
        <Switch>
          <Redirect from="/" exact to="/auth/login" />
          <Route path="/auth/login" component={LoginView} />
          <Route path="/style" component={Styleguide} />
        </Switch>
      </ConnectedRouter>
      <SettingsHost />
    </Shell>
  );
};

export default RootView;
