import React, { FC, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ComponentTypes } from '@typings';
import classNames from 'classnames';
import externalLinkMask from './assets/external-link-mask.png';
import sheen from './assets/sheen.png';

const hoverTextShadowAnimation = keyframes`
	0% {
    text-shadow: 0 0 4px rgba(240, 230, 216, 1);
	}
	50% {
    text-shadow: 0 0 4px rgba(240, 230, 216, .5);
	}
	100% {
    text-shadow: 0 0 4px rgba(240, 230, 216, 0);
	}
`;

const hoverGlowAnimation = keyframes`
  0% {
    box-shadow: 0px 0px 5px 4px rgba(240, 230, 216, .5), 0px 0px 2px 1px rgba(240, 230, 216, .5) inset;
  }
  50% {
    box-shadow: 0px 0px 5px 4px rgba(240, 230, 216, .3), 0px 0px 2px 1px rgba(240, 230, 216, .3) inset;
  }
  100% {
    box-shadow: 0px 0px 5px 4px rgba(240, 230, 216, 0), 0px 0px 2px 1px rgba(240, 230, 216, 0) inset;
  }
`;

const clickFlareAnimation = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: .6;
  }
  50% {
    opacity: .3;
  }
  100% {
    opacity: 0;
  }
`;

const clickScaleAnimation = keyframes`
  from {
    transform: scale(.94);
  }

  to {
		transform: scale(1.0);
  }
`;

const clickSheenAnimation = keyframes`
  from {
    transform: translateY(-100%) rotate(0deg);
  }
  10% {
    transform: translateY(-80%) rotate(-5deg);
  }
  to {
    transform: translateY(100%) rotate(0deg);
  }
`;

const ContentWrapper = styled.div`
  position: relative;

  &::after {
    display: none;
    width: 9px;
    height: 9px;
    content: '';
    vertical-align: middle;
    -webkit-mask: url(${externalLinkMask}) no-repeat;
    -webkit-mask-size: contain;
    background: #cdbe91;
    margin-left: 5px;
    margin-top: -5px;
  }
`;

const Flare = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -25px;
    left: -25px;
    width: 48px;
    height: 48px;
    opacity: 0;
    background: transparent url(${sheen}) top center no-repeat;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -25px;
    right: -25px;
    width: 48px;
    height: 48px;
    opacity: 0;
    background: transparent url(${sheen}) top center no-repeat;
  }
`;

const Glow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-filter: blur(4px);
  animation: var(--flat-button-glow-animation);
`;

const SheenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Sheen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 150%;
  transform: translateY(-100%);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.15) 92%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-filter: blur(2px);
`;

const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 400ms cubic-bezier(0, 0, 0.33, 1);
  opacity: var(--flat-button-bg-opacity);
  background-image: linear-gradient(
    to bottom,
    #1e232a 0%,
    #1e232a 40%,
    rgba(118, 97, 51, 0.8) 140%
  );
`;

const BorderIdle = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  opacity: 1;
  border: 2px solid transparent;
  border-image: linear-gradient(
    to top,
    #785b28 0%,
    #c89c3c 55%,
    #c8a355 71%,
    #c8aa6e 100%
  );
  border-image-slice: 1;
  transition: opacity 300ms linear;
`;

const BorderTransition = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  opacity: var(--flat-button-border-transition-opacity);
  border: 2px solid transparent;
