import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios.js';
import { toast } from 'react-toastify';
import { getPlaylist } from './playlistThunks.js';

export const updatePlaylist = createAsyncThunk(
  'playlist/editPlaylist',
  async ({ data, id }) => {
    // Prepare
    const formData = new FormData();

    formData.append('img', data.img);
    formData.append('name', data.name);
    formData.append('description', data.description);

    // Submit
    const res = await axios.patch(`/playlists/${id}`, formData);

    toast.success('Playlist updated');
    return res.data.data;
  },
);

export const likePlaylist = createAsyncThunk(
  'playlist/likePlaylist',
  async (id) => {
    const res = await axios.post('/playlists/likes/add', {
      playlist: id,
    });

    toast.success('Saved to Your Library');
    return res.data.playlists;
  },
);

export const dislikePlaylist = createAsyncThunk(
  'playlist/dislikePlaylist',
  async (id) => {
    const res = await axios.post('/playlists/likes/remove', {
      playlist: id,
    });

    toast.success('Removed from Your Library');
    return res.data.playlists;
  },
);

// Slice
const initialState = {
  data: {},
  status: 'idle', // 'idle' | 'loading' | 'success' | 'fail',
  statusUpdate: 'idle',
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(getPlaylist.rejected, (state) => {
        state.status = 'fail';
      })
      // Update playlist
      .addCase(updatePlaylist.pending, (state) => {
        state.statusUpdate = 'loading';
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.statusUpdate = 'success';

        state.data.name = action.payload.playlist.name;
        state.data.img = action.payload.playlist.img;
        state.data.description = action.payload.playlist.description;
      })
      .addCase(updatePlaylist.rejected, (state) => {
        state.statusUpdate = 'fail';
      }),
});

// Selectors
export const selectPlaylist = (state) => state.playlist.data;
export const selectPlaylistStatus = (state) => state.playlist.status;

export const selectPlaylistStatusUpdate = (state) =>
  state.playlist.statusUpdate;

export default playlistSlice.reducer;
