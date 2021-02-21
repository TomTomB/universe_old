import React, { FC, PropsWithChildren } from 'react';
import { ComponentTypes } from '@typings';
import styled, { css, keyframes } from 'styled-components';

import { UpdaterStatus } from '@store/slices/updater/updaterSlice';
import { DownloadProgress } from '../../../../../../../types/electron';
import PlayButtonLogo from './Logo';
import PlayButtonFrame from './Frame';
import PlayButtonPatcher from './Patcher';

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

const patcherShowAnimation = keyframes`
  0%{
    opacity: 0;
    transform: scaleX(0);
  }
  50% {
    opacity: 0;
    transform: scaleX(0.5);
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
`;

const ContentContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 6px;
  box-sizing: border-box;
  pointer-events: none;
`;
const ButtonText = styled.span<{ intro: boolean }>`
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
  width: 85%;
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

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const VideoIntroContainer = styled.div``;
const HoverMagicContainer = styled.div``;

const ProgressContainer = styled.div<{ show: boolean; delay: number }>`
  position: absolute;
  width: 160px;
  height: 60px;
  top: -10px;
  left: -20px;
  overflow: hidden;
  opacity: 0;
  transform-origin: left center;

  ${({ show }) =>
    show &&
    css`
      animation: ${patcherShowAnimation} 500ms forwards
        ${({ theme }) => theme.easing.soft};
    `}

  ${({ delay }) =>
    delay &&
    css`
      animation-delay: ${delay}ms;
    `}
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
  transition-timing-function: ${({ theme }) => theme.easing.stern};
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
  playPatcherIntro?: boolean;
  buttonState?: PlayButtonState;
}

const PlayButton: FC<PropsWithChildren<PlayButtonProps>> = ({
  type,
  children,
  className,
  disabled,
  onClick,
  buttonState = PlayButtonState.PATCHER,
  downloadProgress,
  updaterStatus,
  playPatcherIntro,
}) => {
  return (
    <StyledPlayButton
      className={className}
      show={buttonState !== PlayButtonState.HIDDEN}
    >
      <PlayButtonFrame
        playPatcherIntro={playPatcherIntro}
        buttonState={buttonState}
      />
      <LeagueLogoContainer>
        <PlayButtonLogo
          playPatcherIntro={playPatcherIntro}
          buttonState={buttonState}
        />
      </LeagueLogoContainer>
      <ButtonContainer
        onClick={onClick}
        disabled={
          disabled ||
          buttonState === PlayButtonState.PATCHER ||
          buttonState === PlayButtonState.HIDDEN
        }
        type={type}
      >
        <VideoIntroContainer />
        <HoverMagicContainer />
        <ProgressContainer
          show={buttonState === PlayButtonState.PATCHER}
          delay={
            playPatcherIntro && buttonState === PlayButtonState.PATCHER
              ? 500
              : 300
          }
        >
          <PlayButtonPatcher
            playPatcherIntro={playPatcherIntro}
            buttonState={buttonState}
            downloadProgress={downloadProgress}
          />
        </ProgressContainer>

        <ContentContainer>
          <ButtonText
            intro={!!playPatcherIntro && buttonState !== PlayButtonState.HIDDEN}
          >
            {children}
          </ButtonText>
        </ContentContainer>
      </ButtonContainer>
    </StyledPlayButton>
  );
};

export default PlayButton;
