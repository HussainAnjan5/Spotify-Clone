import axios from '../../api/axios.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const res = await axios.post('/users/login', {
      email,
      password,
    });

    toast.success('Logged in successfully');

    return { data: res.data.data.user, auth: true };
  },
);

export const signupUser = createAsyncThunk(
  'user/signup',
  async ({ name, email, password, passwordConfirm }) => {
    const res = await axios.post('/users/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });

    toast.success('Welcome to spotify!');

    return { data: res.data.data.user, auth: true };
  },
);

export const isLoggedIn = createAsyncThunk('user/isLoggedIn', async () => {
  const res = await axios.get('/users/isLoggedIn');

  return { data: res.data.data.user, auth: true };
});

export const updateUser = createAsyncThunk('user/updateUser', async (data) => {
  const res = await axios.patch('/users/updateMe', data);

  toast.success('Your data updated ');
  return res.data.data;
});

// UNUSED
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data) => {
    await axios.post('users/forgotPassword', data);

    toast.success('Email sent');
  },
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data) => {
    const res = await axios.patch(`/users/resetPassword/${data.id}`, data);

    toast.success('Reset password');

    return res.data;
  },
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (data) => {
    await axios.patch('/users/updatePassword', data);

    toast.success('Updated password');
  },
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const res = await axios.get('users/logout');
  toast.success(res.data.message);
});

// Like/dislike
export const likeSong = createAsyncThunk('song/likeSong', async (id) => {
  const res = await axios.post('/users/likes/add', {
    song: id,
  });

  toast.success('Song added to Liked Songs');

  return res.data.songs;
});

export const dislikeSong = createAsyncThunk('song/dislikeSong', async (id) => {
  const res = await axios.post('/users/likes/remove', {
    song: id,
  });

  toast.success('Song removed from Liked Songs');

  return res.data.songs;
});

// Artist
export const followArtist = createAsyncThunk(
  'user/followArtist',
  async (id) => {
    const res = await axios.post(`/users/follow/${id}`);

    toast.success('Added to Artists');

    return res.data.data;
  },
);

export const unfollowArtist = createAsyncThunk(
  'user/unfollowArtist',
  async (id) => {
    const res = await axios.post(`/users/unfollow/${id}`);

    toast.success('Removed from Artists');

    return res.data.data;
  },
);

export const becomeArtist = createAsyncThunk('user/becomeArtist', async () => {
  await axios.patch('/users/becomeArtist');

  toast.success('Now you are an artist');
});

// Playlist
export const getAllPlaylists = createAsyncThunk(
  'user/getAllPlaylists',
  async () => {
    const res = await axios.get('/playlists');

    return res.data.data.playlists;
  },
);

export const createPlaylist = createAsyncThunk(
  'user/createPlaylist',
  async () => {
    const res = await axios.post('/playlists');

    toast.success('Playlist created');

    return res.data.data.user.playlists;
  },
);

export const deletePlaylist = createAsyncThunk(
  'user/deletePlaylist',
  async (id) => {
    console.log('hit delete');
    const res = await axios.delete(`/playlists/${id}`);

    toast.success('Playlist deleted');
    return res.data.data.playlists;
  },
);
