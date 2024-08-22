import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios.js';
import { toast } from 'react-toastify';

export const getSongs = createAsyncThunk('admin/getSongs', async () => {
  const res = await axios.get('/songs?personal=true');
  return res.data.data.songs;
});

export const uploadSong = createAsyncThunk(
  'admin/uploadSong',
  async ({ data }) => {
    const res = await axios.post('/songs', data);
    toast.success('Song uploaded');
    return res.data.data.song;
  },
);

export const updateSong = createAsyncThunk(
  'admin/updateSong',
  async ({ data, id }) => {
    const res = await axios.patch(`/songs/${id}`, data);
    toast.success('Song updated');
    return res.data.data.song;
  },
);

export const deleteSong = createAsyncThunk('user/deleteSong', async (id) => {
  await axios.delete(`/songs/${id}`);
  toast.success('Song deleted');
});
