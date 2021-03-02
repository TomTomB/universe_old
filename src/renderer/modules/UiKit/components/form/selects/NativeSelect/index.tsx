import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { SelectOption } from '../FramedSelect';

const StyledNativeSelect = styled.select<{ hidden?: boolean }>`
  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `}
`;

interface NativeSelectProps {
  id: string;
  name: string;
  items: SelectOption[];
  disabled?: boolean;
  hidden?: boolean;
  register: (...args: any) => any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const NativeSelect: FC<NativeSelectProps> = ({
  id,
  items,
  name,
  register,
  onChange,
  hidden,
  disabled,
}) => {
  return (
    <StyledNativeSelect
      hidden={hidden}
      aria-hidden={hidden}
      id={id}
      ref={register}
      name={name}
      disabled={disabled}
      onChange={onChange}
    >
      {items.map(
        option =>
          option && (
            <option
              key={option.label + option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          )
      )}
    </StyledNativeSelect>
  );
};

export default NativeSelect;
