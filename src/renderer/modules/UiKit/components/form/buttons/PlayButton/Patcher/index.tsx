import React, { FC, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { AnimationWithTransition } from '../Animation';
import { DownloadProgress } from '@typings/electron';
import { PlayButtonState } from '..';
import ProgressBarBorderLoop from '@assets/video/buttons/progress-bar/progress-bar-border-loop.webm';
import ProgressBarMainLoop from '@assets/video/buttons/progress-bar/progress-bar-main-loop.webm';
import ProgressBarTipIntro from '@assets/video/buttons/progress-bar/progress-bar-tip-intro.webm';
import ProgressBarTipLoop from '@assets/video/buttons/progress-bar/progress-bar-tip-loop.webm';
import { useCompare } from '@uikit/hooks';

const patcherShowAnimation = keyframes`
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const patcherShowWithTransitionAnimation = keyframes`
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

const patcherHideAnimation = keyframes`
  from{
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface ProgressContainerProps {
  show: boolean;
  showWithIntro: boolean;
  delay: number;
}

const ProgressContainer = styled.div<ProgressContainerProps>`
  position: absolute;
  width: 160px;
  height: 60px;
  top: -8px;
  left: -20px;
  overflow: hidden;
  opacity: 0;
  transform-origin: left center;
  pointer-events: none;
  animation: 300ms forwards ${({ theme }) => theme.easing.soft};

  ${({ show }) =>
    show &&
    css`
      animation-name: ${patcherShowAnimation};
    `}

  ${({ showWithIntro }) =>
    showWithIntro &&
    css`
      animation-name: ${patcherShowWithTransitionAnimation};
      animation-duration: 500ms;
      animation-timing-function: ${({ theme }) => theme.easing.softStern};
    `}

  ${({ show, showWithIntro }) =>
    !show &&
    !showWithIntro &&
    css`
      opacity: 1;
      animation-name: ${patcherHideAnimation};
    `}

  ${({ delay }) =>
    delay &&
    css`
      animation-delay: ${delay}ms;
    `}
`;

const ProgressBarContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 15px;
  height: 30px;
  left: 22px;
  transition: width 100ms ${({ theme }) => theme.easing.stern};
`;

const ProgressBarBorderAnimation = styled(AnimationWithTransition)`
  top: -1px;
  min-width: 147px;
  max-width: 147px;
  width: 147px;
  height: 60px;
  left: 10px;
`;

const ProgressBarMainLoopAnimation = styled(AnimationWithTransition)`
  top: -1px;
  left: 0;
  width: 119px;
  min-width: 119px;
  max-width: 119px;
`;

const ProgressBarTipLoopAnimation = styled(AnimationWithTransition)`
  top: -1px;
  height: 60px;
  min-width: 147px;
  max-width: 147px;
  width: 147px;
  transition-duration: 100ms;
`;

interface PlayButtonPatcherProps {
  buttonState: { prev: PlayButtonState; curr: PlayButtonState };
  playPatcherIntro: boolean;
  downloadProgress?: DownloadProgress | null;
}

const PlayButtonPatcher: FC<PlayButtonPatcherProps> = ({
  playPatcherIntro,
  buttonState,
  downloadProgress,
}) => {
  const patcherBorderLoopAnim = useRef<HTMLVideoElement>(null);
  const patcherFillLoopAnim = useRef<HTMLVideoElement>(null);
  const patcherTipIntroAnim = useRef<HTMLVideoElement>(null);
  const patcherTipLoopAnim = useRef<HTMLVideoElement>(null);

  const hasButtonStateChanged = useCompare(buttonState.curr);

  const currentDownloadPercentage = downloadProgress?.percent ?? 0;

  useEffect(() => {
    if (!hasButtonStateChanged) {
      return;
    }

    switch (buttonState.curr) {
      case PlayButtonState.PATCHER:
        break;

      case PlayButtonState.PLAY:
        break;

      case PlayButtonState.PLAY_DISABLED:
        break;

      case PlayButtonState.LOBBY:
        break;

      case PlayButtonState.LOBBY_DISABLED:
        break;

      case PlayButtonState.HIDDEN:
      default:
        break;
    }
  }, [hasButtonStateChanged, playPatcherIntro, buttonState]);

  return (
    <ProgressContainer
      show={!playPatcherIntro && buttonState.curr === PlayButtonState.PATCHER}
      showWithIntro={playPatcherIntro}
      delay={playPatcherIntro ? 500 : 0}
    >
      <ProgressBarContainer
        style={{
          width: `${120 * (currentDownloadPercentage / 100)}px`,
        }}
      >
        <ProgressBarMainLoopAnimation
          src={ProgressBarMainLoop}
          show={true}
          loop
          autoPlay
          ref={patcherFillLoopAnim}
        />
      </ProgressBarContainer>

      {/* TODO(TRB): Implement */}
      <ProgressBarTipLoopAnimation
        src={ProgressBarTipIntro}
        show={false}
        ref={patcherTipIntroAnim}
      />

      <ProgressBarTipLoopAnimation
        src={ProgressBarTipLoop}
        show={119 * (currentDownloadPercentage / 100) - 94 > -86}
        style={{
          left: `${119 * (currentDownloadPercentage / 100) - 94}px`,
        }}
        loop
        autoPlay
        ref={patcherTipLoopAnim}
      />

      <ProgressBarBorderAnimation
        src={ProgressBarBorderLoop}
        show={true}
        loop
        autoPlay
        ref={patcherBorderLoopAnim}
      />
    </ProgressContainer>
  );
};

export default PlayButtonPatcher;
