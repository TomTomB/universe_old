import React, { FC } from 'react';
import { Common } from '@typings';
import styled from 'styled-components';

export const StyledRadioGroup = styled.div<RadioGroupProps>`
  display: flex;
  gap: 0.5rem;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
`;

export interface RadioGroupProps {
  direction?: Common.Direction;
}

const RadioGroup: FC<RadioGroupProps> = ({
  children,
  direction = 'vertical',
}) => {
  return (
    <StyledRadioGroup direction={direction}> {children} </StyledRadioGroup>
  );
};

export default RadioGroup;
