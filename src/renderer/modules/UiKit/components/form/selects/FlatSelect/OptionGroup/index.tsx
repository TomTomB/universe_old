import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledFlatSelectOptionGroup = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #010a13;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const FlatSelectOptionGroupContainer = styled.div`
  position: relative;
`;

const OptionGroupHeaderText = styled.div`
  font-family: LoL Display;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.0375em;
  font-size: 12px;
  padding: 0 10px;
  color: #a09b8c;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export interface FlatSelectOptionGroupProps {
  name: string;
}

const FlatSelectOptionGroup: FC<
  PropsWithChildren<FlatSelectOptionGroupProps>
> = ({ children, name }) => {
  return (
    <FlatSelectOptionGroupContainer>
      <StyledFlatSelectOptionGroup>
        <OptionGroupHeaderText> {name} </OptionGroupHeaderText>
      </StyledFlatSelectOptionGroup>
      {children}
    </FlatSelectOptionGroupContainer>
  );
};

export default FlatSelectOptionGroup;
