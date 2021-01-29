import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import {
  selectPlayLoginAnimations,
  selectPlayLoginMusic,
  selectReplayLoginMusicAndVideoId,
} from '@store/settings/settingsSlice';

const StaticSplash = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const DynamicSplash = styled.video<{ show: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;

  ${({ show }) =>
    show &&
    css`
      display: block;
    `}
`;

const BackgroundAudio = styled.audio`
  display: none;
`;

interface SplashScreenProps {
  video: {
    intro?: string;
    loop: string;
  };
  music: {
    intro?: string;
    loop: string;
  };
  picture: string;
}

const SplashScreen: FC<SplashScreenProps> = ({ video, music, picture }) => {
  const [introVideoEnded, setIntroVideoEnded] = useState(false);
  const [introMusicEnded, setIntroMusicEnded] = useState(false);

  const playLoginAnimations = useSelector(selectPlayLoginAnimations);
  const playLoginMusic = useSelector(selectPlayLoginMusic);
  const replayLoginMusicAndVideoId = useSelector(
    selectReplayLoginMusicAndVideoId
  );

  const introVideo = useRef<HTMLVideoElement>(null);
  const loopVideo = useRef<HTMLVideoElement>(null);

  const introMusic = useRef<HTMLVideoElement>(null);
  const loopMusic = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playLoginAnimations) {
      return;
    }
    setIntroVideoEnded(false);
    setIntroMusicEnded(false);
  }, [playLoginAnimations, video, music]);

  useEffect(() => {
    if (playLoginAnimations) {
      if (video.intro && introVideoEnded && introVideo.current) {
        setIntroVideoEnded(false);
        introVideo.current.currentTime = 0.1;
        introVideo.current.play();
      } else if (introVideo.current) {
        introVideo.current.currentTime = 0.1;
        introVideo.current.play();
      } else if (loopVideo.current) {
        loopVideo.current.currentTime = 0.1;
        loopVideo.current.play();
      }
    }
    if (playLoginMusic) {
      if (
        music.intro &&
        introMusicEnded &&
        introMusic.current &&
        loopMusic.current
      ) {
        setIntroMusicEnded(false);
        introMusic.current.currentTime = 0.1;
        introMusic.current.play();
        loopMusic.current?.pause();
        loopMusic.current.currentTime = 0;
      } else if (introMusic.current) {
        introMusic.current.currentTime = 0.1;
        introMusic.current.play();
      } else if (loopMusic.current) {
        loopMusic.current.currentTime = 0.1;
        loopMusic.current.play();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayLoginMusicAndVideoId]);

  const handleIntroVideoLoadedData = () => {
    introVideo.current?.play();
  };

  const handleIntroVideoEnded = () => {
    loopVideo.current?.play();
    setIntroVideoEnded(true);
  };

  const handleLoopVideoLoadedData = () => {
    if (video.intro) {
      return;
    }
    loopVideo.current?.play();
  };

  const handleLoopVideoEnded = () => {
    if (!loopVideo.current) return;

    loopVideo.current.currentTime = 0.1;
    loopVideo.current.play();
  };

  const handleIntroMusicLoadedData = () => {
    if (!introMusic.current) return;

    introMusic.current.currentTime = 0.1;
    introMusic.current.play();
  };

  const handleIntroMusicEnded = () => {
    loopMusic.current?.play();
    setIntroMusicEnded(true);
  };

  const handleLoopMusicLoadedData = () => {
    if (!loopMusic.current || music.intro) return;

    loopMusic.current.currentTime = 0.1;
    loopMusic.current.play();
  };

  const handleLoopMusicEnded = () => {
    if (!loopMusic.current) return;

    loopMusic.current.currentTime = 0.1;
    loopMusic.current?.play();
  };

  return (
    <>
      {playLoginMusic && (
        <>
          {music.intro && (
            <BackgroundAudio
              src={music.intro}
              ref={introMusic}
              onLoadedData={handleIntroMusicLoadedData}
              onEnded={handleIntroMusicEnded}
            />
          )}
          <BackgroundAudio
            src={music.loop}
            ref={loopMusic}
            onLoadedData={handleLoopMusicLoadedData}
            onEnded={handleLoopMusicEnded}
          />
        </>
      )}
      <StaticSplash src={picture} />
      {playLoginAnimations && (
        <>
          {video.intro && (
            <DynamicSplash
              show={!introVideoEnded}
              ref={introVideo}
              muted
              src={video.intro}
              onLoadedData={handleIntroVideoLoadedData}
              onEnded={handleIntroVideoEnded}
            />
          )}
          <DynamicSplash
            show={introVideoEnded || !video.intro}
            ref={loopVideo}
            muted
            src={video.loop}
            onLoadedData={handleLoopVideoLoadedData}
            onEnded={handleLoopVideoEnded}
          />
        </>
      )}
    </>
  );
};

export default SplashScreen;
