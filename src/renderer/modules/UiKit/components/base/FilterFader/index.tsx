import React, { FC } from 'react';
import styled from 'styled-components';

const Duplicate = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-filter: var(--filter-fader-filter);
  opacity: var(--filter-fader-opacity);
`;

export const StyledFilterFader = styled.div`
  position: relative;
`;

export interface FilterFaderProps {
  className?: string;
}

const FilterFader: FC<FilterFaderProps> = ({ children, className }) => {
  return (
    <StyledFilterFader className={className}>
      {children}
      <Duplicate>{children}</Duplicate>
    </StyledFilterFader>
  );
};

export default FilterFader;
