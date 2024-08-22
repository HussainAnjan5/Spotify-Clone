import './Auth.scss';
import logo from '../../assets/logo.svg';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import isValidEmail from './isValidEmail.js';
import { toast } from 'react-toastify';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';
import axios from '../../api/axios.js';

const Forgot = () => {
  const { auth } = useSelector((state) => state.user.data);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidEmail(email)) {
      return toast.warn('Email is not valid');
    }

    try {
      await axios.post('users/forgotPassword', { email });
      toast.success('Email sent');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleFormSubmit}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo" />
            <Input
              type="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" isLoading={loading}>
              Send Token
            </Button>
          </form>
        </div>
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  );
};

export default Forgot;
