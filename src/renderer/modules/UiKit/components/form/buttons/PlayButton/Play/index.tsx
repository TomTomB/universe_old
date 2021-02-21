import { useCompare } from '@uikit/hooks';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { PlayButtonState } from '..';
import { AnimationWithTransition } from '../Animation';
import PatcherToPlay from '@assets/video/buttons/patcher/patcher-to-play-button-enabled.webm';
import PlayButtonHoverOutro from '@assets/video/buttons/play-button/play-button-hover-outro.webm';
import PlayButtonEnabledIntro from '@assets/video/buttons/play-button/play-button-enabled-intro.webm';

interface PlayContainerProps {
  show: boolean;
}

const PlayContainer = styled.div<PlayContainerProps>`
  position: absolute;
  width: 160px;
  height: 60px;
  top: -10px;
  left: -20px;
  overflow: hidden;
  opacity: 0;
  transform-origin: left center;
  pointer-events: none;
  transition: opacity 300ms ${({ theme }) => theme.easing.soft};

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
    `}
`;

const PatcherToPlayAnimation = styled(AnimationWithTransition)`
  min-width: 170px;
  max-width: 170px;
  width: 170px;
  height: 60px;
  left: 10px;
  object-fit: cover;
`;

const PlayOutroAnimation = styled(AnimationWithTransition)`
  min-width: 140px;
  max-width: 140px;
  width: 140px;
  height: 60px;
  left: 8px;
`;

interface PlayButtonPlayProps {
  buttonState: { prev: PlayButtonState; curr: PlayButtonState };
  disabled: boolean;
}

const PlayButtonPlay: FC<PlayButtonPlayProps> = ({ buttonState, disabled }) => {
  const patcherToPlayElem = useRef<HTMLVideoElement>(null);
  const playHoverOutroElem = useRef<HTMLVideoElement>(null);

  const hasButtonStateChanged = useCompare(buttonState.curr);

  const [showPatcherToPlay, setShowPatcherToPlay] = useState(false);
  const [patcherToPlayEnded, setPatcherToPlayEnded] = useState(false);

  useEffect(() => {
    if (!hasButtonStateChanged) {
      return;
    }

    switch (buttonState.curr) {
      case PlayButtonState.PATCHER:
        break;

      case PlayButtonState.PLAY:
        if (buttonState.prev === PlayButtonState.PATCHER && !disabled) {
          setShowPatcherToPlay(true);
          patcherToPlayElem.current!.currentTime = 0;
          patcherToPlayElem.current!.play();

          playHoverOutroElem.current!.play();
        }

        break;

      case PlayButtonState.LOBBY:
        break;

      case PlayButtonState.HIDDEN:
      default:
        setPatcherToPlayEnded(false);
        break;
    }
  }, [hasButtonStateChanged, buttonState, disabled]);

  return (
    <PlayContainer show={buttonState.curr === PlayButtonState.PLAY}>
      <PatcherToPlayAnimation
        show={showPatcherToPlay}
        src={PatcherToPlay}
        ref={patcherToPlayElem}
        onEnded={() => {
          if (buttonState.curr === PlayButtonState.HIDDEN) {
            return;
          }
          setPatcherToPlayEnded(true);
          setShowPatcherToPlay(false);
        }}
      />
      <PlayOutroAnimation
        show={
          patcherToPlayEnded || buttonState.prev !== PlayButtonState.PATCHER
        }
        src={PlayButtonHoverOutro}
        ref={playHoverOutroElem}
        // onEnded={() => {
        //   if (buttonState.curr === PlayButtonState.HIDDEN) {
        //     return;
        //   }
        //   setPatcherFrameIntroEnded(true);
        // }}
      />
    </PlayContainer>
  );
};

export default PlayButtonPlay;
