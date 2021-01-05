import React from 'react';
import styled from 'styled-components';
import TitleBarButton from '../TitleBarButton';

const TitleBar = styled.div`
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  display: flex;
  justify-content: flex-end;
`;

const TitleBarControls = styled.div`
  -webkit-app-region: no-drag;
`;

const TitleBarComponent = () => {
  return (
    <TitleBar>
      <TitleBarControls>
        <TitleBarButton label="Close" />
      </TitleBarControls>
    </TitleBar>
  );
};

export default TitleBarComponent;
