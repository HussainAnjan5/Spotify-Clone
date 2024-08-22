import './Auth.scss';
import logo from '../../assets/logo.svg';
import { Link, Navigate } from 'react-router-dom';
import { signupUser } from '../user/userThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import isValidEmail from './isValidEmail.js';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';

const Signup = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // TODO: Validate all inputs
  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm)
      return toast.warn('Passwords do not match');
    else if (!isValidEmail(email)) {
      return toast.warn('Email is not valid');
    }

    dispatch(signupUser({ name, email, password, passwordConfirm }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleSignup}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo" />
            <Link to="/login" className="auth__form-link">
              Log In here
            </Link>
            <Input
              name="name"
              placeholder="Name"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type={email}
              name="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Password Confirm"
              required={true}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Button type="submit">
              {user.loading ? 'Loading' : 'Sign Up'}
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

export default Signup;
