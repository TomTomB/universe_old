import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import magicButtonLeftRunes from '@assets/magic-button-left-runes-44x22-29f30f29f.png';
import magicButtonRightRunes from '@assets/magic-button-right-runes-62x22-25f30f29f.png';
import classNames from 'classnames';
import AnimatedBorderOverlay from '@uikit/components/decoration/AnimatedBorderOverlay';

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

const radialEffectAnimation = keyframes`
   0% {
    top: -120px;
  }
  100% {
    top: 100%;
  }
`;

const StyledAnimatedBorderOverlay = styled(AnimatedBorderOverlay)`
  display: block;
  position: absolute;
  opacity: 0.01;
  transition: 300ms opacity linear;
  pointer-events: none;
`;

const FrameBase = styled.div`
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
        ${(props) => props.theme.colors.blue[4]} 0%,
        ${(props) => props.theme.colors.blue[3]} 44%,
        ${(props) => props.theme.colors.blue[3]} 93%,
        ${(props) => props.theme.colors.blue[2]} 100%
      )
      2 stretch;
  }
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
    border-image: linear-gradient(
        to top,
        #3295c7 0%,
        ${(props) => props.theme.colors.blue[2]} 49%,
        ${(props) => props.theme.colors.blue[1]} 100%
      )
      2 stretch;
  }
  &::after {
    opacity: 0;
    border: 2px solid transparent;
    border-image: linear-gradient(
        to top,
        ${(props) => props.theme.colors.blue[4]} 0%,
        ${(props) => props.theme.colors.blue[4]} 83%,
        ${(props) => props.theme.colors.blue[4]} 100%
      )
      2 stretch;
  }
`;

const RuneBase = styled.div`
  position: absolute;
  pointer-events: inherit;
  background-repeat: no-repeat;
`;

const LeftRuneMagic = styled(RuneBase)`
  width: 44px;
  height: 22px;
  left: 0;
  bottom: 0;
  background-image: url(${magicButtonLeftRunes});
  background-position: 100px 100px;
`;

const RightRuneMagic = styled(RuneBase)`
  width: 62px;
  height: 22px;
  right: 0;
  top: 0;
  background-image: url(${magicButtonRightRunes});
  background-position: 100px 100px;
`;

const RadialContainer = styled.div`
  display: block;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const RadialEffect = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 3px;
  box-sizing: border-box;
  overflow: hidden;
  mask-image: linear-gradient(to right, #000, #000);

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
  }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  min-width: inherit;
  width: inherit;
`;

const Content = styled.div`
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
`;

const MagicButton = styled.button`
  height: 32px;
  appearance: none;
  border: 0;
  background: none;
  padding: 0;
  outline: 0;

  &:not([disabled]) {
    cursor: pointer;

    &.intro {
      ${FrameIdle} {
        background-color: rgba(30, 35, 40, 0.5);
        animation: ${backgroundIntroAnimation} 1000ms ease-out;
        transition: 500ms all ease-out;
        &::before {
          opacity: 0;
        }
        &::after {
          opacity: 1;
        }
      }
      ${StyledAnimatedBorderOverlay} {
        opacity: 0.75;
      }
    }

    &.intro,
    &:hover,
    &:focus-visible {
      ${RuneBase} {
        background-position-x: 0;
      }
      ${RightRuneMagic} {
        animation: ${runeMagicRightSpriteSheetAnimation} 500ms forwards
          steps(31);
      }
      ${LeftRuneMagic} {
        animation: ${runeMagicLeftSpriteSheetAnimation} 500ms forwards steps(31);
      }
    }

    &:not(:hover):not(:active):not(:focus-visible) {
      ${Content} {
        color: ${(props) => props.theme.colors.grey.blue};
      }
      ${FrameInteractive} {
        opacity: 0;
        transition: 300ms all linear;
        &::before,
        &::after {
          opacity: 0;
        }
      }
      ${FrameIdle} {
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
      }
    }

    &:hover,
    &:focus-visible {
      ${Content} {
        color: ${(props) => props.theme.colors.blue[1]};
      }
      ${RadialEffect} {
        display: block;
        &::after {
          animation: ${radialEffectAnimation} 700ms forwards ease-out;
        }
      }
      ${RightRuneMagic} {
        background-position-x: -62px;
      }
      ${LeftRuneMagic} {
        background-position-x: -44px;
      }
      ${FrameInteractive} {
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
      }
      ${FrameIdle} {
        background-color: rgba(30, 35, 40, 0.5);
        opacity: 0;
      }
      ${StyledAnimatedBorderOverlay} {
        opacity: 1;
      }
    }

    &:active {
      ${Content} {
        color: ${(props) => props.theme.colors.blue[4]};
      }
      ${RightRuneMagic} {
        background-position-x: -124px;
      }
      ${LeftRuneMagic} {
        background-position-x: -88px;
      }
      ${FrameInteractive} {
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
      }
      ${FrameIdle} {
        opacity: 0;
      }
      ${StyledAnimatedBorderOverlay} {
        opacity: 0.5;
      }
    }
  }

  &[disabled] {
    ${Content} {
      color: ${(props) => props.theme.colors.grey.disabled};
      font-size: 14px;
      box-shadow: 0 0 1px 1px ${(props) => props.theme.colors.black},
        inset 0 0 1px 1px ${(props) => props.theme.colors.black};
      background-color: ${(props) => props.theme.colors.grey.frame};
      border: 2px solid ${(props) => props.theme.colors.grey.disabled};
    }
  }
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
  const [intro, setIntro] = useState(false);

  const introTimeout = useRef(0);

  useEffect(() => {
    if (!disabled) {
      clearTimeout(introTimeout.current);
      setIntro(true);
    } else {
      setIntro(false);
      return;
    }

    introTimeout.current = window.setTimeout(() => {
      setIntro(false);
    }, 400);
  }, [disabled]);

  return (
    <MagicButton
      className={classNames(className, { intro })}
      disabled={disabled}
    >
      <Container>
        <FrameIdle />
        <FrameInteractive />
        <LeftRuneMagic />
        <RightRuneMagic />
        <RadialContainer>
          <RadialEffect />
        </RadialContainer>
        <Content>{children}</Content>
        <StyledAnimatedBorderOverlay speed={7500} />
      </Container>
    </MagicButton>
  );
};

export default PrimaryMagicButton;
