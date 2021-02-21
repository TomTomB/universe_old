import React, { FC, useEffect, useRef, useState } from 'react';
import LeagueLogoIntro from '@assets/video/league-logo/league-logo-intro.webm';
import LeagueLogoMagic from '@assets/video/league-logo/league-logo-magic.webm';
import LeagueLogoLoopIdle from '@assets/video/league-logo/league-logo-loop-idle.webm';
import LeagueLogoLoopActive from '@assets/video/league-logo/league-logo-loop-active.webm';
import { PlayButtonState } from '@uikit/components/form/buttons/PlayButton';
import useCompare from '@uikit/hooks/useCompare';
import Animation from '../Animation';

interface PlayButtonFrameProps {
  buttonState: PlayButtonState;
  playPatcherIntro?: boolean;
}

enum LogoAnim {
  INTRO,
  IDLE,
  ACTIVE,
}

const PlayButtonFrame: FC<PlayButtonFrameProps> = ({
  playPatcherIntro,
  buttonState,
}) => {
  const logoIntroAnim = useRef<HTMLVideoElement>(null);
  const logoMagicAnim = useRef<HTMLVideoElement>(null);
  const logoLoopIdleAnim = useRef<HTMLVideoElement>(null);
  const logoLoopActiveAnim = useRef<HTMLVideoElement>(null);

  const [shownLogoAnim, setShownLogoAnim] = useState<LogoAnim | null>(null);

  const [showLogoMagic, setShowLogoMagic] = useState(false);

  const [logoIntroEnded, setLogoIntroEnded] = useState(false);
  const [logoLoopIdleEnded, setLogoLoopIdleEnded] = useState(false);
  const [logoLoopActiveEnded, setLogoLoopActiveEnded] = useState(false);
  const [logoMagicEnded, setLogoMagicEnded] = useState(false);

  const hasButtonStateChanged = useCompare(buttonState);

  useEffect(() => {
    if (!hasButtonStateChanged) {
      return;
    }

    switch (buttonState) {
      case PlayButtonState.PATCHER:
        if (playPatcherIntro) {
          setShownLogoAnim(LogoAnim.INTRO);
          logoIntroAnim.current!.currentTime = 0;
          logoIntroAnim.current!.play();
        }

        break;

      case PlayButtonState.PLAY:
        break;

      case PlayButtonState.LOBBY:
        break;

      case PlayButtonState.HIDDEN:
      default:
        setLogoIntroEnded(false);
        setLogoLoopIdleEnded(false);
        setLogoLoopActiveEnded(false);
        setLogoMagicEnded(false);
        break;
    }
  }, [hasButtonStateChanged, playPatcherIntro, buttonState]);

  useEffect(() => {
    if (!logoIntroEnded) {
      return;
    }

    setShownLogoAnim(LogoAnim.ACTIVE);
    logoLoopActiveAnim.current!.currentTime = 0;
    logoLoopActiveAnim.current!.play();
  }, [logoIntroEnded]);

  useEffect(() => {
    if (!logoLoopActiveEnded) {
      return;
    }

    logoLoopActiveAnim.current!.currentTime = 0;
    logoLoopActiveAnim.current!.play();
    setLogoLoopActiveEnded(false);
  }, [logoLoopActiveEnded, showLogoMagic]);

  useEffect(() => {
    if (!logoLoopIdleEnded) {
      return;
    }

    logoLoopIdleAnim.current!.currentTime = 0;
    logoLoopIdleAnim.current!.play();
    setLogoLoopIdleEnded(false);
  }, [logoLoopIdleEnded]);

  //TODO(TRB): If the magic anim plays, the current loop needs to be paused and reset
  useEffect(() => {
    if (logoMagicEnded) {
      logoMagicAnim.current!.currentTime = 0;
      setShowLogoMagic(false);
      setLogoMagicEnded(false);
      console.log('ended');
    }
  }, [logoMagicEnded]);

  return (
    <>
      <Animation
        show={shownLogoAnim === LogoAnim.INTRO}
        src={LeagueLogoIntro}
        ref={logoIntroAnim}
        onEnded={() => {
          if (buttonState === PlayButtonState.HIDDEN) {
            return;
          }
          setLogoIntroEnded(true);
        }}
      />
      <Animation
        show={shownLogoAnim === LogoAnim.IDLE}
        src={LeagueLogoLoopIdle}
        ref={logoLoopIdleAnim}
        onEnded={() => {
          if (buttonState === PlayButtonState.HIDDEN) {
            return;
          }
          setLogoLoopIdleEnded(true);
        }}
      />
      <Animation
        show={shownLogoAnim === LogoAnim.ACTIVE}
        src={LeagueLogoLoopActive}
        ref={logoLoopActiveAnim}
        onEnded={() => {
          if (buttonState === PlayButtonState.HIDDEN) {
            return;
          }
          setLogoLoopActiveEnded(true);
        }}
      />
      <Animation
        show={showLogoMagic}
        src={LeagueLogoMagic}
        ref={logoMagicAnim}
        onEnded={() => {
          if (buttonState === PlayButtonState.HIDDEN) {
            return;
          }
          setLogoMagicEnded(true);
        }}
      />
    </>
  );
};

export default PlayButtonFrame;
