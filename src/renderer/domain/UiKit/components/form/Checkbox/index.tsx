import React, { FC } from 'react';
import styled from 'styled-components';
import checkboxSpriteSheet from '@assets/checkbox-spritesheet.png';
import classNames from 'classnames';

const CheckboxContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  margin: 1px 0 0 5px;
  transition: 300ms filter;
`;

const CheckboxSpan = styled.span`
  width: 14px;
  height: 14px;
  background: url(${checkboxSpriteSheet}) no-repeat;
  flex-shrink: 0;
  pointer-events: none;
  transition: 300ms filter;
`;

const CheckboxInput = styled.input`
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
    + ${CheckboxSpan} {
      background-position-y: -14px;

      + ${CheckboxLabel} {
        color: ${(props) => props.theme.colors.gold[1]};
      }
    }
  }

  &:checked {
    + ${CheckboxSpan} {
      background-position-y: -28px;
    }
  }

  &:checked:hover,
  &:checked:focus-visible {
    + ${CheckboxSpan} {
      background-position-y: -42px;
    }
  }

  &:disabled {
    cursor: default;
    + ${CheckboxSpan} {
      filter: brightness(0.5);
      background-position-y: 0;

      + ${CheckboxLabel} {
        filter: brightness(0.5);
        color: ${(props) => props.theme.colors.grey[1]};
      }
    }
  }

  &:checked:disabled {
    + ${CheckboxSpan} {
      background-position-y: -28px;
    }
  }
`;

interface CheckboxProps {
  id: string;
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (...args: any) => any;
  disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  name,
  disabled = false,
  register,
}) => {
  return (
    <CheckboxContainer
      className={classNames({
        disabled,
      })}
    >
      <CheckboxInput
        type="checkbox"
        id={id}
        name={name}
        disabled={disabled}
        ref={register}
      />
      <CheckboxSpan />
      <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;