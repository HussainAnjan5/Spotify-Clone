import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js';
import artistReducer from '../features/artist/artistSlice.js';
import playlistReducer from '../features/playlist/playlistSlice.js';
import playerReducer from '../features/player/playerSlice.js';
import queueReducer from '../features/queue/queueSlice.js';
import adminReducer from '../features/admin/adminSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    artist: artistReducer,
    playlist: playlistReducer,
    player: playerReducer,
    queue: queueReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
