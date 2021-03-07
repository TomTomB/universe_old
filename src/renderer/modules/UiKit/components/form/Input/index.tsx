import classNames from 'classnames';
import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import searchBoxClear from '@assets/components/input/search-box-clear.png';
import searchIcon from '@assets/components/input/search-icon.png';
import eyeHide from '@assets/masks/eye-hide.svg';
import eyeShow from '@assets/masks/eye-show.svg';
import { animated, useTransition } from 'react-spring';
import { FieldError } from 'react-hook-form';
import { springConfigHarsh } from '@uikit/util/springConfig';
import Label from '../Label';
import FormField from '../base/FormField';
import { Tooltip } from '@uikit/components/tooltip';

const InputLabel = styled(Label)`
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

const TogglePasswordCheckbox = styled.input`
  appearance: none;
  -webkit-mask: url(${eyeShow}) no-repeat center;
  -webkit-mask-size: 16px;
  border: none;
  height: 22px;
  width: 22px;
  position: absolute;
  right: 1px;
  top: 22px;
  z-index: 1;
  cursor: pointer;
  background-color: ${props => props.theme.colors.gold[2]};
  opacity: 0;
  &:hover,
  &:focus-visible {
    background-color: ${props => props.theme.colors.gold[1]};
    opacity: 1;
  }
  &:active {
    background-color: ${props => props.theme.colors.gold[6]};
  }

  &.is-shown {
    -webkit-mask: url(${eyeHide}) no-repeat center;
    -webkit-mask-size: 16px;
  }
`;

const FlatInput = styled.input`
  appearance: none;
  font-kerning: normal;
  font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: subpixel-antialiased;
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0.025em;
  display: block;
  width: 100%;
  height: 30px;
  padding: 0 6px;
  outline: none;
  color: ${props => props.theme.colors.gold[1]};
  border: 1px solid ${props => props.theme.colors.gold[5]};
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset, 0 0 0 1px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;

  &[type='search'] {
    line-height: 15px;
    padding-left: 25px;
    background: no-repeat 5px center/16px url(${searchIcon}) rgba(0, 0, 0, 0.7);

    &:focus {
      background: no-repeat 5px center/16px url(${searchIcon}),
        linear-gradient(to bottom, rgba(7, 16, 25, 0.7), rgba(32, 39, 44, 0.7));
    }

    &::-webkit-search-cancel-button {
      appearance: none;
      cursor: pointer;
      height: 18px;
      width: 18px;
      margin-left: 5px;
      margin-right: 0;
      -webkit-mask: url(${searchBoxClear}) no-repeat center;
      -webkit-mask-size: contain;
      background-color: ${props => props.theme.colors.gold[2]};
      &:hover {
        background-color: ${props => props.theme.colors.gold[1]};
      }
      &:active {
        background-color: ${props => props.theme.colors.gold[6]};
      }
    }
  }

  &.is-password-field {
    padding-right: 30px;
  }

  &:focus {
    background: linear-gradient(
      to bottom,
      rgba(7, 16, 25, 0.7),
      rgba(32, 39, 44, 0.7)
    );
    border-image: linear-gradient(
        to bottom,
        ${props => props.theme.colors.gold[5]},
        ${props => props.theme.colors.gold[3]}
      )
      1 stretch;
  }

  &:hover,
  &:focus {
    + ${TogglePasswordCheckbox} {
      opacity: 1;
    }
  }

  &[disabled] {
    color: ${props => props.theme.colors.grey.disabled};
    background-color: ${props => props.theme.colors.grey[4]};
    border-color: ${props => props.theme.colors.grey[3]};
  }

  &::-webkit-input-placeholder {
    color: ${props => props.theme.colors.grey[1]};
  }
`;

export interface InputProps {
  id: string;
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (...args: any) => any;
  type?: string;
  placeholder?: string;
  showError?: boolean;
  disabled?: boolean;
  error?: FieldError;
  spellcheck?: boolean;
}

const Input: FC<InputProps> = ({
  id,
  label,
  name,
  placeholder,
  error,
  spellcheck,
  type = 'text',
  showError = true,
  disabled = false,
  register,
}) => {
  const triggerShowPasswordCheckboxRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const transitions = useTransition(error, null, {
    config: springConfigHarsh,
    from: { transform: 'translateY(-20px)', opacity: 0 },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
  });

  return (
    <FormField>
      <InputLabel htmlFor={id} isInvalid={!!error}>
        {label}
      </InputLabel>
      <FlatInput
        ref={register()}
        name={name}
        id={id}
        spellCheck={spellcheck}
        aria-invalid={error ? 'true' : 'false'}
        className={classNames({
          'is-invalid': error,
          'is-password-field': type === 'password',
        })}
        placeholder={placeholder}
        type={showPassword ? 'text' : type}
        disabled={disabled}
      />
      {type === 'password' && (
        <>
          <TogglePasswordCheckbox
            type="checkbox"
            className={classNames({
              'is-shown': showPassword,
            })}
            onChange={event => setShowPassword(event.target.checked)}
            checked={showPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            ref={triggerShowPasswordCheckboxRef}
          />

          <Tooltip triggerRef={triggerShowPasswordCheckboxRef.current}>
            {showPassword ? 'Hide password' : 'Show password'}
          </Tooltip>
        </>
      )}
      {showError && (
        <ErrorContainer>
          {transitions.map(
            ({ item, key, props }) =>
              item && (
                <ErrorParagraph style={props} key={key} role="alert">
                  {item.message}
                </ErrorParagraph>
              )
          )}
        </ErrorContainer>
      )}
    </FormField>
  );
};

export default Input;
