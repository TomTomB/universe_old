import React, { FC, PropsWithChildren } from 'react';
import { ComponentTypes } from '@typings';
import styled, { css, keyframes } from 'styled-components';
import { UpdaterStatus } from '@store/slices/updater/updaterSlice';
import { DownloadProgress } from '../../../../../../../types/electron';
import PlayButtonLogo from './Logo';
import PlayButtonFrame from './Frame';
import PlayButtonPatcher from './Patcher';
import PlayButtonPlay from './Play';

const textShowAnimation = keyframes`
  from{
    opacity: 0;
    transform: translateX(-5px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

const ContentContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 6px;
  box-sizing: border-box;
  pointer-events: none;
`;

const ButtonText = styled.span<{ intro: boolean; reserveSpace: boolean }>`
  font-family: LoL Display;
  font-kerning: normal;
  font-feature-settings: 'kern' 1;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  color: #f0e6d2;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.075em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  pointer-events: none;

  ${({ intro }) =>
    intro &&
    css`
      opacity: 0;
      animation: ${textShowAnimation} 300ms forwards 800ms
        ${({ theme }) => theme.easing.soft};
    `};

  ${({ reserveSpace }) =>
    reserveSpace &&
    css`
      width: 85%;
    `};
`;

const ButtonContainer = styled.button`
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  position: absolute;
  left: 36px;
  top: 0;
  width: calc(100% - 36px);
  height: 100%;
  outline: none;
  pointer-events: all;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const LeagueLogoContainer = styled.div`
  position: absolute;
  top: -9px;
  left: -9px;
  width: 64px;
  z-index: 1;
`;

const StyledPlayButton = styled.div<{ show: boolean }>`
  width: 162px;
  height: 40px;
  -webkit-app-region: no-drag;
  position: relative;
  opacity: 0;
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ${({ theme }) => theme.easing.soft};
  pointer-events: none;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
    `}
`;

export enum PlayButtonState {
  HIDDEN,
  PATCHER,
  PLAY,
  LOBBY,
}

interface PlayButtonProps extends ComponentTypes.ButtonProps {
  updaterStatus?: UpdaterStatus;
  downloadProgress?: DownloadProgress | null;
  buttonState: PlayButtonState;
  prevButtonState: PlayButtonState;
}

const PlayButton: FC<PropsWithChildren<PlayButtonProps>> = ({
  type,
  children,
  className,
  disabled,
  onClick,
  buttonState,
  prevButtonState,
  downloadProgress,
  updaterStatus,
}) => {
  const btnIsDisabled =
    disabled ||
    buttonState === PlayButtonState.PATCHER ||
    buttonState === PlayButtonState.HIDDEN;

  const playPatcherIntro =
    buttonState === PlayButtonState.PATCHER &&
    prevButtonState === PlayButtonState.HIDDEN;

  return (
    <StyledPlayButton
      className={className}
      show={buttonState !== PlayButtonState.HIDDEN}
    >
      <PlayButtonFrame
        playPatcherIntro={playPatcherIntro}
        buttonState={{ prev: prevButtonState, curr: buttonState }}
      />
      <LeagueLogoContainer>
        <PlayButtonLogo
          playPatcherIntro={playPatcherIntro}
          buttonState={{ prev: prevButtonState, curr: buttonState }}
        />
      </LeagueLogoContainer>
      <ButtonContainer onClick={onClick} disabled={btnIsDisabled} type={type}>
        <PlayButtonPlay
          buttonState={{ prev: prevButtonState, curr: buttonState }}
          disabled={btnIsDisabled}
        />

        <PlayButtonPatcher
          playPatcherIntro={playPatcherIntro}
          buttonState={{ prev: prevButtonState, curr: buttonState }}
          downloadProgress={downloadProgress}
        />

        <ContentContainer>
          <ButtonText
            intro={playPatcherIntro}
            reserveSpace={buttonState === PlayButtonState.PLAY}
          >
            {children}
          </ButtonText>
        </ContentContainer>
      </ButtonContainer>
    </StyledPlayButton>
  );
};

export default PlayButton;
