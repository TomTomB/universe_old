import React, { FC, useState } from 'react';
import { Common } from '@typings';
import sliderBtn from './assets/slider-btn.png';
import styled from 'styled-components';
import { useBoundingRect } from '@uikit/hooks';

const NativeSlider = styled.input`
  display: none;
`;

const SliderBase = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    background: #1e2328;
  }
`;
const Fill = styled.div`
  position: absolute;
  border: thin solid #010a13;
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
`;

const ThumbRail = styled.div`
  position: absolute;
  transition: transform 25ms linear;
  z-index: 1;
`;

export const StyledSlider = styled.div`
  display: flex;

  position: relative;
  overflow: hidden;
  outline: none;

  &[aria-orientation='horizontal'] {
    height: 30px;
    width: 100%;
    padding: 0 15px;
    align-items: center;
    ${SliderBase} {
      width: 100%;

      ::before {
        left: 0;
        width: 100%;
        height: 2px;
        background: #1e2328;
        top: 0;
      }
    }

    ${Fill} {
      background: linear-gradient(to left, #695625, #463714);
      left: 0;
      width: 100%;
      transform-origin: left center;
      transform: scaleX(var(--slider-value-scale));
      height: 4px;
      top: -1px;
    }

    ${ThumbRail} {
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
      transform: translateX(calc(var(--thumb-translate) - 15px));
    }

    ${Thumb} {
      top: -14px;
    }
  }

  &[aria-orientation='vertical'] {
    height: 100%;
    width: 30px;
    padding: 15px 0;
    justify-content: center;
    ${SliderBase} {
      height: 100%;

      ::before {
        bottom: 0;
        width: 2px;
        height: 100%;
      }
    }

    ${Fill} {
      background: linear-gradient(to top, #695625, #463714);
      width: 4px;
      bottom: 0;
      left: -1px;
      height: 100%;
      transform-origin: center bottom;
      transform: scaleY(var(--slider-value-scale));
    }

    ${ThumbRail} {
      bottom: 0;
      left: 0;
      height: 100%;
      width: 0;
      transform: translateY(calc(var(--thumb-translate) + 15px));
    }

    ${Thumb} {
      transform: rotate(90deg);
      left: -14px;
      bottom: 0;
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
  id: string;
  name: string;
  direction?: Common.Direction;
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
  direction = 'horizontal',
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

    const offsetPercentage = getOffsetPercentage(e, baseBoundingRect);
    updateValueFromPercent(offsetPercentage);
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

    const offsetPercentage = getOffsetPercentage(
      e.nativeEvent,
      baseBoundingRect
    );
    updateValueFromPercent(offsetPercentage);

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

  const getOffsetPercentage = (event: MouseEvent, rect: DOMRect) => {
    const offset =
      direction === 'horizontal'
        ? event.clientX - rect.left
        : event.clientY - rect.top;

    const rectLength = direction === 'horizontal' ? rect.width : rect.height;

    const offsetPercentageExact = (100 / rectLength) * offset;

    const offsetPercentage =
      Math.round(offsetPercentageExact * stepInverse) / stepInverse;

    if (offsetPercentage > 100) {
      return 100;
    } else if (offset < 0) {
      return 0;
    } else {
      return offsetPercentage;
    }
  };

  const updateValueFromPercent = (percent: number) => {
    let valueFromPercent =
      direction === 'horizontal'
        ? (max / 100) * percent
        : max - (max / 100) * percent;

    updateValue(valueFromPercent);
  };

  const updateValue = (newValue: number) => {
    if (newValue < min) {
      newValue = min;
    } else if (newValue > max) {
      newValue = max;
    }

    if (newValue === value || newValue === cacheVal) {
      return;
    }

    setValue(newValue);
    cacheVal = newValue;
    onChange?.(newValue);
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
        aria-orientation={direction}
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
            '--thumb-translate': `${
              direction === 'horizontal' ? styleValue : -styleValue
            }%`,
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
