import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: inline-block;
  backface-visibility: hidden;
`;

const Label = ({
  htmlFor,
  children,
  isInvalid,
}: {
  htmlFor: string;
  children: string | string[];
  isInvalid: boolean;
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
