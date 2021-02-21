import React, { FC, useEffect, useRef } from 'react';
import { PlayButtonState } from '@uikit/components/form/buttons/PlayButton';
import useCompare from '@uikit/hooks/useCompare';
import styled from 'styled-components';
import ProgressBarMainLoop from '@assets/video/buttons/progress-bar/progress-bar-main-loop.webm';
import ProgressBarBorderLoop from '@assets/video/buttons/progress-bar/progress-bar-border-loop.webm';
import ProgressBarTipIntro from '@assets/video/buttons/progress-bar/progress-bar-tip-intro.webm';
import ProgressBarTipLoop from '@assets/video/buttons/progress-bar/progress-bar-tip-loop.webm';
import { AnimationWithTransition } from '../Animation';
import { DownloadProgress } from '@typings/electron';

const ProgressBarContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 16px;
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
  top: 0;
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
  buttonState: PlayButtonState;
  playPatcherIntro?: boolean;
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

  const hasButtonStateChanged = useCompare(buttonState);

  const currentDownloadPercentage = downloadProgress?.percent ?? 0;

  useEffect(() => {
    if (!hasButtonStateChanged) {
      return;
    }

    switch (buttonState) {
      case PlayButtonState.PATCHER:
        if (playPatcherIntro) {
        }

        break;

      case PlayButtonState.PLAY:
        break;

      case PlayButtonState.LOBBY:
        break;

      case PlayButtonState.HIDDEN:
      default:
        break;
    }
  }, [hasButtonStateChanged, playPatcherIntro, buttonState]);

  return (
    <>
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

      {/* <ProgressBarTipLoopAnimation
        src={ProgressBarTipIntro}
        show={true}
        style={{
          left: `${119 * (currentDownloadPercentage / 100) - 94}px`,
        }}
        autoPlay
        loop
        ref={patcherTipIntroAnim}
      /> */}

      <ProgressBarTipLoopAnimation
        src={ProgressBarTipLoop}
        show={true}
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
    </>
  );
};

export default PlayButtonPatcher;
