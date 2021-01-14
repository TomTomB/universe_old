import React, { FC, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import magicButtonLeftRunes from '@assets/app/magic-button-left-runes-44x22-29f30f29f.png';
import magicButtonRightRunes from '@assets/app/magic-button-right-runes-62x22-25f30f29f.png';

interface MagicButtonEffectState {
  hover: boolean;
  active: boolean;
  intro: boolean;
}

const FrameBase = styled.div<MagicButtonEffectState>`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: 300ms all linear;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    box-shadow: 0 0 1px rgba(1, 10, 19, 0.25),
      inset 0 0 1px rgba(1, 10, 19, 0.25);
  }
`;

const backgroundIntroAnimation = keyframes`
  0% {
    box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0);
  }
  30% {
    box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0.5);
  }
  100% {
    box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0);
  }
`;

const FrameIdle = styled(FrameBase)`
  opacity: 1;
  &::before,
  &::after {
    transition: 300ms all linear;
  }
  &::before {
    opacity: 1;
    border: 2px solid #3c3c41;
  }
  &::after {
    opacity: 0;
    border: 2px solid transparent;
    border-image: linear-gradient(
        to top,
        #005a82 0%,
        #0596aa 44%,
        #0596aa 93%,
        #0ac8b9 100%
      )
      2 stretch;
  }

  ${({ intro }) =>
    intro &&
    css`
      background-color: rgba(30, 35, 40, 0.5);
      animation: ${backgroundIntroAnimation} 1000ms ease-out;
      transition: 500ms all ease-out;
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 1;
      }
    `}

  ${({ hover, active }) =>
    !hover &&
    !active &&
    css`
      opacity: 1;
      background-color: rgba(30, 35, 40, 0.5);
      &::before,
      &::after {
        transition: 300ms all linear;
      }
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 1;
      }
    `}

  ${({ hover }) =>
    hover &&
    css`
      background-color: rgba(30, 35, 40, 0.5);
      opacity: 0;
    `}

  ${({ active }) =>
    active &&
    css`
      opacity: 0;
    `}
`;
const FrameInteractive = styled(FrameBase)`
  opacity: 0;
  &::before,
  &::after {
    transition: 300ms all linear;
  }
  &::before {
    opacity: 1;
    border: 2px solid transparent;
    border-image: linear-gradient(to top, #3295c7 0%, #0ac8b9 49%, #cdfafa 100%)
      2 stretch;
  }
  &::after {
    opacity: 0;
    border: 2px solid transparent;
    border-image: linear-gradient(to top, #005a82 0%, #005a82 83%, #005a82 100%)
      2 stretch;
  }

  ${({ hover, active }) =>
    !hover &&
    !active &&
    css`
      opacity: 0;
      transition: 300ms all linear;
      &::before,
      &::after {
        opacity: 0;
      }
    `}

  ${({ hover }) =>
    hover &&
    css`
      background-color: rgba(30, 35, 40, 0.5);
      opacity: 1;
      &::before,
      &::after {
        box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0.5);
      }
      &::before {
        opacity: 1;
      }
      &::after {
        opacity: 0;
      }
    `}

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0.5);
      &::before,
      &::after {
        box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0);
      }
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 1;
      }
    `}
`;

const RuneBase = styled.div<MagicButtonEffectState>`
  position: absolute;
  pointer-events: inherit;
  background-repeat: no-repeat;

  ${({ intro, hover }) =>
    (intro || hover) &&
    css`
      background-position-x: 0;
    `}
`;

const runeMagicLeftSpriteSheetAnimation = keyframes`
  0% {
    background-position-y: 22px;
  }

  100% {
    background-position-y: -660px;
  }
`;

const runeMagicRightSpriteSheetAnimation = keyframes`
  0% {
    background-position-y: 24px;
  }

  100% {
    background-position-y: -720px;
  }
