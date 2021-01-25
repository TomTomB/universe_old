import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import {
  selectPlayLoginAnimations,
  selectPlayLoginMusic,
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
  const [introEnded, setIntroEnded] = useState(false);

  const playLoginAnimations = useSelector(selectPlayLoginAnimations);
  const playLoginMusic = useSelector(selectPlayLoginMusic);

  const introVideo = useRef<HTMLVideoElement>(null);
  const loopVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playLoginAnimations && video.intro) {
      setIntroEnded(false);
    }
  }, [playLoginAnimations, video]);

  const handleIntroVideoLoadedData = () => {
    introVideo.current?.play();
  };

  const handleIntroVideoEnded = () => {
    loopVideo.current?.play();
    setIntroEnded(true);
  };

  const handleLoopVideoLoadedData = () => {
    if (video.intro) {
      return;
    }
    loopVideo.current?.play();
  };

  const handleLoopVideoEnded = () => {
    loopVideo.current?.play();
  };

  return (
    <>
      {playLoginMusic && (
        <>
          {music.intro && <BackgroundAudio />}
          <BackgroundAudio src={music.loop} autoPlay={playLoginMusic} loop />
        </>
      )}
      {playLoginAnimations && (
        <>
          {video.intro && (
            <DynamicSplash
              show={!introEnded}
              ref={introVideo}
              muted
              src={video.intro}
              onLoadedData={handleIntroVideoLoadedData}
              onEnded={handleIntroVideoEnded}
            />
          )}
          <DynamicSplash
            show={introEnded || !video.intro}
            ref={loopVideo}
            muted
            src={video.loop}
            onLoadedData={handleLoopVideoLoadedData}
            onEnded={handleLoopVideoEnded}
          />
        </>
      )}
      {!playLoginAnimations && <StaticSplash src={picture} />}
    </>
  );
};

export default SplashScreen;
