import React, { FC, PropsWithChildren, useEffect } from 'react';
import { ComponentTypes } from '@types';
import styled, { css, keyframes } from 'styled-components';
import PlayButtonFrame from '@assets/components/buttons/play/play-button-frame.png';
import LeagueLogoIntro from '@assets/video/league-logo/league-logo-intro.webm';
import LeagueLogoMagic from '@assets/video/league-logo/league-logo-magic.webm';
import LeagueLogoLoopIdle from '@assets/video/league-logo/league-logo-loop-idle.webm';
import LeagueLogoLoopActive from '@assets/video/league-logo/league-logo-loop-active.webm';
import ProgressBarMainLoop from '@assets/video/buttons/progress-bar/progress-bar-main-loop.webm';
import ProgressBarBorderLoop from '@assets/video/buttons/progress-bar/progress-bar-border-loop.webm';
import ProgressBarTipLoop from '@assets/video/buttons/progress-bar/progress-bar-tip-loop.webm';
import PatcherFrameIntro from '@assets/video/buttons/patcher/patcher-frame-intro.webm';
import { useMachine } from '@xstate/react';
import { UpdaterStatus } from '@store/slices/updater/updaterSlice';
import stateMachine from './state';
import { DownloadProgress } from '../../../../../../../types/electron';

const textShowAnimation = keyframes`
  from{
    transform: translateX(-5px)
  }
  to {
    opacity: 1;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 6px;
  box-sizing: border-box;
  pointer-events: none;
`;
const ButtonText = styled.span<{ intro: boolean }>`
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

  ${({ intro }) =>
    intro &&
    css`
      opacity: 0;
      animation: ${textShowAnimation} 300ms forwards 750ms
        cubic-bezier(0, 0, 0, 1);
    `};
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
const ProgressContainer = styled.div`
  position: absolute;
  width: 160px;
  height: 60px;
  top: -10px;
  overflow: hidden;
`;
const ProgressBarContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 10px;
  height: 40px;
  transition: width 100ms cubic-bezier(0, 0, 0, 1);
`;

const LeagueLogoContainer = styled.div`
  position: absolute;
  top: -9px;
  left: -9px;
  width: 64px;
  z-index: 1;
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

const ProgressBarBorderAnimation = styled(Animation)`
  top: 0;
  min-width: 142px;
  max-width: 142px;
  width: 142px;
  height: 60px;
  left: -8px;
`;

const ProgressBarMainLoopAnimation = styled(Animation)`
  top: 4px;
  width: 122px;
  min-width: 122px;
  max-width: 122px;
`;

const ProgressBarTipLoopAnimation = styled(Animation)`
  top: 0;
  height: 60px;
  min-width: 142px;
  max-width: 142px;
  width: 142px;
  transition: left 100ms cubic-bezier(0, 0, 0, 1);
`;

interface PlayButtonProps extends ComponentTypes.ButtonProps {
  updaterStatus?: UpdaterStatus;
  downloadProgress?: DownloadProgress | null;
}

const PlayButton: FC<PropsWithChildren<PlayButtonProps>> = ({
  type,
  children,
  className,
  disabled,
  onClick,
  downloadProgress,
  updaterStatus,
}) => {
  const [current, send] = useMachine(stateMachine);

  useEffect(() => {
    if (
      updaterStatus === 'found-update' ||
      updaterStatus === 'download-progress'
    ) {
      send({ type: 'TO_PATCHER_INTRO' });
    }
  }, [updaterStatus, send]);

  useEffect(() => {
    if (downloadProgress) {
      send({
        type: 'PATCHER_PROGRESS',
        value: downloadProgress.percent,
      });
    }
  }, [downloadProgress, send]);

  const addTenToProgress = () => {
    send({
      type: 'PATCHER_PROGRESS',
      value:
        current.context.patcherProgress < 100
          ? current.context.patcherProgress + 10
          : 0,
    });
  };

  return (
    <StyledPlayButton className={className}>
      <Frame show={!current.matches('patcher.intro')} />
      {current.matches('patcher.intro') && (
        <Animation src={PatcherFrameIntro} muted autoPlay />
      )}
      <LeagueLogoContainer>
        {current.matches('patcher.intro') && (
          <Animation
            src={LeagueLogoIntro}
            muted
            autoPlay
            onEnded={() => send('PATCHER_INTRO_END')}
          />
        )}
        {current.matches('play') ||
          (current.matches('lobby') && (
            <Animation src={LeagueLogoLoopIdle} muted autoPlay loop />
          ))}
        {current.matches('patcher.progress') && (
          <Animation src={LeagueLogoLoopActive} muted autoPlay loop />
        )}
        {current.matches('click') && (
          <Animation src={LeagueLogoMagic} muted autoPlay />
        )}
      </LeagueLogoContainer>
      <ButtonContainer
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
          addTenToProgress();
        }}
        disabled={disabled}
        type={type}
      >
        <VideoIntroContainer />
        <HoverMagicContainer />
        {current.matches('patcher.progress') && (
          <ProgressContainer>
            <ProgressBarContainer
              style={{
                width: `${122 * (current.context.patcherProgress / 100)}px`,
              }}
            >
              <ProgressBarMainLoopAnimation
                src={ProgressBarMainLoop}
                muted
                autoPlay
                loop
              />
            </ProgressBarContainer>

            {current.context.patcherProgress >= 5 && (
              <ProgressBarTipLoopAnimation
                src={ProgressBarTipLoop}
                style={{
                  left: `${
                    122 * (current.context.patcherProgress / 100) - 115
                  }px`,
                }}
                muted
                autoPlay
                loop
              />
            )}

            <ProgressBarBorderAnimation
              src={ProgressBarBorderLoop}
              muted
              autoPlay
              loop
            />
          </ProgressContainer>
        )}
        <ContentContainer>
          <ButtonText intro={current.matches('patcher.intro')}>
            {children}
          </ButtonText>
        </ContentContainer>
      </ButtonContainer>
    </StyledPlayButton>
  );
};

export default PlayButton;
