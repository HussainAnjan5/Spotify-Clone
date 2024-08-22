import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  becomeArtist,
  logoutUser,
  updatePassword,
  updateUser,
} from './userThunks.js';
import React, { useRef } from 'react';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';
import { RiLogoutBoxLine } from 'react-icons/ri';

const Profile = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const formInfoRef = useRef();
  const formPassRef = useRef();

  const formInfoHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formInfoRef.current);

    dispatch(updateUser(formData));
  };

  const formPassHandler = (e) => {
    e.preventDefault();

    const data = {
      currentPassword: e.target[0].value,
      password: e.target[1].value,
      passwordConfirm: e.target[2].value,
    };

    dispatch(updatePassword(data));
  };

  const becomeArtistHandler = () => {
    dispatch(becomeArtist());
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      {user.name ? (
        <div className="profile">
          <div className="profile__header">
            <div className="profile__photo">
              <img src={user.img} alt="Avatar" />
            </div>
            <div className="profile__info">
              <span>Profile</span>
              <h1 className="profile__name">{user.name}</h1>
              <span>{user.followedArtists.length} Following</span>
            </div>
          </div>
          <div className="profile__body">
            <div className="profile__form">
              <h2>Update your information</h2>
              <form ref={formInfoRef} onSubmit={formInfoHandler}>
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  name="name"
                  minLength="3"
                  maxLength="24"
                  placeholder={user.name}
                />
                <label htmlFor="email">Email</label>
                <Input type="text" name="email" placeholder={user.email} />
                <label htmlFor="photo">Photo</label>
                <Input type="file" name="photo" accept="image/*" />
                <Button type="submit">Update</Button>
              </form>
              <h2>Update your password</h2>
              <form ref={formPassRef} onSubmit={formPassHandler}>
                <label htmlFor="oldPassword">Old password</label>
                <Input
                  type="password"
                  name="oldPassword"
                  minLength="8"
                  maxLength="16"
                />
                <label htmlFor="newPassword">New password</label>
                <Input
                  type="password"
                  name="newPassword"
                  minLength="8"
                  maxLength="16"
                />
                <label htmlFor="confirmPassword">Confirm password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  minLength="8"
                  maxLength="16"
                />
                <Button type="submit">Update</Button>
              </form>
              {user.role === 'user' && (
                <p
                  onClick={becomeArtistHandler}
                  style={{ color: '#22c55e', cursor: 'pointer' }}
                >
                  🎤 Become an Artist
                </p>
              )}
              <p
                onClick={logoutHandler}
                style={{ color: '#ef4444', cursor: 'pointer' }}
              >
                <RiLogoutBoxLine /> Log out
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>Really?? You are not logged in man!!</div>
      )}
    </>
  );
};

export default Profile;
