import classNames from 'classnames';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';
import Label, { StyledLabel } from '../Label';
import searchBoxClear from '../../../../../../assets/app/search-box-clear.png';
import searchIcon from '../../../../../../assets/app/search-icon.png';

const InputLabel = styled(Label)`
  display: inline-block;
  margin-bottom: 2px;
`;

const ErrorContainer = styled.div`
  height: 18px;
`;

const ErrorParagraph = styled.p`
  color: ${(props) => props.theme.colors.mage[2]};
  margin: 0;
  padding: 2px 0 0;
`;

const FormField = styled.div`
  ${StyledLabel} {
    margin-bottom: 2px;
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
  color: ${(props) => props.theme.colors.gold[1]};
  border: 1px solid ${(props) => props.theme.colors.gold[5]};
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset, 0 0 0 1px rgba(0, 0, 0, 0.25);

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
      mask: url(${searchBoxClear}) no-repeat center;
      mask-size: contain;
      background-color: ${(props) => props.theme.colors.gold[2]};
      &:hover {
        background-color: ${(props) => props.theme.colors.gold[1]};
      }
      &:active {
        background-color: ${(props) => props.theme.colors.gold[6]};
      }
    }
  }

  &:focus {
    background: linear-gradient(
      to bottom,
      rgba(7, 16, 25, 0.7),
      rgba(32, 39, 44, 0.7)
    );
    border-image: linear-gradient(
        to bottom,
        ${(props) => props.theme.colors.gold[5]},
        ${(props) => props.theme.colors.gold[3]}
      )
      1 stretch;
  }

  &[disabled] {
    color: ${(props) => props.theme.colors.grey.disabled};
    background-color: ${(props) => props.theme.colors.grey[4]};
    border-color: ${(props) => props.theme.colors.grey[3]};
  }

  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.grey[1]};
  }
`;

interface InputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  showError?: boolean;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  id,
  label,
  name,
  placeholder,
  type = 'text',
  showError = true,
  disabled = false,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormField>
          <InputLabel
            htmlFor={id}
            isInvalid={
              (form.touched[name] && Boolean(form.errors[name])) ?? false
            }
          >
            {label}
          </InputLabel>
          <FlatInput
            {...field}
            id={id}
            className={classNames({
              'is-invalid': form.errors[field.name] && form.touched[field.name],
            })}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
          {showError && (
            <ErrorContainer>
              <ErrorMessage name={field.name} component={ErrorParagraph} />
            </ErrorContainer>
          )}
        </FormField>
      )}
    </Field>
  );
};

export default Input;
