import React, { FC } from 'react';
import Label from '../../Label';
import radioSpriteSheet from './assets/btn_icon.png';
import styled from 'styled-components';

const StyledRadioOption = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  + & {
    margin-top: 0.5rem;
  }
`;

const RadioLabel = styled(Label)`
  transition-duration: 0ms;
`;

const RadioSpan = styled.span`
  width: 18px;
  height: 18px;
  background: url(${radioSpriteSheet}) no-repeat;
  flex-shrink: 0;
  pointer-events: none;
  transition: 300ms filter;
  background-size: 100%;
`;

const RadioInput = styled.input`
  all: unset;
  opacity: 0;
  position: absolute;
  width: 100%;
  cursor: pointer;
  appearance: none;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;

  &:hover,
  &:focus-visible {
    + ${RadioSpan} {
      background-position: 0 -18px;

      + ${RadioLabel} {
        color: ${props => props.theme.colors.gold[1]};
      }
    }
  }

  &:active {
    + ${RadioSpan} {
      background-position: 0 -36px;

      + ${RadioLabel} {
        color: ${props => props.theme.colors.gold[5]};
      }
    }
  }

  &:checked {
    + ${RadioSpan} {
      background-position: 0 -72px;
    }
  }

  &:checked:hover,
  &:checked:focus-visible {
    + ${RadioSpan} {
      background-position: 0 -90px;
    }
  }

  &:checked:active {
    + ${RadioSpan} {
      background-position: 0 -108px;
    }
  }

  &:disabled {
    cursor: default;
    + ${RadioSpan} {
      background-position: 0 -54px;

      + ${RadioLabel} {
        filter: brightness(0.5);
        color: ${props => props.theme.colors.grey[1]};
      }
    }
  }

  &:checked:disabled {
    + ${RadioSpan} {
      background-position: 0 -126px;
    }
  }
`;

export interface RadioOptionProps {
  id: string;
  label: string;
  name: string;
  disabled?: boolean;
  className?: string;
  value?: string | number;
  register?: (...args: any) => any;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioOption: FC<RadioOptionProps> = ({
  id,
  label,
  name,
  className,
  disabled = false,
  value,
  register,
  onChange,
}) => {
  return (
    <StyledRadioOption className={className}>
      {register && (
        <RadioInput
          type="radio"
          id={id}
          name={name}
          disabled={disabled}
          ref={register}
        />
      )}
      {!register && (
        <RadioInput
          type="radio"
          id={id}
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
      )}
      <RadioSpan />
      <RadioLabel htmlFor={id} isInvalid={false}>
        {label}
      </RadioLabel>
    </StyledRadioOption>
  );
};

export default RadioOption;
