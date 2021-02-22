import { useCompare } from '@uikit/hooks';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { PlayButtonState } from '..';
import Animation, { AnimationWithTransition } from '../Animation';
import PatcherToPlay from '@assets/video/buttons/patcher/patcher-to-play-button-enabled.webm';
import PlayButtonEnabledIntro from '@assets/video/buttons/play-button/play-button-enabled-intro.webm';
import LobbyToPlay from '@assets/video/buttons/lobby-button/lobby-button-to-play-button.webm';
import PlayButtonHoverIntro from '@assets/video/buttons/play-button/play-button-hover-intro.webm';
import PlayButtonHoverLoop from '@assets/video/buttons/play-button/play-button-hover-loop.webm';
import PlayButtonHoverOutro from '@assets/video/buttons/play-button/play-button-hover-outro.webm';
import PlayButtonMagicRelease from '@assets/video/buttons/play-button/play-button-magic-release.webm';
import PlayButtonRelease from '@assets/video/buttons/play-button/play-button-release.webm';

interface PlayContainerProps {
  show: boolean;
  instant: boolean;
}

const PlayContainer = styled.div<PlayContainerProps>`
  position: absolute;
  width: 160px;
  height: 60px;
  top: -8px;
  left: -24px;
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

  ${({ instant }) =>
    instant &&
    css`
      transition: none;
    `}
`;

const PatcherToPlayAnimation = styled(AnimationWithTransition)`
  min-width: 175px;
  max-width: 175px;
  width: 175px;
  height: 60px;
  left: 11px;
  object-fit: cover;
`;

const PlayAnimation = styled(AnimationWithTransition)`
  min-width: 145px;
  max-width: 145px;
  width: 145px;
  height: 60px;
  left: 8px;
`;

const PlayAnimationWithoutTransition = styled(Animation)`
  min-width: 145px;
  max-width: 145px;
  width: 145px;
  height: 60px;
  left: 8px;
`;

interface PlayButtonPlayProps {
  buttonState: { prev: PlayButtonState; curr: PlayButtonState };
  disabled: boolean;
}

const PlayButtonPlay: FC<PlayButtonPlayProps> = ({ buttonState, disabled }) => {
  const patcherToPlayElem = useRef<HTMLVideoElement>(null);
  const lobbyToPlayElem = useRef<HTMLVideoElement>(null);

  const playEnabledIntroElem = useRef<HTMLVideoElement>(null);
  const playHoverIntroElem = useRef<HTMLVideoElement>(null);
  const playHoverLoopElem = useRef<HTMLVideoElement>(null);
  const playHoverOutroElem = useRef<HTMLVideoElement>(null);
  const playReleaseElem = useRef<HTMLVideoElement>(null);
  const playReleaseMagicElem = useRef<HTMLVideoElement>(null);

  const hasButtonStateChanged = useCompare(buttonState.curr);

  const [showPatcherToPlay, setShowPatcherToPlay] = useState(false);
  const [showLobbyToPlay, setShowLobbyToPlay] = useState(false);
  const [transitionToPlayEnded, setTransitionToPlayEnded] = useState(false);

  useEffect(() => {
    if (!hasButtonStateChanged) {
      return;
    }

    switch (buttonState.curr) {
      case PlayButtonState.PATCHER:
        setTransitionToPlayEnded(false);
        setShowPatcherToPlay(false);
        break;

      case PlayButtonState.PLAY:
        if (buttonState.prev === PlayButtonState.PATCHER && !disabled) {
          setShowPatcherToPlay(true);
          patcherToPlayElem.current!.currentTime = 0;
          patcherToPlayElem.current!.play();
        } else if (buttonState.prev === PlayButtonState.PLAY_DISABLED) {
          playEnabledIntroElem.current!.currentTime = 0;
          playEnabledIntroElem.current!.play();
        } else if (
          buttonState.prev === PlayButtonState.LOBBY_DISABLED ||
          buttonState.prev === PlayButtonState.LOBBY
        ) {
          setShowLobbyToPlay(true);
          lobbyToPlayElem.current!.currentTime = 0;
          lobbyToPlayElem.current!.play();
        }

        break;

      case PlayButtonState.PLAY_DISABLED:
        if (buttonState.prev === PlayButtonState.PLAY) {
          playReleaseElem.current!.currentTime = 0;
          playReleaseElem.current!.play();
          playReleaseMagicElem.current!.currentTime = 0;
          playReleaseMagicElem.current!.play();
        }

        break;

      case PlayButtonState.LOBBY:
        break;

      case PlayButtonState.LOBBY_DISABLED:
        break;

      case PlayButtonState.HIDDEN:
      default:
        setTransitionToPlayEnded(false);
        setShowPatcherToPlay(false);
        break;
    }
  }, [hasButtonStateChanged, buttonState, disabled]);

  return (
    <PlayContainer
      show={
        buttonState.curr === PlayButtonState.PLAY ||
        buttonState.curr === PlayButtonState.PLAY_DISABLED
      }
      instant={
        buttonState.curr === PlayButtonState.PLAY_DISABLED &&
        buttonState.prev === PlayButtonState.LOBBY_DISABLED
      }
    >
      <PatcherToPlayAnimation
        show={showPatcherToPlay}
        src={PatcherToPlay}
        ref={patcherToPlayElem}
        onEnded={() => {
          if (buttonState.curr === PlayButtonState.HIDDEN) {
            return;
          }
          setTransitionToPlayEnded(true);
          setShowPatcherToPlay(false);
        }}
      />

      <PlayAnimationWithoutTransition
        show={showLobbyToPlay}
        src={LobbyToPlay}
        ref={lobbyToPlayElem}
        onEnded={() => {
          if (buttonState.curr === PlayButtonState.HIDDEN) {
            return;
          }
          setTransitionToPlayEnded(true);
          setShowLobbyToPlay(false);
        }}
      />

      <PlayAnimationWithoutTransition
        show={
          (transitionToPlayEnded ||
            buttonState.prev !== PlayButtonState.PATCHER) &&
          buttonState.curr !== PlayButtonState.PLAY_DISABLED &&
          !showLobbyToPlay
        }
        src={PlayButtonEnabledIntro}
        ref={playEnabledIntroElem}
        autoPlay
      />

      {/* TODO(TRB): Play once and show on hover */}
      <PlayAnimation
        show={false}
        src={PlayButtonHoverIntro}
        ref={playHoverIntroElem}
      />

      {/* TODO(TRB): Show on hover */}
      <PlayAnimation
        show={false}
        src={PlayButtonHoverLoop}
        autoPlay
        loop
        ref={playHoverLoopElem}
      />

      {/* TODO(TRB): Implement */}
      <PlayAnimation
        show={false}
        src={PlayButtonHoverOutro}
        ref={playHoverOutroElem}
      />

      <PlayAnimationWithoutTransition
        show={buttonState.curr === PlayButtonState.PLAY_DISABLED}
        src={PlayButtonRelease}
        ref={playReleaseElem}
      />

      <PlayAnimationWithoutTransition
        show={buttonState.curr === PlayButtonState.PLAY_DISABLED}
        src={PlayButtonMagicRelease}
        ref={playReleaseMagicElem}
      />
    </PlayContainer>
  );
};

export default PlayButtonPlay;
