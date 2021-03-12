import React, { FC } from 'react';
import styled, { css } from 'styled-components';

export const FrameColor = styled.div<{ blue?: boolean }>`
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 3px;
  background-image: linear-gradient(
    to top,
    #695625 0%,
    #a9852d 23%,
    #b88d35 93%,
    #c8aa6e 100%
  );
`;

export const InnerMask = styled.div<{ innerShadow?: boolean }>`
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: inset 0px 0px 4px 1px rgba(1, 10, 19, 0.25);
  pointer-events: none;

  ${({ innerShadow }) =>
    innerShadow &&
    css`
      box-shadow: inset 0 0 4px 4px rgba(0, 0, 0, 0.75);
    `}
`;

interface StyledFramedIconProps {
  zoom?: number;
  interactive?: boolean;
  altFrame?: boolean;
}

export const StyledFramedIcon = styled.div<StyledFramedIconProps>`
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 4px 1px rgba(1, 10, 19, 0.25);
  position: relative;
  pointer-events: none;
  cursor: pointer;

  ${({ interactive }) =>
    interactive &&
    css`
      pointer-events: all;
    `}

  &:hover ${FrameColor} {
    background-color: transparent;
    background-image: linear-gradient(to top, #c89b3c, #f0e6d2);
  }

  &:active ${FrameColor} {
    background-color: transparent;
    background-image: linear-gradient(to top, #695625, #463714);
  }

  ${({ altFrame }) =>
    altFrame &&
    css`
      ${FrameColor} {
        background-image: linear-gradient(
          to top,
          #005a82 0%,
          #0596aa 44%,
          #0596aa 93%,
          #0ac8b9 100%
        );
      }

      &:hover ${FrameColor} {
        background-image: linear-gradient(
          to top,
          #3295c7 0%,
          #0ac8b9 49%,
          #cdfafa 100%
        );
      }

      &:active ${FrameColor} {
        background-image: linear-gradient(
          to top,
          #005a82 0%,
          #005a82 83%,
          #005a82 100%
        );
      }
    `}

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    ${({ zoom }) =>
      zoom !== undefined &&
      css`
        --zoom: ${zoom};

        width: calc(100% + var(--zoom, 0) * 1px);
        height: calc(100% + var(--zoom, 0) * 1px);
        -webkit-clip-path: circle(calc(50% - var(--zoom, 0) * 0.5px) at center);
        margin-top: calc(var(--zoom, 0) * -0.5 * 1px);
        margin-left: calc(var(--zoom, 0) * -0.5 * 1px);
      `}
  }

  &[data-disabled='true'] {
    pointer-events: none;

    ${FrameColor} {
      background-image: none;
      background-color: #3c3732;
    }
  }
`;

export interface FramedIconProps {
  className?: string;
  zoom?: number;
  innerShadow?: boolean;
  altFrame?: boolean;
  interactive?: boolean;
  disabled?: boolean;
}

const FramedIcon: FC<FramedIconProps> = ({
  className,
  children,
  innerShadow,
  zoom,
  altFrame,
  interactive,
  disabled,
}) => {
  return (
    <StyledFramedIcon
      className={className}
      zoom={zoom}
      interactive={interactive}
      data-disabled={disabled}
      altFrame={altFrame}
    >
      <FrameColor>
        {children}
        <InnerMask innerShadow={innerShadow} />
      </FrameColor>
    </StyledFramedIcon>
  );
};

export default FramedIcon;
