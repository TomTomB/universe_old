import React, { FC } from 'react';
import { ipcRenderer } from 'electron';
import styled from 'styled-components';
import controlHide from '@assets/controls/control-hide.png';
import controlHelp from '@assets/controls/control-help.png';
import controlClose from '@assets/controls/control-close.png';
import controlSettings from '@assets/controls/control-settings.png';

export enum TitleBarButtonType {
  Close,
  Settings,
  Hide,
  Help,
}

export const TitleBarButtonBase = styled.button`
  height: 18px;
  width: 18px;
  padding: 0;
  appearance: none;
  border: none;
  cursor: pointer;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  background-color: ${(props) => props.theme.colors.grey[1]};
  outline: none;

  :hover,
  :focus-visible {
    background-color: ${(props) => props.theme.colors.gold[1]};
  }
  :active {
    background-color: ${(props) => props.theme.colors.grey[2]};
  }
`;

const TitleBarButtonClose = styled(TitleBarButtonBase)`
  -webkit-mask-image: url(${controlClose});
`;

const TitleBarButtonHide = styled(TitleBarButtonBase)`
  -webkit-mask-image: url(${controlHide});
`;

const TitleBarButtonHelp = styled(TitleBarButtonBase)`
  -webkit-mask-image: url(${controlHelp});
`;

const TitleBarButtonSettings = styled(TitleBarButtonBase)`
  -webkit-mask-image: url(${controlSettings});
`;

interface TitleBarButtonProps {
  label: string;
  type: TitleBarButtonType;
}

const TitleBarButton: FC<TitleBarButtonProps> = ({ label, type }) => {
  switch (type) {
    case TitleBarButtonType.Close:
      return (
        <TitleBarButtonClose
          type="button"
          aria-label={label}
          onClick={() => ipcRenderer.send('window-close')}
        />
      );
    case TitleBarButtonType.Hide:
      return (
        <TitleBarButtonHide
          type="button"
          aria-label={label}
          onClick={() => ipcRenderer.send('window-hide')}
        />
      );
    case TitleBarButtonType.Settings:
      return <TitleBarButtonSettings type="button" aria-label={label} />;
    case TitleBarButtonType.Help:
      return <TitleBarButtonHelp type="button" aria-label={label} />;
    default:
      return <></>;
  }
};

export default TitleBarButton;
