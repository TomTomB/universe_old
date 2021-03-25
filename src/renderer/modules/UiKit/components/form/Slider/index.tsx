import React, { FC, useState } from 'react';
import sliderBtn from './assets/slider-btn.png';
import styled from 'styled-components';
import { useBoundingRect } from '@uikit/hooks';

const NativeSlider = styled.input`
  display: none;
`;

const SliderBase = styled.div`
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
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
  top: -1px;
  border: thin solid #010a13;
  left: 2px;
  width: calc(100% - 6px);
  transform-origin: left center;
  transform: scaleX(var(--slider-value-scale));
  transition: transform 25ms linear;
`;

const Thumb = styled.div`
  cursor: grab;
  width: 30px;
  height: 30px;
  background: url(${sliderBtn}) no-repeat top left;
  background-size: 100%;
  position: absolute;
  z-index: 1;
  top: -14px;
`;

const ThumbRail = styled.div`
  position: absolute;
  top: 0;
  left: 2px;
  width: calc(100% - 6px);
  height: 0;
  transform: translateX(calc(var(--thumb-translate) - 15px));
  transition: transform 25ms linear;
  z-index: 1;
`;

export const StyledSlider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 30px;
  width: 100%;
  overflow: hidden;
  padding: 0 9px;
  outline: none;

  &[data-disabled='true'] {
    pointer-events: none;

    ${Fill} {
      background: rgba(1, 10, 19, 0.15);
    }

    ${Thumb} {
      background-position: 0 -90px;
    }
  }

  &:hover,
  &:focus-visible {
    ${Fill} {
      background: linear-gradient(
        to right,
        #785a28 0%,
        #c89b3c 56%,
        #c8aa6e 100%
      );
    }

    ${Thumb} {
      background-position: 0 -30px;
    }
  }

  &:active {
    cursor: grabbing;

    ${Fill} {
      background: linear-gradient(to right, #695625, #463714);
    }

    ${Thumb} {
      background-position: 0 -60px;
    }
  }
`;

export interface SliderProps {
  id: string;
  name: string;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  register?: (...args: any) => any;
  onChange?: (value: number) => void;
}

const Slider: FC<SliderProps> = ({
  className,
  id,
  name,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  value: defaultValue = 0,
  register,
  onChange,
}) => {
  const [baseBoundingRect, baseRef] = useBoundingRect<HTMLDivElement>();
  const [value, setValue] = useState(
    defaultValue > max ? max : defaultValue < min ? min : defaultValue
  );

  const stepInverse = 1 / step;

  let cacheVal = value;

  const mouseMoveListener = (e: MouseEvent) => {
    if (!baseBoundingRect) {
      return;
    }

    const offset = e.clientX - baseBoundingRect.left;

    updateValueFromOffset(offset);
  };

  const mouseUpListener = () => {
    document.removeEventListener('mousemove', mouseMoveListener);
    document.removeEventListener('mouseup', mouseUpListener);
  };

  const handleSliderMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (disabled || e.button !== 0 || !baseBoundingRect) {
      return;
    }

    let offset = e.clientX - baseBoundingRect.left;
    if (offset < 0) {
      offset = 0;
    } else if (offset > baseBoundingRect.width) {
      offset = baseBoundingRect.width;
    }

    updateValueFromOffset(offset);

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        updateValue(value - step);
        break;

      case 'ArrowRight':
      case 'ArrowUp':
        updateValue(value + step);
        break;

      case 'PageUp':
        updateValue(value + max / 10);
        break;

      case 'PageDown':
        updateValue(value - max / 10);
        break;

      case 'Home':
        updateValue(min);
        break;

      case 'End':
        updateValue(max);
        break;
    }
  };

  const updateValueFromOffset = (offset: number) => {
    if (!baseBoundingRect) {
      return;
    }

    const offsetPercentageExact =
      (100 / ((100 / max) * baseBoundingRect.width)) * offset;

    const offsetPercentage =
      Math.round(offsetPercentageExact * stepInverse) / stepInverse;

    updateValue(offsetPercentage);
  };

  const updateValue = (percent: number) => {
    if (
      percent === value ||
      percent === cacheVal ||
      (percent < min && (cacheVal === min || value === min)) ||
      (percent > max && (cacheVal === max || value === max))
    ) {
      return;
    }

    if (percent >= min && percent <= max) {
      setValue(percent);
      cacheVal = percent;
      onChange?.(percent);
    } else if (percent < min) {
      setValue(min);
      cacheVal = min;
      onChange?.(min);
    } else if (percent > max) {
      setValue(max);
      cacheVal = max;
      onChange?.(max);
    }
  };

  const styleValue = (100 / max) * value;
  const styleScale = styleValue / 100;

  return (
    <>
      <NativeSlider
        type="range"
        disabled={disabled}
        name={name}
        min={min}
        max={max}
        value={value}
        ref={register}
        onChange={e => updateValue(+e.target.value)}
      />
      <StyledSlider
        aria-orientation="horizontal"
        role="slider"
        data-disabled={disabled}
        aria-disabled={disabled}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuetext={value.toString()}
        className={className}
        tabIndex={disabled ? -1 : 0}
        id={id}
        style={
          {
            '--slider-value-scale': styleScale,
            '--thumb-translate': `${styleValue}%`,
          } as any
        }
        onKeyDown={handleKeyDown}
        onMouseDown={handleSliderMouseDown}
      >
        <SliderBase ref={baseRef}>
          <ThumbRail>
            <Thumb />
          </ThumbRail>
          <Fill />
        </SliderBase>
      </StyledSlider>
    </>
  );
};

export default Slider;
