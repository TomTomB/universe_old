import React, { FC, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

import dropdownCheck from '../../assets/img/dropdown-check.png';

interface StyledFlatSelectOptionProps {
  selected?: boolean;
}

const StyledFlatSelectOption = styled.div<StyledFlatSelectOptionProps>`
  font-family: LoL Display;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.0375em;

  height: 40px;
  font-weight: 700;
  overflow: visible;
  text-overflow: clip;
  white-space: nowrap;
  color: #cdbe91;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border-bottom: thin solid #1e2328;
  padding: 0 10px;

  &:hover {
    color: #f0e6d2;
    background-color: #1e2328;
  }

  &:active {
    color: #463714;
    background-color: rgba(30, 35, 40, 0.5);
  }

  ${({ selected }) =>
    selected &&
    css`
      &::after {
        background: url(${dropdownCheck}) center no-repeat;
        width: 14px;
        height: 11px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        content: '';
      }
    `}

  &[data-disabled] {
    color: #888;
    cursor: default;

    &:hover {
      color: #888;
      background-color: rgba(30, 35, 40, 0);
    }
  }
`;

interface FlatSelectOptionProps {
  selected?: boolean;
  disabled?: boolean;
}

const FlatSelectOption: FC<PropsWithChildren<FlatSelectOptionProps>> = ({
  children,
  selected,
  disabled,
}) => {
  return (
    <StyledFlatSelectOption selected={selected} data-disabled={disabled}>
      {children}
    </StyledFlatSelectOption>
  );
};

export default FlatSelectOption;
