import React, { FC, PropsWithChildren, useEffect } from 'react';
import { animated, useTransition } from 'react-spring';
import { springConfigHarsh } from '@uikit/util';
import styled from 'styled-components';
import tooltipCaret from '@assets/components/tooltip/tooltip-caret.png';
import tooltipSubBorderHorizontal from '@assets/components/tooltip/tooltip-sub-border-horizontal.png';
import tooltipSubBorderVertical from '@assets/components/tooltip/tooltip-sub-border-vertical.png';
import { useCompare } from '@uikit/hooks';
import { usePopperTooltip } from 'react-popper-tooltip';

const TooltipSubBorder = styled.div`
  position: absolute;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    border-image-repeat: stretch;
    border-style: solid;
  }
`;

const StyledTooltip = styled(animated.div)`
  --frameColors: #614a1f 0, #463714 5px, #463714 100%;

  box-sizing: border-box;
  flex: 1;
  background-color: ${props => props.theme.colors.black};
  border-width: 2px;
  box-shadow: 0 0 0 1px rgba(1, 10, 19, 0.48);
  min-width: 41px;
  border: 2px solid transparent;
  z-index: 100;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    top: 6px;
    left: 6px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  .tooltip-arrow {
    width: 24px;
    height: 15px;

    &::after {
      content: '';
      position: absolute;
      background: url(${tooltipCaret}) center no-repeat;
      width: 24px;
      height: 15px;
    }
  }

  &[data-popper-placement='top'],
  &[data-popper-placement='bottom'] {
    .tooltip-arrow {
      ::after {
        transform-origin: center center;
      }
    }

    ${TooltipSubBorder} {
      left: 8px;
      right: 8px;

      &::before {
        left: 0;
        right: 0;
        height: 0;
        border-image-source: url(${tooltipSubBorderHorizontal});
        border-width: 4px 4px 0 4px;
        border-image-width: 4px 4px 0 4px;
        border-image-slice: 4 4 0 4;
      }
    }
  }

  &[data-popper-placement='left'],
  &[data-popper-placement='right'] {
    ${TooltipSubBorder} {
      top: 8px;
      bottom: 8px;

      &::before {
        top: 0;
        bottom: 0;
        width: 0;
        border-image-source: url(${tooltipSubBorderVertical});
        border-width: 4px 4px 4px 0;
        border-image-width: 4px 4px 4px 0;
        border-image-slice: 4 4 4 0;
      }
    }
  }

  &[data-popper-placement='top'] {
    border-image: linear-gradient(to top, var(--frameColors)) 1 stretch;

    .tooltip-arrow {
      bottom: 0;
      ::after {
        bottom: -15px;
        left: 0;
      }
    }

    ${TooltipSubBorder} {
      bottom: -2px;
    }
  }

  &[data-popper-placement='bottom'] {
    border-image: linear-gradient(to bottom, var(--frameColors)) 1 stretch;

    .tooltip-arrow {
      top: 0;
      ::after {
        transform: rotate(180deg);
        top: -15px;
        left: 0;
      }
    }

    ${TooltipSubBorder} {
      top: -2px;
      transform: rotate(180deg);
    }
  }

  &[data-popper-placement='left'] {
    border-image: linear-gradient(to left, var(--frameColors)) 1 stretch;

    .tooltip-arrow {
      right: 0;

      ::after {
        transform: rotate(-90deg) translateX(-19px);
        transform-origin: top left;
        right: -24px;
      }
    }

    ${TooltipSubBorder} {
      right: -6px;
      transform: rotate(180deg);
    }
  }

  &[data-popper-placement='right'] {
    border-image: linear-gradient(to right, var(--frameColors)) 1 stretch;

    .tooltip-arrow {
      left: 0;

      ::after {
        transform: rotate(90deg) translateX(19px);
        transform-origin: top right;
        left: -24px;
      }
    }

    ${TooltipSubBorder} {
      left: -6px;
    }
  }
`;

export interface TooltipProps {
  triggerRef: HTMLElement | null;
  defaultVisible?: boolean;
  placement?: 'auto' | 'left' | 'top' | 'right' | 'bottom';
}

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  triggerRef,
  children,
  defaultVisible = false,
  placement = 'auto',
}) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
    update,
  } = usePopperTooltip({ placement, defaultVisible });

  const transition = useTransition(visible, {
    config: springConfigHarsh,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const childrenHasChanged = useCompare(children?.toString() ?? '');

  useEffect(() => {
    if (!triggerRef) {
      return;
    }
    setTriggerRef(triggerRef);
  }, [triggerRef, setTriggerRef]);

  useEffect(() => {
    if (update && children && childrenHasChanged) {
      update();
    }
  }, [children, update, childrenHasChanged]);

  if (!triggerRef) {
    return <></>;
  }

  return (
    <>
      {transition(
        (style, visible) =>
          visible && (
            <StyledTooltip
              ref={setTooltipRef}
              {...getTooltipProps({ style: style as any })}
            >
              <div {...getArrowProps({ className: 'tooltip-arrow' })} />
              <TooltipSubBorder />
              {children}
            </StyledTooltip>
          )
      )}
    </>
  );
};

export default Tooltip;
