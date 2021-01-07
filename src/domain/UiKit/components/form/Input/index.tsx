import { Field } from 'formik';
import React from 'react';
import Label from '../Label';

interface InputProps {
  id: string;
  label: string;
  name: string;
  placeholder?: string | null;
}

const Input: React.FunctionComponent<InputProps> = ({
  id,
  name,
  label,
  placeholder = null,
}) => {
  return (
    <div>
      <Label htmlFor={id}> {label} </Label>
      <Field id={id} name={name} placeholder={placeholder} />
    </div>
  );
};

export default Input;
