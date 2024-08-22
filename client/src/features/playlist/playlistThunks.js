import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios.js';

export const getPlaylist = createAsyncThunk(
  'playlist/getPlaylist',
  async (id) => {
    const res = await axios.get(`/playlists/${id}`);
    return res.data.data.playlist;
  },
);
