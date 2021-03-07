import { useClickOutside } from '@uikit/hooks';
import { springConfigHarsh } from '@uikit/util';
import classNames from 'classnames';
import React, { FC, PropsWithChildren, useRef } from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';

import subBorderPrimaryHorizontal from '../assets/img/sub-border-primary-horizontal.png';
import subBorderPrimaryVertical from '../assets/img/sub-border-primary-vertical.png';
import subBorderSecondaryHorizontal from '../assets/img/sub-border-secondary-horizontal.png';
import subBorderSecondaryVertical from '../assets/img/sub-border-secondary-vertical.png';
import subBorderPrimaryHorizontalDisabled from '../assets/img/sub-border-primary-horizontal-disabled.png';
import subBorderPrimaryVerticalDisabled from '../assets/img/sub-border-primary-vertical-disabled.png';
import subBorderSecondaryHorizontalDisabled from '../assets/img/sub-border-secondary-horizontal-disabled.png';
import subBorderSecondaryVerticalDisabled from '../assets/img/sub-border-secondary-vertical-disabled.png';

const ModalContainer = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const StyledModalSubBorder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  ::before,
  ::after {
    content: '';
    position: absolute;
    display: flex;
    border-image-repeat: stretch;
    border-style: solid;
  }
`;

const StyledModal = styled(animated.div)`
  --frameColors: #614a1f 0, #463714 5px, #463714 100%;

  border: 2px solid transparent;
  position: relative;
  background: #010a13;
  box-shadow: 0 0 0 1px rgba(1, 10, 19, 0.48);
  max-width: 800px;

  &.withButtons {
    padding-bottom: 35px;
  }

  &.top,
  &.bottom {
    ${StyledModalSubBorder} {
      ::before,
      ::after {
        left: 12px;
        width: calc(100% - 24px);
        height: 0;
        border-width: 4px 4px 0 4px;
        border-image-width: 4px 4px 0 4px;
        border-image-slice: 4 4 0 4;
      }

      ::before {
        top: -6px;
        border-image-source: url(${subBorderSecondaryHorizontal});
      }

      ::after {
        bottom: -6px;
        border-image-source: url(${subBorderPrimaryHorizontal});
      }
    }
  }

  &.left,
  &.right {
    ${StyledModalSubBorder} {
      ::before,
      ::after {
        top: 12px;
        height: calc(100% - 24px);
        width: 0;
        border-width: 4px 4px 4px 0;
        border-image-width: 4px 4px 4px 0;
        border-image-slice: 4 4 4 0;
      }

      ::before {
        left: -6px;
        border-image-source: url(${subBorderPrimaryVertical});
      }

      ::after {
        right: -6px;
        border-image-source: url(${subBorderSecondaryVertical});
      }
    }
  }

  &.left {
    border-image: linear-gradient(to right, var(--frameColors) 100%) 1 stretch;
  }

  &.right {
    border-image: linear-gradient(to left, var(--frameColors) 100%) 1 stretch;

    ${StyledModalSubBorder} {
      ::before,
      ::after {
        transform: rotate(180deg);
      }

      ::before {
        border-image-source: url(${subBorderSecondaryVertical});
      }

      ::after {
        border-image-source: url(${subBorderPrimaryVertical});
      }
    }
  }

  &.top {
    border-image: linear-gradient(to bottom, var(--frameColors) 100%) 1 stretch;

    ${StyledModalSubBorder} {
      ::before,
      ::after {
        transform: rotate(180deg);
      }

      ::before {
        border-image-source: url(${subBorderPrimaryHorizontal});
      }

      ::after {
        border-image-source: url(${subBorderSecondaryHorizontal});
      }
    }
  }

  &.bottom {
    border-image: linear-gradient(to top, var(--frameColors) 100%) 1 stretch;
  }

  &.disabled {
    --frameColors: #39393e 0, #1e282d 5px, #1e282d 100%;

    &.top {
      ${StyledModalSubBorder} {
        ::before {
          border-image-source: url(${subBorderPrimaryHorizontalDisabled});
        }

        ::after {
          border-image-source: url(${subBorderSecondaryHorizontalDisabled});
        }
      }
    }

    &.bottom {
      ${StyledModalSubBorder} {
        ::before {
          border-image-source: url(${subBorderSecondaryHorizontalDisabled});
        }

        ::after {
          border-image-source: url(${subBorderPrimaryHorizontalDisabled});
        }
      }
    }

    &.right {
      ${StyledModalSubBorder} {
        ::before {
          border-image-source: url(${subBorderSecondaryVerticalDisabled});
        }

        ::after {
          border-image-source: url(${subBorderPrimaryVerticalDisabled});
        }
      }
    }

    &.left {
      ${StyledModalSubBorder} {
        ::before {
          border-image-source: url(${subBorderPrimaryVerticalDisabled});
        }

        ::after {
          border-image-source: url(${subBorderSecondaryVerticalDisabled});
        }
      }
    }
  }

  ::before {
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

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -2px;
  width: 100%;
  button:first-of-type {
    margin-right: 4px;
    z-index: 1;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: -5px;
      width: 70px;
      height: 17px;
      /* background-color: #010a13; */
      bottom: 0px;
      border-left: 2px solid #60491e;
      z-index: -1;
      border-radius: 2px 0px 0px 0px;
    }
  }
  button:last-of-type {
    z-index: 1;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      right: -5px;
      width: 70px;
      height: 17px;
      /* background-color: #010a13; */
      bottom: 0px;
      border-right: 2px solid #60491e;
      z-index: -1;
      border-radius: 0px 2px 0px 0px;
    }
  }

  .top & button {
    ::before,
    ::after {
      border-color: #463714;
    }
  }

  .bottom & button {
    ::before,
    ::after {
      border-color: #614a1f;
    }
  }

  .disabled.top & button {
    ::before,
    ::after {
      border-color: #1e282d;
    }
  }

  .disabled.bottom & button {
    ::before,
    ::after {
      border-color: #39393e;
    }
  }
