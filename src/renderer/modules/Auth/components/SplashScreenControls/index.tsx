import React, { FC } from 'react';
import styled from 'styled-components';
import lineVerticalFade from '@assets/decoration/line-vertical-fade.png';
import {
  Checkbox,
  CheckboxContainer,
  PrimaryReplayButton,
} from '@uikit/components/form';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store';
import {
  replayLoginMusicAndVideo,
  selectPlayLoginAnimations,
  selectPlayLoginMusic,
  togglePlayLoginAnimations,
  togglePlayLoginMusic,
} from '@store/settings/settingsSlice';

const SplashScreenControlsContainer = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.2) 80%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

const ReplayButton = styled(PrimaryReplayButton)`
  margin-right: 1rem;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 28px;
  left: 32px;
  display: flex;
  align-items: center;
  pointer-events: all;
`;

const LineVerticalFade = styled.div`
  background-image: url(${lineVerticalFade});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 1px;
  height: 56px;
  margin-right: 1.5rem;
`;

const UniverseLogo = styled.h2`
  margin-right: 1.5rem;
  margin-bottom: 0;
  font-size: 25px;
`;

const SplashCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${CheckboxContainer}:first-of-type {
    margin-bottom: 5px;
  }
`;

interface SplashScreenControlsProps {
  hasIntroVideo?: boolean;
}

const SplashScreenControls: FC<SplashScreenControlsProps> = ({
  hasIntroVideo,
}) => {
  const playLoginAnimations = useSelector(selectPlayLoginAnimations);
  const playLoginMusic = useSelector(selectPlayLoginMusic);
  const dispatch = useAppDispatch();

  return (
    <SplashScreenControlsContainer>
      <Controls>
        <UniverseLogo>Universe</UniverseLogo>
        <LineVerticalFade />
        {hasIntroVideo && (
          <ReplayButton
            onClick={() => dispatch(replayLoginMusicAndVideo())}
            disabled={!playLoginAnimations}
          />
        )}
        <SplashCheckboxContainer>
          <Checkbox
            id="disableLoginAnimations"
            label="Disable Login Animations"
            name="disableLoginAnimations"
            value={!playLoginAnimations}
            onChange={() => {
              dispatch(togglePlayLoginAnimations());
            }}
          />
          <Checkbox
            id="disableLoginMusic"
            label="Disable Login Music"
            name="disableLoginMusic"
            value={!playLoginMusic}
            onChange={() => {
              dispatch(togglePlayLoginMusic());
            }}
          />
        </SplashCheckboxContainer>
      </Controls>
    </SplashScreenControlsContainer>
  );
};

export default SplashScreenControls;
