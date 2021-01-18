import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: inline-block;
  backface-visibility: hidden;
`;

interface LabelProps {
  htmlFor: string;
  isInvalid: boolean;
}

const Label: FC<PropsWithChildren<LabelProps>> = ({
  htmlFor,
  children,
  isInvalid,
}) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      className={classNames({
        'is-invalid': isInvalid,
      })}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
