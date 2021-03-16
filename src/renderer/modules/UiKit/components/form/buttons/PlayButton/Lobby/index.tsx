import Animation, { AnimationWithTransition } from '../Animation';
import React, { FC, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import LobbyHoverIntro from '@assets/video/buttons/lobby-button/lobby-button-hover-intro.webm';
import LobbyHoverLoop from '@assets/video/buttons/lobby-button/lobby-button-hover-loop.webm';
import LobbyHoverOutro from '@assets/video/buttons/lobby-button/lobby-button-hover-outro.webm';
import LobbyIntro from '@assets/video/buttons/lobby-button/lobby-button-intro.webm';
import LobbyMagicRelease from '@assets/video/buttons/lobby-button/lobby-button-magic-release.webm';
import LobbyRelease from '@assets/video/buttons/lobby-button/lobby-button-release.webm';
import { PlayButtonState } from '..';
import { useCompare } from '@uikit/hooks';

interface LobbyContainerProps {
  show: boolean;
  instant: boolean;
}

const LobbyContainer = styled.div<LobbyContainerProps>`
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

const LobbyAnimation = styled(AnimationWithTransition)`
  min-width: 145px;
  max-width: 145px;
  width: 145px;
  height: 60px;
  left: 8px;
`;

const LobbyAnimationWithoutTransition = styled(Animation)`
  min-width: 145px;
  max-width: 145px;
  width: 145px;
  height: 60px;
  left: 8px;
`;

interface PlayButtonLobbyProps {
  buttonState: { prev: PlayButtonState; curr: PlayButtonState };
  disabled: boolean;
  isHovering: boolean;
}

const PlayButtonLobby: FC<PlayButtonLobbyProps> = ({
  buttonState,
  disabled,
  isHovering,
}) => {
  const lobbyHoverIntroElem = useRef<HTMLVideoElement>(null);
  const lobbyHoverLoopElem = useRef<HTMLVideoElement>(null);
  const lobbyHoverOutroElem = useRef<HTMLVideoElement>(null);
  const lobbyIntroElem = useRef<HTMLVideoElement>(null);
  const lobbyMagicReleaseElem = useRef<HTMLVideoElement>(null);
  const lobbyReleaseElem = useRef<HTMLVideoElement>(null);

  const hasButtonStateChanged = useCompare(buttonState.curr);

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
        if (buttonState.prev === PlayButtonState.LOBBY_DISABLED) {
          lobbyIntroElem.current!.currentTime = 0;
          lobbyIntroElem.current!.play();
        }
        break;

      case PlayButtonState.LOBBY_DISABLED:
        if (buttonState.prev === PlayButtonState.LOBBY) {
          lobbyMagicReleaseElem.current!.currentTime = 0;
          lobbyMagicReleaseElem.current!.play();

          lobbyReleaseElem.current!.currentTime = 0;
          lobbyReleaseElem.current!.play();
        }
        break;

      case PlayButtonState.HIDDEN:
      default:
        break;
    }
  }, [hasButtonStateChanged, buttonState, disabled]);

  useEffect(() => {
    if (isHovering) {
      lobbyHoverIntroElem.current!.currentTime = 0;
      lobbyHoverIntroElem.current!.play();
    }
  }, [isHovering]);

  return (
    <LobbyContainer
      show={
        buttonState.curr === PlayButtonState.LOBBY ||
        buttonState.curr === PlayButtonState.LOBBY_DISABLED
      }
      instant={
        buttonState.curr === PlayButtonState.LOBBY_DISABLED &&
        buttonState.prev === PlayButtonState.PLAY_DISABLED
      }
    >
      <LobbyAnimationWithoutTransition
        show={
          buttonState.prev === PlayButtonState.LOBBY_DISABLED &&
          buttonState.curr === PlayButtonState.LOBBY
        }
        src={LobbyIntro}
        ref={lobbyIntroElem}
      />

      <LobbyAnimation
        show={isHovering}
        src={LobbyHoverIntro}
        ref={lobbyHoverIntroElem}
      />

      <LobbyAnimation
        show={isHovering}
        src={LobbyHoverLoop}
        autoPlay
        loop
        ref={lobbyHoverLoopElem}
      />

      {/* TODO(TRB): Implement */}
      <LobbyAnimation
        show={false}
        src={LobbyHoverOutro}
        ref={lobbyHoverOutroElem}
      />

      <LobbyAnimationWithoutTransition
        show={
          buttonState.curr === PlayButtonState.LOBBY_DISABLED &&
          (buttonState.prev === PlayButtonState.LOBBY ||
            buttonState.prev === PlayButtonState.PLAY_DISABLED)
        }
        autoPlay
        src={LobbyRelease}
        ref={lobbyReleaseElem}
      />

      <LobbyAnimationWithoutTransition
        show={
          buttonState.curr === PlayButtonState.LOBBY_DISABLED &&
          (buttonState.prev === PlayButtonState.LOBBY ||
            buttonState.prev === PlayButtonState.PLAY_DISABLED)
        }
        autoPlay
        src={LobbyMagicRelease}
        ref={lobbyMagicReleaseElem}
      />
    </LobbyContainer>
  );
};

export default PlayButtonLobby;
