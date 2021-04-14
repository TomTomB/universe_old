import { CloseButton, PrimaryFlatButton } from '@uikit/components/form';
import React, { FC, PropsWithChildren, useRef } from 'react';
import { animated, useTransition } from 'react-spring';
import styled, { css } from 'styled-components';
import { ButtonGroup } from '@uikit/components/base';
import caret from './assets/caret.png';
import classNames from 'classnames';
import closeIcon from './assets/close.png';
import frameButtonCloseTopDown from '../assets/img/frame-button-close-top-down.png';
import { springConfigHarsh } from '@uikit/util';
import subBorderPrimaryHorizontal from '../assets/img/sub-border-primary-horizontal.png';
import subBorderPrimaryHorizontalDisabled from '../assets/img/sub-border-primary-horizontal-disabled.png';
import subBorderPrimaryVertical from '../assets/img/sub-border-primary-vertical.png';
import subBorderPrimaryVerticalDisabled from '../assets/img/sub-border-primary-vertical-disabled.png';
import subBorderSecondaryHorizontal from '../assets/img/sub-border-secondary-horizontal.png';
import subBorderSecondaryHorizontalDisabled from '../assets/img/sub-border-secondary-horizontal-disabled.png';
import subBorderSecondaryVertical from '../assets/img/sub-border-secondary-vertical.png';
import subBorderSecondaryVerticalDisabled from '../assets/img/sub-border-secondary-vertical-disabled.png';
import { useClickOutside } from '@uikit/hooks';

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

const ToastCloseButton = styled.button<{ withBackground?: boolean }>`
  display: block;
  height: 24px;
  width: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
  background: url(${closeIcon}), rgba(0, 0, 0, 0.5);
  cursor: pointer;
  border-radius: 4px;
  background-size: 75% 75%, 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  border: 0;
  appearance: none;
  padding: 0;

  &:hover {
    background: url(${closeIcon}), rgba(10, 20, 40, 0.5);
    background-size: 75% 75%, 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  ${({ withBackground }) =>
    withBackground &&
    css`
      background-color: #0a1428;
      background-size: 18px 18px;
      background-position: center;
      border-radius: 2px;
      opacity: 0.8;
      transition: opacity 0.05s ease-in-out;

      &:hover {
        opacity: 1;
      }
    `}
`;

const ModalTopCloseContainer = styled.div`
  &::before {
    content: '';
    position: absolute;
    width: 38px;
    height: 68px;
    top: -22px;
    right: -22px;
    background-image: url(${frameButtonCloseTopDown});
    background-size: 38px 68px;
  }
`;
const ModalTopCloseButton = styled(CloseButton)`
  position: absolute;
  top: -17px;
  right: -17px;
  width: 28px;
  height: 28px;

  > div {
    width: 24px;
    height: 24px;
  }
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

  &.borderless ${StyledModalSubBorder} {
    display: none;
  }

  &.caret {
    &::after {
      content: '';
      position: absolute;
      background: url(${caret}) 50% no-repeat;
    }

    &.top::after {
      height: 18px;
      width: 100%;
      top: -16px;
      transform: rotate(180deg);
    }

    &.bottom::after {
      height: 18px;
      width: 100%;
      bottom: -17px;
    }

    &.left::after {
      height: 100%;
      width: 32px;
      top: 0;
      left: -23px;
      transform: rotate(90deg);
    }

    &.right::after {
      height: 100%;
      width: 32px;
      top: 0;
      right: -23px;
      transform: rotate(-90deg);
    }
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

const ModalButtonGroup = styled(ButtonGroup)`
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);

  .top & {
    --border-color: #463714;
  }

  .bottom & {
    --border-color: #614a1f;
  }

  .disabled.top & {
    --border-color: #1e282d;
  }

  .disabled.bottom & {
    --border-color: #39393e;
  }
`;

export interface ModalProps {
  topRightCloseButton?: {
    variant: 'circle' | 'toast';
    toastWithBackground?: boolean;
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
  caret?: boolean;
  disabled?: boolean;
  borderless?: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  bottomButtons,
  show,
  className,
  backdropClick,
  position = 'bottom',
  disabled,
  borderless,
  topRightCloseButton,
  caret,
}) => {
  const transitionModal = useTransition(show, {
    config: springConfigHarsh,
    from: { opacity: 0, transform: 'scaleX(0.6) scaleY(1) translateY(100px)' },
    enter: { opacity: 1, transform: 'scaleX(1) scaleY(1) translateY(0)' },
    leave: { opacity: 0, transform: 'scaleX(1.2) scaleY(1.2) translateY(0)' },
  });

  const transitionBackdrop = useTransition(show, {
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
      {transitionBackdrop((tbStyle, tbVisible) => {
        return (
          tbVisible && (
            <ModalContainer style={tbStyle}>
              {transitionModal((mStyles, mVisible) => {
                return (
                  mVisible && (
                    <StyledModal
                      style={mStyles}
                      className={classNames(
                        className,
                        position,
                        { caret },
                        { disabled },
                        { borderless },
                        { withButtons: bottomButtons.length }
                      )}
                      ref={modalRef}
                    >
                      <StyledModalSubBorder />

                      {children}

                      {bottomButtons.length && (
                        <ModalButtonGroup>
                          {bottomButtons.map(b => (
                            <PrimaryFlatButton
                              type="button"
                              key={b.buttonText}
                              onClick={b.click}
                            >
                              {b.buttonText}
                            </PrimaryFlatButton>
                          ))}
                        </ModalButtonGroup>
                      )}

                      {topRightCloseButton && (
                        <>
                          {topRightCloseButton.variant === 'circle' && (
                            <ModalTopCloseContainer>
                              <ModalTopCloseButton
                                type="button"
                                label="Close"
                                onClick={topRightCloseButton.click}
                              />
                            </ModalTopCloseContainer>
                          )}
                          {topRightCloseButton.variant === 'toast' && (
                            <ToastCloseButton
                              type="button"
                              aria-label="Close"
                              withBackground={
                                topRightCloseButton.toastWithBackground
                              }
                              onClick={topRightCloseButton.click}
                            />
                          )}
                        </>
                      )}
                    </StyledModal>
                  )
                );
              })}
            </ModalContainer>
          )
        );
      })}
    </>
  );
};

export default Modal;
