import React, { FC } from 'react';
import { ipcRenderer } from 'electron';
import styled from 'styled-components';
import controlHide from '@assets/components/controls/control-hide.png';
import controlHelp from '@assets/components/controls/control-help.png';
import controlClose from '@assets/components/controls/control-close.png';
import controlSettings from '@assets/components/controls/control-settings.png';
import { useAppDispatch } from '@store';
import { setShowSettingsModal } from '@store/slices/settings/settingsSlice';

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
  background-color: ${props => props.theme.colors.grey[1]};
  outline: none;

  :hover,
  :focus-visible {
    background-color: ${props => props.theme.colors.gold[1]};
  }
  :active {
    background-color: ${props => props.theme.colors.grey[2]};
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
  const dispatch = useAppDispatch();

  switch (type) {
    case TitleBarButtonType.Close:
      return (
        <TitleBarButtonClose
          type="button"
          aria-label={label}
          onClick={e => {
            e.preventDefault();

            ipcRenderer.send('window-close');
          }}
        />
      );
    case TitleBarButtonType.Hide:
      return (
        <TitleBarButtonHide
          type="button"
          aria-label={label}
          onClick={e => {
            e.preventDefault();

            ipcRenderer.send('window-hide');
          }}
        />
      );
    case TitleBarButtonType.Settings:
      return (
        <TitleBarButtonSettings
          type="button"
          aria-label={label}
          onClick={e => {
            e.preventDefault();

            dispatch(setShowSettingsModal(true));
          }}
        />
      );
    case TitleBarButtonType.Help:
      return (
        <TitleBarButtonHelp
          type="button"
          aria-label={label}
          onClick={e => {
            e.preventDefault();
          }}
        />
      );
    default:
      return <></>;
  }
};

export default TitleBarButton;
