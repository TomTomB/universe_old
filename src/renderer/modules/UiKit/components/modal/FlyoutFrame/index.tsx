import { CloseButton } from '@uikit/components/form';
import classNames from 'classnames';
import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

import frameButtonCloseTopDown from '../assets/img/frame-button-close-top-down.png';
import pointerIntro from './assets/pointer-intro-01.png';
import pointerOutro from './assets/pointer-outro-01.png';
import subBorderPrimaryHorizontal from '../assets/img/sub-border-primary-horizontal.png';
import subBorderPrimaryVertical from '../assets/img/sub-border-primary-vertical.png';

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

const Border = styled.div`
  border: 2px solid transparent;

  position: absolute;
  box-shadow: 0 0 0 1px rgba(1, 10, 19, 0.48);
  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);
  z-index: 1;

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
const SubBorder = styled.div`
  position: absolute;
  display: flex;
  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);

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
  }
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 28px;
  height: 28px;

  > div {
    width: 24px;
    height: 24px;
  }
`;

const FlyoutFrameInner = styled.div`
  position: relative;
  display: flex;
  background-color: #010a13;

  -webkit-mask-image: linear-gradient(to left, #000, #000);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  padding: 2px;
  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99),
    300ms opacity linear;
`;

export const StyledFlyoutFrame = styled.div`
  position: absolute;
  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);

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
        width: calc(100% - 8px);
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

    ${FlyoutFrameInner} {
      -webkit-mask-size: 100%;
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
        height: calc(100% - 8px);
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

    ${FlyoutFrameInner} {
      -webkit-mask-size: 100%;
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
      top: 0;
      transform: rotate(180deg);
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
      right: -4px;
      transform: rotate(180deg);
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

    &.top,
    &.bottom {
      ${Border} {
        width: 50%;
        left: 25%;
      }

      ${SubBorder} {
        width: 30%;
        left: calc(33% + 8px);
      }

      ${FlyoutFrameInner} {
        -webkit-mask-size: 50% 100%;
      }
    }

    &.left,
    &.right {
      ${Border} {
        height: 50%;
        top: 25%;
      }

      ${SubBorder} {
        height: 30%;
        top: calc(33% + 8px);
      }

      ${FlyoutFrameInner} {
        opacity: 0;
        -webkit-mask-size: 100% 50%;
      }
    }

    &.idle {
      ${Border} {
        width: 100%;
        height: 100%;
      }

      ${Caret} {
        &::before {
          animation: ${caretIntroAnimation} 433ms steps(13, end) forwards;
        }
      }

      ${FlyoutFrameInner} {
        opacity: 1;
        -webkit-mask-size: 100% 100%;
      }

      &.top,
      &.bottom {
        /* top: 0; */

        ${Border} {
          left: 0;
        }

        ${SubBorder} {
          width: calc(100% - 16px);
          left: 8px;
        }
      }

      &.left,
      &.right {
        /* left: 0; */

        ${Border} {
          top: 0;
        }

        ${SubBorder} {
          height: calc(100% - 16px);
          top: 8px;
        }
      }
    }

    &.closing {
      ${Border}, ${SubBorder},  ${FlyoutFrameInner} {
        transition: 133ms all cubic-bezier(1, 0, 1, 1);
      }

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
  animation?: 'idle' | 'closing';
}

// TODO (TRB): Use spring animation
const FlyoutFrame: FC<FlyoutFrameProps> = ({
  className,
  children,
  showCloseButton,
  closeButtonClick,
  animated,
  animation,
  position = 'bottom',
}) => {
  return (
    <StyledFlyoutFrame
      className={classNames(className, position, { animated }, animation)}
    >
      <Border />
      <SubBorder />
      <Caret />
      <FlyoutFrameInner>{children}</FlyoutFrameInner>
      {showCloseButton && (
        <CloseButtonContainer>
          <StyledCloseButton
            label="Close"
            type="button"
            onClick={closeButtonClick}
          />
        </CloseButtonContainer>
      )}
    </StyledFlyoutFrame>
  );
};

export default FlyoutFrame;
