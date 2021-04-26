import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { CloseButton } from '@uikit/components/form';
import { animated } from 'react-spring';
import classNames from 'classnames';
import frameButtonCloseTopDown from '../assets/img/frame-button-close-top-down.png';
import pointerIntro from './assets/pointer-intro-01.png';
import pointerOutro from './assets/pointer-outro-01.png';
import { springConfigHarsh } from '@uikit/util';
import subBorderPrimaryHorizontal from '../assets/img/sub-border-primary-horizontal.png';
import subBorderPrimaryVertical from '../assets/img/sub-border-primary-vertical.png';
import { useTransition } from 'react-spring';

const caretIntroAnimation = keyframes`
  from {
    background-position: 0;
  }
  to {
    background-position: -312px;
  }
`;

const caretOutroAnimation = keyframes`
  from {
    background-position: 0;
  }
  to {
    background-position: -96px;
  }
`;

const Border = styled(animated.div)`
  border: 2px solid transparent;

  position: absolute;
  box-shadow: 0 0 0 1px rgba(1, 10, 19, 0.48);
  z-index: 1;
  transform-origin: center center;

  &::before {
    content: '';
    position: absolute;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    top: -2px;
    left: -2px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
`;
const SubBorder = styled(animated.div)`
  position: absolute;
  display: flex;
  transform-origin: center center;

  &::before {
    content: '';
    position: absolute;
  }
`;
const Caret = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  transition: top 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease,
    left 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease,
    right 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease,
    bottom 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 16px;
    background-image: url(${pointerIntro});
    background-size: initial;
    background-position: -312px;
    background-repeat: no-repeat;
  }
`;

const CloseButtonContainer = styled.div`
  &::before {
    content: '';
    position: absolute;
    width: 38px;
    height: 68px;
    top: -20px;
    right: -20px;
    background-image: url(${frameButtonCloseTopDown});
    background-size: 38px 68px;
    z-index: 1;
  }
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 28px;
  height: 28px;
  z-index: 1;

  > div {
    width: 24px;
    height: 24px;
  }
