import React, { FC } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Reset from '@styles/Reset';
import FontFaces from '@styles/FontFaces';
import BodyTypography from '@styles/typo/Body';
import Scrollbar from '@styles/Scrollbar';
import HeadingTypography from '@styles/typo/Heading';
import LoginView from '../../../Auth/views/Login';
import TitleBarComponent from '../../components/TitleBar';

const Shell = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.grey.frame};
  border-top: 2px solid ${(props) => props.theme.colors.gold[5]};
`;

const RootView: FC = () => {
  return (
    <>
      <FontFaces />
      <Reset />
      <ThemeProvider theme={theme}>
        <Scrollbar />
        <BodyTypography />
        <HeadingTypography />
        <Shell>
          <TitleBarComponent />
          <Router>
            <Switch>
              <Redirect from="/" exact to="/auth/login" />
              <Route path="/auth/login" component={LoginView} />
            </Switch>
          </Router>
        </Shell>
      </ThemeProvider>
    </>
  );
};

export default RootView;
