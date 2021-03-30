import React, { FC } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: inline-block;
  backface-visibility: hidden;

  &[data-disabled='true'] {
    filter: brightness(0.5);
    pointer-events: none;
  }
`;

export interface LabelProps {
  htmlFor: string;
  isInvalid: boolean;
  disabled?: boolean;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  className?: string;
}

const Label: FC<LabelProps> = ({
  htmlFor,
  children,
  isInvalid,
  disabled,
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
      data-disabled={disabled}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