`;

const FlyoutFrameInner = styled(animated.div)`
  position: relative;
  display: flex;
  background-color: #010a13;
  -webkit-mask-image: linear-gradient(to left, #000, #000);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  padding: 2px;
`;

export const StyledFlyoutFrame = styled(animated.div)`
  position: absolute;

  &.top,
  &.bottom {
    ${Border} {
      width: 100%;
      height: 100%;
    }

    ${SubBorder} {
      left: 8px;
      width: calc(100% - 16px);
      height: 0;

      &::before {
        width: 100%;
        height: 0;
        border-image-source: url(${subBorderPrimaryHorizontal});
        border-width: 4px 4px 0 4px;
        border-image-width: 4px 4px 0 4px;
        border-image-slice: 4 4 0 4;
        border-image-repeat: stretch;
        border-style: solid;
      }
    }

    ${Caret} {
      width: 100%;
      height: 0;

      &::before {
        left: calc(50% - 12px);
        transform-origin: center center;
      }
    }
  }

  &.left,
  &.right {
    ${Border} {
      width: 100%;
      height: 100%;
    }

    ${SubBorder} {
      width: 0;
      height: calc(100% - 16px);
      top: 8px;

      &::before {
        height: 100%;
        width: 0;
        border-image-source: url(${subBorderPrimaryVertical});
        border-width: 4px 4px 4px 0;
        border-image-width: 4px 4px 4px 0;
        border-image-slice: 4 4 4 0;
        border-image-repeat: stretch;
        border-style: solid;
      }
    }

    ${Caret} {
      width: 0;
      height: 100%;

      &::before {
        top: calc(50% + 12px);
      }
    }
  }

  &.top {
    ${Border} {
      border-image: linear-gradient(
          to top,
          #614a1f 0,
          #463714 5px,
          #463714 100%
        )
        1 stretch;
    }

    ${SubBorder} {
      bottom: 0;
    }

    ${Caret} {
      bottom: 3px;
    }
  }

  &.bottom {
    ${Border} {
      border: 2px solid transparent;
      border-image: linear-gradient(
          to bottom,
          #614a1f 0,
          #463714 5px,
          #463714 100%
        )
        1 stretch;
    }

    ${SubBorder} {
      top: -4px;

      &::before {
        transform: rotate(180deg);
      }
    }

    ${Caret} {
      top: 3px;

      &::before {
        bottom: 0;
        transform: rotate(180deg);
      }
    }
  }

  &.left {
    ${Border} {
      border: 2px solid transparent;
      border-image: linear-gradient(
          to left,
          #614a1f 0,
          #463714 5px,
          #463714 100%
        )
        1 stretch;
    }

    ${SubBorder} {
      right: 0;

      &::before {
        transform: rotate(180deg);
      }
    }

    ${Caret} {
      right: 0;

      &::before {
        left: -3px;
        transform-origin: top left;
        transform: rotate(270deg);
      }
    }
  }

  &.right {
    ${Border} {
      border: 2px solid transparent;
      border-image: linear-gradient(
          to right,
          #614a1f 0,
          #463714 5px,
          #463714 100%
        )
        1 stretch;
    }

    ${SubBorder} {
      left: -4px;
    }

    ${Caret} {
      left: 0;

      &::before {
        right: -3px;
        transform-origin: top right;
        transform: rotate(90deg);
      }
    }
  }

  &.animated {
    ${Caret} {
      &::before {
        background-position: 0;
      }
    }

    &.show {
      ${Caret} {
        &::before {
          animation: ${caretIntroAnimation} 433ms steps(13, end) forwards;
        }
      }
    }

    &:not(.show) {
      ${Caret} {
        &::before {
          background-image: url(${pointerOutro});
          animation: ${caretOutroAnimation} 133ms steps(4, end) forwards;
          transition: background 0;
        }
      }
    }
  }
`;

export interface FlyoutFrameProps {
  className?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  closeButtonClick?: (e: React.MouseEvent) => void;
  showCloseButton?: boolean;
  animated?: boolean;
  show?: boolean;
}

const FlyoutFrame: FC<FlyoutFrameProps> = ({
  className,
  children,
  showCloseButton,
  closeButtonClick,
  animated,
  show,
  position = 'bottom',
}) => {
  const isTopOrBottom = position === 'top' || position === 'bottom';

  const transitionsBorder = useTransition(show, {
    config: springConfigHarsh,
    from: {
      transform: animated ? `scale${isTopOrBottom ? 'X' : 'Y'}(0.5)` : 'none',
    },
    enter: {
      transform: animated ? `scale${isTopOrBottom ? 'X' : 'Y'}(1)` : 'none',
    },
    leave: {
      transform: animated ? `scale${isTopOrBottom ? 'X' : 'Y'}(0.5)` : 'none',
    },
  });

  const transitionBase = useTransition(show, {
    config: springConfigHarsh,
    from: {
      opacity: animated ? 0 : 1,
    },
    enter: {
      opacity: animated ? 1 : 1,
    },
    leave: {
      opacity: animated ? 0 : 1,
    },
  });

  const transitionFrameInner = useTransition(show, {
    config: springConfigHarsh,
    from: {
      WebkitMaskSize: animated
        ? isTopOrBottom
          ? '50% 100%'
          : '100% 50%'
        : '100% 100%',
    },
    enter: {
      WebkitMaskSize: '100% 100%',
    },
    leave: {
      WebkitMaskSize: animated
        ? isTopOrBottom
          ? '50% 100%'
          : '100% 50%'
        : '100% 100%',
    },
  });

  return (
    <>
      {transitionBase(
        (styleBase, showBase) =>
          showBase && (
            <StyledFlyoutFrame
              style={{
                opacity: styleBase.opacity?.to({
                  range: [0, 0.25, 1],
                  output: [0, 0.75, 1],
                }),
              }}
              className={classNames(
                className,
                position,
                { animated },
                { show }
              )}
            >
              {transitionsBorder(
                (style, show) => show && <Border style={style} />
              )}
              {transitionsBorder(
                (style, show) => show && <SubBorder style={style} />
              )}
              <Caret />
              {transitionFrameInner(
                (style, show) =>
                  show && (
                    <FlyoutFrameInner style={style}>
                      {children}
                    </FlyoutFrameInner>
                  )
              )}
              {showCloseButton && !animated && (
                <CloseButtonContainer>
                  <StyledCloseButton
                    label="Close"
                    type="button"
                    onClick={closeButtonClick}
                  />
                </CloseButtonContainer>
              )}
            </StyledFlyoutFrame>
          )
      )}
    </>
  );
};

export default FlyoutFrame;
