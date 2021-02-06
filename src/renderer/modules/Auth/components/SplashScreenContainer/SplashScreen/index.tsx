import {
  SplashScreenAudioMachine,
  SplashScreenVideoMachine,
} from '@uikit/machines';
import React, { FC, useRef } from 'react';
import styled, { css } from 'styled-components';
import { State } from 'xstate';

const StaticSplash = styled.img<{ show: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 300ms cubic-bezier(0, 0, 0, 1);

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
    `}
`;

const DynamicSplash = styled.video<{ show: boolean; enabled: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 300ms cubic-bezier(0, 0, 0, 1);

  ${({ show }) =>
    show &&
    css`
      z-index: 2;
    `}

  ${({ enabled }) =>
    enabled &&
    css`
      opacity: 1;
    `}
`;

const BackgroundAudio = styled.audio`
  display: none;
`;

interface SplashScreenProps {
  video: {
    intro?: string;
    loop: string;
    current: State<
      SplashScreenVideoMachine.MachineContext,
      SplashScreenVideoMachine.MachineEvent
    >;
    send: (event: SplashScreenVideoMachine.MachineEvent) => void;
  };
  music: {
    intro?: string;
    loop: string;
    current: State<
      SplashScreenAudioMachine.MachineContext,
      SplashScreenAudioMachine.MachineEvent
    >;
    send: (event: SplashScreenAudioMachine.MachineEvent) => void;
  };
  picture: string;
}

const SplashScreen: FC<SplashScreenProps> = ({ video, music, picture }) => {
  const introVideo = useRef<HTMLVideoElement>(null);
  const loopVideo = useRef<HTMLVideoElement>(null);

  const introMusic = useRef<HTMLVideoElement>(null);
  const loopMusic = useRef<HTMLVideoElement>(null);

  return (
    <>
      <BackgroundAudio
        src={music.intro}
        ref={introMusic}
        onLoadedData={() => {
          music.send({
            element: introMusic.current,
            type: 'LOADED_INTRO_MUSIC',
          });
        }}
      />
      <BackgroundAudio
        src={music.loop}
        ref={loopMusic}
        onLoadedData={() => {
          music.send({
            element: loopMusic.current,
            type: 'LOADED_LOOP_MUSIC',
          });
        }}
        onEnded={() => {
          music.send({
            type: 'LOOP_END',
          });
        }}
      />
      <StaticSplash
        src={picture}
        show={
          !video.current.context.isVideoEnabled ||
          video.current.matches('loading')
        }
      />
      <DynamicSplash
        show={video.current.matches('playing.loop')}
        enabled={
          video.current.context.isVideoEnabled &&
          !video.current.matches('loading')
        }
        ref={loopVideo}
        muted
        src={video.loop}
        onLoadedData={() => {
          video.send({
            element: loopVideo.current,
            type: 'LOADED_LOOP_VIDEO',
          });
        }}
        onEnded={() => {
          video.send({
            type: 'LOOP_END',
          });
        }}
      />
      <DynamicSplash
        show={video.current.matches('playing.intro')}
        enabled={
          video.current.context.isVideoEnabled &&
          !video.current.matches('loading')
        }
        ref={introVideo}
        muted
        src={video.intro}
        onLoadedData={() => {
          if (!introVideo.current) {
            return;
          }
          video.send({
            element: introVideo.current,
            type: 'LOADED_INTRO_VIDEO',
          });
        }}
        onEnded={() => {
          video.send({
            type: 'INTRO_END',
          });
        }}
      />
    </>
  );
};

export default SplashScreen;
