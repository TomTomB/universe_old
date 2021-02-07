import React, { FC, PropsWithChildren } from 'react';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import styled from 'styled-components';
import tooltipSystemCaret from '@assets/components/tooltip/tooltip-system-caret.png';

const StyledSystemTooltip = styled(ReactTooltip)`
  &.__react_component_tooltip {
    --frameColors: #614a1f 0, #463714 5px, #463714 100%;

    margin: 1px;
    box-sizing: border-box;
    flex: 1;
    background-color: ${(props) => props.theme.colors.black};
    border-width: 2px;
    box-shadow: 0 0 0 1px rgba(1, 10, 19, 0.48);
    min-width: 41px;
    padding: 8px 6px;
    max-width: 250px;
    text-align: center;
    border: 2px solid transparent;

    &::before {
      content: '';
      border: unset !important;
      bottom: unset !important;
      margin: unset !important;
      position: absolute;
      width: calc(100% - 12px);
      height: calc(100% - 12px);
      top: 6px !important;
      left: 6px !important;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      border: unset !important;
      margin: unset !important;
      width: 16px;
      height: 11px;
      background: url(${tooltipSystemCaret}) center no-repeat;
    }

    &.place-top {
      border-image: linear-gradient(to top, var(--frameColors)) 1 stretch;

      &::after {
        left: calc(50% - 8px);
        bottom: -11px;
      }
    }

    &.place-bottom {
      border-image: linear-gradient(to bottom, var(--frameColors)) 1 stretch;
      &::after {
        left: calc(50% - 8px);
        transform: rotate(180deg);
        top: -11px;
      }
    }

    &.place-left {
      border-image: linear-gradient(to left, var(--frameColors)) 1 stretch;
      &::after {
        top: calc(50% - 5px);
        transform: rotate(-90deg);
        right: -14px;
      }
    }

    &.place-right {
      border-image: linear-gradient(to right, var(--frameColors)) 1 stretch;
      &::after {
        transform: rotate(90deg);
        top: calc(50% - 5px);
        left: -14px;
      }
    }
  }
`;

const TooltipContent = styled.p`
  margin: 0;
`;

type SystemTooltipProps = TooltipProps;

const SystemTooltip: FC<PropsWithChildren<SystemTooltipProps>> = ({
  id,
  children,
  effect = 'solid',
  delayShow = 300,
}: TooltipProps) => {
  return (
    <StyledSystemTooltip delayShow={delayShow} id={id} effect={effect}>
      <TooltipContent role="tooltip">{children}</TooltipContent>
    </StyledSystemTooltip>
  );
};

export default SystemTooltip;
