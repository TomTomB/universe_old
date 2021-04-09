import React, { FC } from 'react';
import Panel from '../../components/Panel';
import SplashScreenContainer from '../../components/SplashScreenContainer';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 223px;
  grid-template-areas: 'splash panel';
  height: 100%;
`;

const LoginView: FC = () => {
  return (
    <Container>
      <SplashScreenContainer />
      <Panel />
    </Container>
  );
};

export default LoginView;
