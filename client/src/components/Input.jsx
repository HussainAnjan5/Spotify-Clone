import React from 'react';
import './Input.scss';

const Input = ({
  id = '',
  type = 'text',
  name = '',
  minLength = '',
  maxLength = '',
  placeholder = '',
  required = false,
  onChange = null,
}) => {
  return (
    <input
      className="input"
      id={id}
      type={type}
      name={name}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    />
  );
};

export default Input;
