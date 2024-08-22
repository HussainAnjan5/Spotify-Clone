import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  position: absolute;
  left: 1rem;
  translate: 0 -50%;

  font-size: 1.2rem;
  font-weight: 600;

  opacity: 0;
  transition: opacity 0.2s;
`;

const InputField = styled.div`
  position: relative;

  &:nth-child(2) {
    height: 100%;
  }
`;

const ModalInputField = ({
  label,
  name,
  register,
  as,
  defaultValue,
  placeholder,
}) => {
  const InputComponent = as;

  return (
    <InputField>
      <InputComponent
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(name)}
      />
      <Label>{label}</Label>
    </InputField>
  );
};

export default ModalInputField;
