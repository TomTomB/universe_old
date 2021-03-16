import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Animation from '../Animation';
import PatcherFrameIntro from '@assets/video/buttons/patcher/patcher-frame-intro.webm';
import PlayButtonFrameImage from '@assets/components/buttons/play/play-button-frame-default.png';
import { PlayButtonState } from '..';
import { useCompare } from '@uikit/hooks';

const Frame = styled.div<{ show: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${PlayButtonFrameImage});
  transition: 400ms background ease;
  opacity: 0;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
    `}
`;

const FrameAnimation = styled(Animation)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

interface PlayButtonFrameProps {
  buttonState: { prev: PlayButtonState; curr: PlayButtonState };
  playPatcherIntro: boolean;
}

const PlayButtonFrame: FC<PlayButtonFrameProps> = ({
  playPatcherIntro,
  buttonState,
}) => {
  const patcherFrameIntroAnim = useRef<HTMLVideoElement>(null);

  const [patcherFrameIntroEnded, setPatcherFrameIntroEnded] = useState(false);

  const hasButtonStateChanged = useCompare(buttonState.curr);

  useEffect(() => {
    if (!hasButtonStateChanged) {
      return;
    }

    switch (buttonState.curr) {
      case PlayButtonState.PATCHER:
        if (playPatcherIntro && buttonState.prev === PlayButtonState.HIDDEN) {
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
  }, [playPatcherIntro, buttonState, hasButtonStateChanged]);

  return (
    <>
      <Frame
        show={
          (patcherFrameIntroEnded || !playPatcherIntro) &&
          buttonState.curr !== PlayButtonState.HIDDEN
        }
      />
      <FrameAnimation
        show={playPatcherIntro && !patcherFrameIntroEnded}
        src={PatcherFrameIntro}
        ref={patcherFrameIntroAnim}
        muted
        onEnded={() => {
          if (buttonState.curr === PlayButtonState.HIDDEN) {
            return;
          }
          setPatcherFrameIntroEnded(true);
        }}
      />
    </>
  );
};

export default PlayButtonFrame;
