import React, { FC } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: inline-block;
  backface-visibility: hidden;
`;

export interface LabelProps {
  htmlFor: string;
  isInvalid: boolean;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  className?: string;
}

const Label: FC<LabelProps> = ({
  htmlFor,
  children,
  isInvalid,
  id,
  onClick,
  className,
}) => {
  return (
    <StyledLabel
      id={id}
      onClick={onClick}
      htmlFor={htmlFor}
      className={classNames(className, {
        'is-invalid': isInvalid,
      })}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
