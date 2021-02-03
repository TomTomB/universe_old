import React, { FC, PropsWithChildren } from 'react';
import { ComponentTypes } from '@types';
import styled, { css } from 'styled-components';
import PlayButtonFrame from '@assets/buttons/play/play-button-frame.png';
import LeagueLogoIntro from '@assets/video/league-logo/league-logo-intro.webm';
import LeagueLogoMagic from '@assets/video/league-logo/league-logo-magic.webm';
import LeagueLogoLoopIdle from '@assets/video/league-logo/league-logo-loop-idle.webm';
import LeagueLogoLoopActive from '@assets/video/league-logo/league-logo-loop-active.webm';
import PatcherFrameIntro from '@assets/video/buttons/patcher/patcher-frame-intro.webm';
import { useMachine } from '@xstate/react';
import stateMachine, { PlayButtonState } from './state';

export { PlayButtonState };

const ContentContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 6px;
  box-sizing: border-box;
  pointer-events: none;
`;
const ButtonText = styled.span`
  font-family: LoL Display;
  font-kerning: normal;
  font-feature-settings: 'kern' 1;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  color: #f0e6d2;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.075em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  pointer-events: none;
`;
const ButtonContainer = styled.button`
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  position: absolute;
  left: 36px;
  top: 0;
  width: calc(100% - 36px);
  height: 100%;
  cursor: pointer;
  outline: none;
`;
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

const VideoIntroContainer = styled.div``;
const HoverMagicContainer = styled.div``;

const LeagueLogoContainer = styled.div`
  position: absolute;
  top: -9px;
  left: -9px;
  width: 64px;
`;

const StyledPlayButton = styled.div`
  width: 162px;
  height: 40px;
  -webkit-app-region: no-drag;
  position: relative;
`;

const Animation = styled.video`
  position: absolute;
`;

interface PlayButtonProps extends ComponentTypes.ButtonProps {
  buttonState: PlayButtonState;
}

const PlayButton: FC<PropsWithChildren<PlayButtonProps>> = ({
  buttonState,
  type,
  children,
  className,
  disabled,
  onClick,
}) => {
  const [current, send] = useMachine(
    stateMachine.withContext({ state: buttonState })
  );

  return (
    <StyledPlayButton className={className}>
      <Frame show={!current.matches('intro')} />
      {current.matches('intro') && (
        <Animation src={PatcherFrameIntro} muted autoPlay />
      )}
      <LeagueLogoContainer>
        {current.matches('intro') && (
          <Animation
            src={LeagueLogoIntro}
            muted
            autoPlay
            onEnded={() => send('ACTIVE')}
          />
        )}
        {current.matches('idle') && (
          <Animation src={LeagueLogoLoopIdle} muted autoPlay loop />
        )}
        {current.matches('active') && (
          <Animation src={LeagueLogoLoopActive} muted autoPlay loop />
        )}
        {current.matches('click') && (
          <Animation
            src={LeagueLogoMagic}
            onEnded={() => send('ACTIVE')}
            muted
            autoPlay
          />
        )}
        {/* <Animation src={LeagueLogoLoopActive} muted />
        <Animation src={LeagueLogoMagic} muted />
        <Animation src={LeagueLogoLoopIdle} loop autoPlay muted /> */}
      </LeagueLogoContainer>
      <ButtonContainer
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }

          send('CLICK');
        }}
        disabled={disabled}
        type={type}
      >
        <VideoIntroContainer />
        <HoverMagicContainer />

        <ContentContainer>
          <ButtonText> {children} </ButtonText>
        </ContentContainer>
      </ButtonContainer>
    </StyledPlayButton>
  );
};

export default PlayButton;