`;

const LeftRuneMagic = styled(RuneBase)`
  width: 44px;
  height: 22px;
  left: 0;
  bottom: 0;
  background-image: url(${magicButtonLeftRunes});
  background-position: 100px 100px;

  ${({ intro, hover }) =>
    (intro || hover) &&
    css`
      animation: ${runeMagicLeftSpriteSheetAnimation} 500ms forwards steps(31);
    `}

  ${({ hover }) =>
    hover &&
    css`
      background-position-x: -44px;
    `}

  ${({ active }) =>
    active &&
    css`
      background-position-x: -88px;
    `}
`;
const RightRuneMagic = styled(RuneBase)`
  width: 62px;
  height: 22px;
  right: 0;
  top: 0;
  background-image: url(${magicButtonRightRunes});
  background-position: 100px 100px;

  ${({ intro, hover }) =>
    (intro || hover) &&
    css`
      animation: ${runeMagicRightSpriteSheetAnimation} 500ms forwards steps(31);
    `}

  ${({ hover }) =>
    hover &&
    css`
      background-position-x: -62px;
    `}

  ${({ active }) =>
    active &&
    css`
      background-position-x: -124px;
    `}
`;

const radialEffectAnimation = keyframes`
   0% {
    top: -120px;
  }
  100% {
    top: 100%;
  }
`;

const RadialContainer = styled.div<MagicButtonEffectState>`
  display: block;
  width: 0;
  height: 0;
  pointer-events: none;
`;
const RadialEffect = styled.div<MagicButtonEffectState>`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 3px;
  box-sizing: border-box;
  overflow: hidden;
  mask-image: linear-gradient(to right, #000, #000);

  ${({ hover }) =>
    hover &&
    css`
      display: block;
    `}

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 120px;
    top: -120px;
    opacity: 0.1;
    background-image: radial-gradient(
      ellipse closest-side,
      #a2ffff 40%,
      #6cfcff 60%,
      transparent 90%
    );
    background-position: center;

    ${({ hover }) =>
      hover &&
      css`
        animation: ${radialEffectAnimation} 700ms forwards ease-out;
      `}
  }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  min-width: inherit;
  width: inherit;
`;

const MagicButton = styled.button`
  height: 32px;
  cursor: pointer;
  appearance: none;
  border: 0;
  background: none;
  padding: 0;
  outline: 0;
`;

const Content = styled.div<MagicButtonEffectState>`
  font-family: LoL Display;
  font-kerning: normal;
  font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
  color: ${(props) => props.theme.colors.grey[3]};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.0325em;
  text-transform: uppercase;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0 1.3em;
  text-align: center;
  box-sizing: border-box;
  border: 2px solid transparent;
  overflow: hidden;
  transition: 300ms all linear;

  ${({ hover, active }) =>
    !hover &&
    !active &&
    css`
      color: #a3c7c7;
    `}

  ${({ hover }) =>
    hover &&
    css`
      color: #cdfafa;
    `}

  ${({ active }) =>
    active &&
    css`
      color: #005a82;
    `}
`;

interface InputProps {
  children: string;
  disabled?: boolean;
  className?: string;
}

const PrimaryMagicButton: FC<InputProps> = ({
  children,
  disabled,
  className,
}) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    if (!disabled) {
      setIntro(true);
    }

    setTimeout(() => {
      setIntro(false);
    }, 300);
  }, [disabled]);

  return (
    <MagicButton
      className={className}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      <Container>
        <FrameIdle hover={hover} active={active} intro={intro} />
        <FrameInteractive hover={hover} active={active} intro={intro} />
        <LeftRuneMagic hover={hover} active={active} intro={intro} />
        <RightRuneMagic hover={hover} active={active} intro={intro} />
        <RadialContainer hover={hover} active={active} intro={intro}>
          <RadialEffect hover={hover} active={active} intro={intro} />
        </RadialContainer>
        <Content hover={hover} active={active} intro={intro}>
          {children}
        </Content>
      </Container>
    </MagicButton>
  );
};

export default PrimaryMagicButton;
