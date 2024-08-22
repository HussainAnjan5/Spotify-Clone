import React, { useState } from 'react';
import './Auth.scss';
import logo from '../../assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../user/userThunks.js';
import { Link, Navigate } from 'react-router-dom';
import isValidEmail from './isValidEmail.js';
import { toast } from 'react-toastify';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return toast.warn('Email is not valid');
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleLogin}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo" />
            <Link to="/signup" className="auth__form-link">
              Sign Up here
            </Link>
            <Input
              type="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgotPassword" className="auth__form-link">
              Forgot password?
            </Link>

            <Button type="submit" isLoading={user.loading}>
              Login
            </Button>
          </form>

          <p className="note">
            ☝🏻 Please note that authentication may take a few minutes. As the
            server spins down a free web service that goes 15 minutes without
            receiving inbound traffic, it takes some time to start.
          </p>
        </div>
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  );
};

export default Login;
