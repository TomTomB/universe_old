import React, { FC, useEffect, useRef, useState } from 'react';
import PlayButtonFrame from '@assets/components/buttons/play/play-button-frame.png';
import PatcherFrameIntro from '@assets/video/buttons/patcher/patcher-frame-intro.webm';
import { PlayButtonState } from '@uikit/components/form/buttons/PlayButton';
import useCompare from '@uikit/hooks/useCompare';
import styled, { css } from 'styled-components';
import Animation from '../Animation';

const Frame = styled.div<{ show: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(${PlayButtonFrame}) no-repeat center;
  background-size: contain;
  opacity: 0;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
    `}
`;

interface PlayButtonLogoProps {
  buttonState: PlayButtonState;
  playPatcherIntro?: boolean;
}

const PlayButtonLogo: FC<PlayButtonLogoProps> = ({
  playPatcherIntro,
  buttonState,
}) => {
  const patcherFrameIntroAnim = useRef<HTMLVideoElement>(null);

  const [patcherFrameIntroEnded, setPatcherFrameIntroEnded] = useState(false);
  const [patcherFrameIntroLoaded, setPatcherFrameIntroLoaded] = useState(false);

  const hasButtonStateChanged = useCompare(buttonState);

  useEffect(() => {
    if (!hasButtonStateChanged) {
      return;
    }

    switch (buttonState) {
      case PlayButtonState.PATCHER:
        if (playPatcherIntro) {
          patcherFrameIntroAnim.current!.currentTime = 0;
          patcherFrameIntroAnim.current!.play();
        }

        break;

      case PlayButtonState.PLAY:
        break;

      case PlayButtonState.LOBBY:
        break;

      case PlayButtonState.HIDDEN:
      default:
        setPatcherFrameIntroEnded(false);

        break;
    }
  }, [hasButtonStateChanged, playPatcherIntro, buttonState]);

  return (
    <>
      <Frame show={patcherFrameIntroEnded} />
      <Animation
        show={!!playPatcherIntro}
        src={PatcherFrameIntro}
        ref={patcherFrameIntroAnim}
        muted
        onLoadedData={() => {
          setPatcherFrameIntroLoaded(true);
        }}
        onEnded={() => {
          if (buttonState === PlayButtonState.HIDDEN) {
            return;
          }
          setPatcherFrameIntroEnded(true);
        }}
      />
    </>
  );
};

export default PlayButtonLogo;
