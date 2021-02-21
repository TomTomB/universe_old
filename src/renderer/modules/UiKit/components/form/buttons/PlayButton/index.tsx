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
  left: 0;
  padding: 6px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.button`
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  outline: none;
  pointer-events: all;
  position: absolute;
  top: 0;
  width: calc(100% - 36px);
  height: 100%;
  left: 36px;
  -webkit-app-region: no-drag;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

interface ButtonTextProps {
  intro: boolean;
  reserveSpace: boolean;
  patching: boolean;
}

const ButtonText = styled.span<ButtonTextProps>`
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
  transition: color 300ms ${({ theme }) => theme.easing.soft};

  ${ButtonContainer}:disabled & {
    color: ${({ theme }) => theme.colors.grey[3]};
  }

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

  ${({ patching }) =>
    patching &&
    css`
      color: #f0e6d2 !important;
    `};
`;

const LeagueLogoContainer = styled.div`
  position: absolute;
  top: -6px;
  left: -13px;
  cursor: default;
  z-index: 1;
  width: 65px;
  height: 54px;
`;

const StyledPlayButton = styled.div<{ show: boolean }>`
  width: 162px;
  height: 58px;
  padding: 7px 0;
  box-sizing: border-box;
  transition: opacity 300ms ${({ theme }) => theme.easing.soft};
  cursor: default;
  opacity: 0;
  pointer-events: none;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
    `}
`;

const PlayButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: 20px center;
  transition: 400ms 200ms background ease;
`;

export enum PlayButtonState {
  HIDDEN,
  PATCHER,
  PLAY,
  PLAY_DISABLED,
  LOBBY,
  LOBBY_DISABLED,
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
    buttonState === PlayButtonState.HIDDEN ||
    buttonState === PlayButtonState.PLAY_DISABLED;

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
      <PlayButtonContainer>
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
              patching={buttonState === PlayButtonState.PATCHER}
              reserveSpace={
                buttonState === PlayButtonState.PLAY ||
                buttonState === PlayButtonState.PLAY_DISABLED
              }
            >
              {children}
            </ButtonText>
          </ContentContainer>
        </ButtonContainer>
      </PlayButtonContainer>
    </StyledPlayButton>
  );
};

export default PlayButton;
