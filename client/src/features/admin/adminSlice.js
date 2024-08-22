import { createSlice } from '@reduxjs/toolkit';
import { getSongs, uploadSong } from './adminThunks.js';
import { toast } from 'react-toastify';

const adminSlice = createSlice({
  name: 'playlist',
  initialState: {
    songs: null,
    isUploading: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get songs
      .addCase(getSongs.fulfilled, (state, action) => {
        state.songs = action.payload;
      }) // Upload song
      .addCase(uploadSong.pending, (state) => {
        state.isUploading = 'uploading';
      })
      .addCase(uploadSong.fulfilled, (state, action) => {
        state.isUploading = 'success';

        state.songs = [...state.songs, action.payload];
      })
      .addCase(uploadSong.rejected, (state, action) => {
        state.isUploading = 'failed';

        toast.error(action.payload.response.data.message);
      });
  },
});

export default adminSlice.reducer;
