import React from 'react';

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: string[];
}) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export default Label;
