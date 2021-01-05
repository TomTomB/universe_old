import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LoginView from '../../../Auth/views/Login';
import TitleBarComponent from '../../components/TitleBar';

const Shell = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #010a13;
  border: 1px solid #1e282d;
  border-top: 2px solid #785a28;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  *, *::before,  *::after{
    box-sizing: border-box;
    user-select: none;
  }
`;

const RootView = () => {
  return (
    <>
      <GlobalStyle />
      <Shell>
        <TitleBarComponent />
        <Router>
          <Switch>
            <Redirect from="/" exact to="/auth/login" />
            <Route path="/auth/login" component={LoginView} />
          </Switch>
        </Router>
      </Shell>
    </>
  );
};

export default RootView;
