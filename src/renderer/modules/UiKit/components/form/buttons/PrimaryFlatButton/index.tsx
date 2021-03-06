import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

const ContentWrappper = styled.div``;

const Flare = styled.div``;

const Glow = styled.div``;

const SheenWrapper = styled.div``;

const Sheen = styled.div``;

const Extra = styled.div``;

const Bg = styled.div``;

const BorderIdle = styled.div``;

const BorderTransition = styled.div``;

// Eine styled React Komponente
const StyledPrimaryFlatButton = styled.button`
  background-color: red;
  &:hover {
    background-color: green;

    ${ContentWrappper} {
      color: red;
    }
  }
`;

// Der Type der beschreibt, welche Properties die PrimaryFlatButton Komponente annimmt
interface PrimaryFlatButtonProps {
  disabled?: boolean;
  className?: string;
  external?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

// Die eigentliche React Komponente
// : FC<PropsWithChildren<PrimaryFlatButtonProps>> -> wir weisen der Komponente diesen Type zu
const PrimaryFlatButton: FC<PropsWithChildren<PrimaryFlatButtonProps>> = (
  // Wir holen uns aus den Propetries alle Props die wir brauchen. Thema Object Destructuring
  { children, disabled, className, onClick }
) => {
  return (
    <StyledPrimaryFlatButton
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      <Extra />
      <Flare />
      <Glow />
      <Bg />
      <BorderIdle />
      <BorderTransition />
      <SheenWrapper>
        <Sheen />
      </SheenWrapper>
      <ContentWrappper> {children} </ContentWrappper>
    </StyledPrimaryFlatButton>
  );
};

export default PrimaryFlatButton;
