import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: { isPlaying: true },
  reducers: {
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { playPause } = playerSlice.actions;
export default playerSlice.reducer;