`;

export enum ModalTopRightCloseButtonVariant {
  MINIMAL,
  CIRCLE,
}

export interface ModalProps {
  topRightCloseButton?: {
    variant: ModalTopRightCloseButtonVariant;
    click: (e: React.MouseEvent) => void;
  };
  bottomButtons: {
    buttonText: string;
    click: (e: React.MouseEvent) => void;
  }[];
  show: boolean;
  className?: string;
  backdropClick?: () => void;
  position?: 'top' | 'right' | 'bottom' | 'left';
  disabled?: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  bottomButtons,
  show,
  className,
  backdropClick,
  position = 'bottom',
  disabled,
}) => {
  const transitionsModal = useTransition(show, null, {
    config: springConfigHarsh,
    from: { opacity: 0, transform: 'scaleX(0.6) scaleY(1) translateY(100px)' },
    enter: { opacity: 1, transform: 'scaleX(1) scaleY(1) translateY(0)' },
    leave: { opacity: 0, transform: 'scaleX(1.2) scaleY(1.2) translateY(0)' },
  });

  const transitionsBackdrop = useTransition(show, null, {
    config: springConfigHarsh,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    modalRef,
    () => {
      if (show) {
        backdropClick?.();
      }
    },
    true
  );

  return (
    <>
      {transitionsBackdrop.map(
        tb =>
          tb.item && (
            <ModalContainer key={tb.key} style={tb.props}>
              {transitionsModal.map(
                ({ item, key, props }) =>
                  item && (
                    <StyledModal
                      style={props}
                      key={key}
                      className={classNames(
                        className,
                        position,
                        { disabled },
                        { withButtons: bottomButtons.length }
                      )}
                      ref={modalRef}
                    >
                      <StyledModalSubBorder />
                      {children}
                      <ModalButtons>
                        {bottomButtons.map(b => (
                          <button key={b.buttonText} onClick={b.click}>
                            {b.buttonText}
                          </button>
                        ))}
                      </ModalButtons>
                    </StyledModal>
                  )
              )}
            </ModalContainer>
          )
      )}
    </>
  );
};

export default Modal;