`;

interface StyledPrimaryFlatButtonProps {
  external?: boolean;
  variant?: PrimaryFlatButtonVariant;
}

export const StyledPrimaryFlatButton = styled.button<StyledPrimaryFlatButtonProps>`
  all: unset;

  font-family: LoL Display;
  text-transform: uppercase;

  --flat-button-height: 100%;
  --flat-button-min-height: 32px;
  --flat-button-border-transition-opacity: 0;
  --flat-button-glow-animation: initial;
  --flat-button-bg-opacity: 0;
  --flat-button-inner-height: 100%;

  color: #cdbe91;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  white-space: nowrap;
  padding: 5px 1.3em;
  height: var(--flat-button-height);
  min-height: var(--flat-button-min-height);
  cursor: pointer;
  box-shadow: 0 0 1px 1px #010a13, inset 0 0 1px 1px #010a13;
  background: #1e2328;
  border: 2px solid transparent;

  * {
    pointer-events: none;
  }

  &:hover,
  &:focus-visible {
    color: #f0e6d2;
    animation: 600ms cubic-bezier(0, 0, 0.33, 1) 1 ${hoverTextShadowAnimation};

    ${BorderTransition} {
      opacity: 1;
      border-image: linear-gradient(
        to top,
        #c89c3c 0%,
        #dcc188 50%,
        #e1c998 71%,
        #f0e6d8 100%
      );
      border-image-slice: 1;
    }

    ${Glow} {
      animation: 600ms cubic-bezier(0, 0, 0.33, 1) 1 ${hoverGlowAnimation};
    }

    ${Bg} {
      opacity: 1;
    }

    ${ContentWrapper} {
      ::after {
        background: #f0e6d2;
      }
    }
  }

  &:active {
    color: #5c5b57;
    transition: color 100ms linear;
    animation: none;

    ${Bg} {
      opacity: 0;
    }

    ${BorderTransition} {
      opacity: 1;
      border-image: linear-gradient(to bottom, #463817 0%, #694f27 100%);
      border-image-slice: 1;
    }

    ${ContentWrapper} {
      ::after {
        background: #5c5b57;
      }
    }
  }

  ${({ external }) =>
    external &&
    css`
      ${ContentWrapper} {
        ::after {
          display: inline-block;
        }
      }
    `}

  ${({ variant }) =>
    variant === 'primary' &&
    css`
      background: linear-gradient(to bottom, #5a401f 0%, #332717 100%);

      ${Bg} {
        background: linear-gradient(to bottom, #604522 0%, #846745 100%);
      }

      ${ContentWrapper} {
        ::after {
          background: #cdbe91;
        }
      }

      &:active {
        color: #785a28;
        background: linear-gradient(to bottom, #362715 0%, #17130e 100%);

        ${ContentWrapper} {
          ::after {
            background: #785a28;
          }
        }
      }
    `}

    ${({ variant }) =>
    variant === 'purchase' &&
    css`
      && {
        background: linear-gradient(
            to bottom,
            rgba(255, 44, 170, 0.3) 0%,
            rgba(255, 44, 170, 0) 100%
          ),
          #1e2328;
        color: #fde9f8;

        ${Bg} {
          background: linear-gradient(
              to bottom,
              rgba(255, 44, 170, 0.3) 0%,
              rgba(255, 44, 170, 0) 100%
            ),
            #1e2328;
        }

        ${BorderIdle} {
          border-image: linear-gradient(
            to bottom,
            rgba(245, 155, 247, 0.8) 0%,
            rgba(232, 216, 227, 0.8) 0.01%,
            rgba(237, 153, 239, 0.8) 100%
          );
          border-image-slice: 1;
        }

        ${ContentWrapper} {
          ::after {
            background: #cdbe91;
          }
        }

        &:hover {
          color: #fde9f8;
          background: linear-gradient(
              to bottom,
              rgba(255, 44, 170, 0.5) 0%,
              rgba(255, 44, 170, 0) 100%
            ),
            #1e2328;

          ${Bg} {
            background: linear-gradient(
                to bottom,
                rgba(255, 44, 170, 0.5) 0%,
                rgba(255, 44, 170, 0) 100%
              ),
              #1e2328;
          }

          ${BorderTransition} {
            border-image: linear-gradient(
              to bottom,
              #f59bf7 0%,
              #e8d8e3 0.01%,
              #ed99ef 100%
            );
            border-image-slice: 1;
          }

          ${ContentWrapper} {
            ::after {
              background: #fde9f8;
            }
          }
        }
      }

      &:active {
        color: #fde9f8;
        background: linear-gradient(
            to bottom,
            rgba(255, 44, 170, 0.2) 0%,
            rgba(255, 44, 170, 0) 100%
          ),
          #1e2328;

        ${Bg} {
          background: linear-gradient(
              to bottom,
              rgba(255, 44, 170, 0.2) 0%,
              rgba(255, 44, 170, 0) 100%
            ),
            #1e2328;
        }

        ${BorderTransition} {
          border-image: linear-gradient(
            to bottom,
            rgba(245, 155, 247, 0.4) 0%,
            rgba(232, 216, 227, 0.4) 0.01%,
            rgba(237, 153, 239, 0.4) 100%
          );
          border-image-slice: 1;
        }

        ${BorderIdle} {
          border-image: linear-gradient(
            to bottom,
            rgba(245, 155, 247, 0.4) 0%,
            rgba(232, 216, 227, 0.4) 0.01%,
            rgba(237, 153, 239, 0.4) 100%
          );
          border-image-slice: 1;
        }

        ${ContentWrapper} {
          ::after {
            background: #fde9f8;
          }
        }
      }

      &:disabled {
        color: #fde9f8;
        animation: none;
      }
    `}

    ${({ variant }) =>
    variant !== 'purchase' &&
    css`
      &&.click {
        border-image: linear-gradient(
          to top,
          #fff 0%,
          #fff 33%,
          #fff 66%,
          #fff 100%
        );

        ${BorderTransition} {
          border-image: linear-gradient(
            to top,
            #c89c3c 0%,
            #dcc188 50%,
            #e1c998 71%,
            #f0e6d8 100%
          );
        }
      }
    `}

  &&.click {
    color: #e4e1d8;
    border-image-slice: 1;
    animation: 130ms linear ${clickScaleAnimation} 1,
      400ms linear 1 ${hoverTextShadowAnimation};

    ${BorderTransition} {
      border-image-slice: 1;
      transition: opacity 400ms linear;
      opacity: 1;
    }

    ${Glow} {
      animation: 600ms cubic-bezier(0, 0, 0.33, 1) ${hoverGlowAnimation} 1;
    }

    ${Sheen} {
      animation: 330ms ${clickSheenAnimation} 1 linear;
    }

    ${Bg} {
      opacity: 1;
    }

    ${Flare} {
      ::before {
        animation: 400ms cubic-bezier(0, 0, 0.33, 1) 0ms 1
          ${clickFlareAnimation};
      }

      ::after {
        animation: 400ms cubic-bezier(0, 0, 0.33, 1) 30ms 1
          ${clickFlareAnimation};
      }
    }

    ${ContentWrapper} {
      ::after {
        background: #e4e1d8;
      }
    }
  }

  &:disabled {
    pointer-events: none;
    color: #5c5b57;
    animation: none;
    cursor: default;
    color: #5c5b57;
    background: #1e2328;
    border: 2px solid #5c5b57;
    border-image: initial;
    transition: all 300ms linear;

    ${Bg}, ${Glow}, ${SheenWrapper}, ${Flare} {
      display: none;
    }

    ${BorderTransition} {
      transition: opacity 300ms linear;
      opacity: 0;
    }

    ${BorderIdle} {
      opacity: 0;
    }

    ${ContentWrapper} {
      ::after {
        background: #5c5b57;
      }
    }
  }
`;

export type PrimaryFlatButtonVariant = 'primary' | 'purchase';

export interface PrimaryFlatButtonProps extends ComponentTypes.ButtonProps {
  variant?: PrimaryFlatButtonVariant;
  external?: boolean;
}

const PrimaryFlatButton: FC<PrimaryFlatButtonProps> = ({
  type,
  children,
  className,
  disabled,
  onClick,
  variant,
  external,
}) => {
  const [showClickAnim, setShowClickAnim] = useState(false);

  useEffect(() => {
    if (!showClickAnim) {
      return;
    }

    const t = window.setTimeout(() => {
      setShowClickAnim(false);
    }, 400);

    return () => {
      window.clearTimeout(t);
    };
  }, [showClickAnim]);

  return (
    <StyledPrimaryFlatButton
      disabled={disabled}
      type={type}
      className={classNames(className, { click: showClickAnim })}
      variant={variant}
      external={external}
      onClick={e => {
        setShowClickAnim(true);
        onClick?.(e);
      }}
    >
      <Flare />
      <Glow />
      <Bg />
      <BorderIdle />
      <BorderTransition />
      <SheenWrapper>
        <Sheen />
      </SheenWrapper>
      <ContentWrapper> {children} </ContentWrapper>
    </StyledPrimaryFlatButton>
  );
};

export default PrimaryFlatButton;
