import { FieldError, UseFormRegister } from 'react-hook-form';
import React, { FC } from 'react';
import { animated, useTransition } from 'react-spring';
import FormField from '../base/FormField';
import Label from '../Label';
import { springConfigHarsh } from '@uikit/util/springConfig';
import styled from 'styled-components';

const TextareaLabel = styled(Label)`
  margin-bottom: 2px;
`;

const ErrorContainer = styled.div`
  height: 18px;
`;

const ErrorParagraph = styled(animated.p)`
  color: ${props => props.theme.colors.mage[2]};
  margin: 0;
  padding: 2px 0 0;
  letter-spacing: 0.1em;
  backface-visibility: hidden;
`;

export const StyledTextarea = styled.textarea`
  font-family: LoL Body;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: subpixel-antialiased;
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0.025em;

  display: block;
  width: 100%;
  height: 100%;
  margin-top: 2px;
  color: #f0e6d2;
  border-color: #785a28;
  border-width: 1px;
  border-style: solid;
  background-color: rgba(0, 0, 0, 0.7);
  vertical-align: middle;
  padding: 8px 6px;
  -webkit-appearance: none;
  outline: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset, 0 0 0 1px rgba(0, 0, 0, 0.25);
  resize: none;

  &::-webkit-input-placeholder {
    color: #a09b8c;
    padding-left: 3px;
    font-style: italic;
  }

  &::-webkit-textfield-decoration-container {
    position: relative;
  }

  &:focus {
    background: linear-gradient(
      to bottom,
      rgba(7, 16, 25, 0.7),
      rgba(32, 39, 44, 0.7)
    );
    border-image: linear-gradient(to bottom, #785a28, #c8aa6e) 1 stretch;
  }

  &:disabled {
    background-color: #1e2328;
    border-color: #3c3c41;
  }
`;

export interface TextareaProps {
  id: string;
  label: string;
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  showError?: boolean;
  disabled?: boolean;
  error?: FieldError;
  spellcheck?: boolean;
}

const Textarea: FC<TextareaProps> = ({
  id,
  label,
  name,
  placeholder,
  error,
  spellcheck,
  showError = true,
  disabled = false,
  register,
}) => {
  const transition = useTransition(error, {
    config: springConfigHarsh,
    from: { transform: 'translateY(-20px)', opacity: 0 },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
  });

  return (
    <FormField>
      <TextareaLabel htmlFor={id} isInvalid={!!error} disabled={disabled}>
        {label}
      </TextareaLabel>
      <StyledTextarea
        disabled={disabled}
        id={id}
        spellCheck={spellcheck}
        aria-invalid={error ? 'true' : 'false'}
        placeholder={placeholder}
        {...register(name)}
      />
      {showError && (
        <ErrorContainer>
          {transition(
            (style, error) =>
              error && (
                <ErrorParagraph style={style} role="alert">
                  {error.message}
                </ErrorParagraph>
              )
          )}
        </ErrorContainer>
      )}
    </FormField>
  );
};

export default Textarea;
