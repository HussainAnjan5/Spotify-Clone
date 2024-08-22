import React from 'react';
import './Button.scss';
import btnLoading from '../assets/btnLoading.svg';

const Button = ({
  type = 'button',
  color = '',
  fullWidth = false,
  isLoading = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`btn btn--${color} ${fullWidth ? 'btn--full-width' : ''}`}
      type={type}
      onClick={onClick}
    >
      {isLoading ? <img src={btnLoading} alt="loading snipper" /> : children}
    </button>
  );
};

export default Button;
