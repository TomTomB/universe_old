import React, { FC } from 'react';
import TitleBarButton, {
  TitleBarButtonBase,
  TitleBarButtonType,
} from '../TitleBarButton';
import styled from 'styled-components';

const TitleBar = styled.div`
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  display: grid;
  justify-content: end;
  z-index: 10000;
`;

const TitleBarControls = styled.div`
  -webkit-app-region: no-drag;
  align-self: center;
  position: relative;
  top: -1px;

  ${TitleBarButtonBase} {
    :not(:last-of-type) {
      margin-right: 15px;
    }

    :last-of-type {
      margin-right: 10px;
    }
  }
`;

const TitleBarComponent: FC = () => {
  return (
    <TitleBar>
      <TitleBarControls>
        <TitleBarButton label="Open help" type={TitleBarButtonType.Help} />
        <TitleBarButton label="Hide app" type={TitleBarButtonType.Hide} />
        <TitleBarButton
          label="Open settings"
          type={TitleBarButtonType.Settings}
        />
        <TitleBarButton label="Close app" type={TitleBarButtonType.Close} />
      </TitleBarControls>
    </TitleBar>
  );
};

export default TitleBarComponent;
