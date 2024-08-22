import { createSlice } from '@reduxjs/toolkit';
import {
  becomeArtist,
  createPlaylist,
  deletePlaylist,
  dislikeSong,
  followArtist,
  getAllPlaylists,
  isLoggedIn,
  likeSong,
  loginUser,
  logoutUser,
  resetPassword,
  signupUser,
  unfollowArtist,
  updateUser,
} from './userThunks.js';
import { toast } from 'react-toastify';
import { dislikePlaylist, likePlaylist } from '../playlist/playlistSlice.js';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    auth: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.auth = false;

        toast.error(action.payload.response.data.message);
      })

      // Sign up
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;

        toast.error(action.payload.response.data.message);
      })

      // Is loggedIn
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;

        toast.success('Welcome back');
      })
      .addCase(isLoggedIn.rejected, (state, action) => {
        state.auth = false;

        toast.error(action.payload.response.data.message);
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data.name = action.payload.user.name;
        state.data.img = action.payload.user.img;
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.data = action.payload.data.user;
        state.auth = true;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;

        toast.error(action.payload.response.data.message);
      })

      // Log out
      .addCase(logoutUser.fulfilled, (state) => {
        state.auth = false;
      })

      // Like song
      .addCase(likeSong.fulfilled, (state, action) => {
        state.data.likedSongs = action.payload;
      })

      // Dislike song
      .addCase(dislikeSong.fulfilled, (state, action) => {
        state.data.likedSongs = action.payload;
      })

      // Follow user
      .addCase(followArtist.fulfilled, (state, action) => {
        state.data.followedArtists = action.payload;
      })

      // Unfollow user
      .addCase(unfollowArtist.fulfilled, (state, action) => {
        state.data.followedArtists = action.payload;
      })

      // Become an Artist
      .addCase(becomeArtist.fulfilled, (state) => {
        state.data.role = 'artist';
      })

      // Get All playlists
      .addCase(getAllPlaylists.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      })

      // Create playlist
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      })

      // Delete playlist
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      })

      // Like playlist
      .addCase(likePlaylist.fulfilled, (state, action) => {
        state.data.likedPlaylists = action.payload;
      })

      // Dislike playlist
      .addCase(dislikePlaylist.fulfilled, (state, action) => {
        state.data.likedPlaylists = action.payload;
      });
  },
});

export default userSlice.reducer;
