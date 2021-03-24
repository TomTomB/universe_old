import React, { FC, useRef, useState } from 'react';
import sliderBtn from './assets/slider-btn.png';
import styled from 'styled-components';
import { useBoundingRect } from '@uikit/hooks';

const SliderBase = styled.div`
  position: absolute;
  height: inherit;
  width: inherit;

  &::before {
    content: '';
    position: absolute;
    top: 14px;
    left: 2px;
    width: calc(100% - 6px);
    height: 2px;
    background: #1e2328;
  }
`;
const Fill = styled.div`
  background: linear-gradient(to left, #695625, #463714);
  position: absolute;
  height: 4px;
  top: 13px;
  border: thin solid #010a13;
  left: 2px;
  width: calc(100% - 6px);
  transform-origin: left center;
  transform: scaleX(var(--slider-value-scale));
  transition: transform 25ms linear;
`;

export const Thumb = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: url(${sliderBtn}) no-repeat top left;
  background-size: 100%;
  position: absolute;
  top: 0px;
  z-index: 1;
  transform: translateX(var(--thumb-position));
  transition: transform 25ms linear;

  &:hover {
    background-position: 0 -30px;
    + ${Fill} {
      background: linear-gradient(
        to right,
        #785a28 0%,
        #c89b3c 56%,
        #c8aa6e 100%
      );
    }
  }

  &:active {
    background-position: 0 -60px;
    + ${Fill} {
      background: linear-gradient(to right, #695625, #463714);
    }
  }
`;

export const StyledSlider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 30px;
  width: 100%;

  &[data-disabled='true'] {
    pointer-events: none;

    ${Fill} {
      background: rgba(1, 10, 19, 0.15);
    }

    ${Thumb} {
      background-position: 0 -90px;
    }
  }
`;

export interface SliderProps {
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

const Slider: FC<SliderProps> = ({
  className,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  value: defaultValue = 50,
}) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const [baseBoundingRect, baseRef] = useBoundingRect<HTMLDivElement>();
  const [value, setValue] = useState(
    defaultValue > max ? max : defaultValue < min ? min : defaultValue
  );

  const handleMouseDown = () => {
    if (disabled) {
      return;
    }

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  };

  const mouseMoveListener = (e: MouseEvent) => {
    if (!baseBoundingRect) {
      return;
    }

    const offset = e.clientX - baseBoundingRect.left;

    // FIXME(TRB): Step calculation
    const offsetPercentage = Math.round(
      (100 / ((100 / max) * baseBoundingRect.width)) * offset * step
    );

    if (offsetPercentage === value) {
      return;
    }

    if (offsetPercentage >= min && offsetPercentage <= max) {
      setValue(offsetPercentage);
    } else if (offsetPercentage < min) {
      setValue(min);
    } else if (offsetPercentage > max) {
      setValue(max);
    }
  };

  const mouseUpListener = () => {
    document.removeEventListener('mousemove', mouseMoveListener);
    document.removeEventListener('mouseup', mouseUpListener);
  };

  const styleValue = (100 / max) * value;
  const styleOffset = (30 / 100) * styleValue;
  const styleScale = styleValue / 100;

  let thumbPosition = 0;

  if (baseBoundingRect) {
    thumbPosition = baseBoundingRect.width * styleScale - styleOffset;
  }

  return (
    <StyledSlider
      data-disabled={disabled}
      className={className}
      style={
        {
          '--slider-value-scale': styleScale,
          '--thumb-position': `${thumbPosition}px`,
        } as any
      }
    >
      <SliderBase ref={baseRef}>
        <Thumb ref={thumbRef} onMouseDown={() => handleMouseDown()} />
        <Fill />
      </SliderBase>
    </StyledSlider>
  );
};

export default Slider;
