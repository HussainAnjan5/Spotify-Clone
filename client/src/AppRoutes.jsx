import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { isLoggedIn } from './features/user/userThunks.js';
import Sidebar from './layout/Sidebar/Sidebar.jsx';
import Player from './features/player/Player.jsx';
import App from './layout/App.jsx';
import Home from './pages/Home.jsx';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Profile from './features/user/Profile.jsx';
import Search from './features/search/Search';
import LikedSongs from './features/playlist/likedSongs/LikedSongs.jsx';
import Reset from './features/auth/Reset';
import Forgot from './features/auth/Forgot';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './features/admin/Admin.jsx';
import Loading from './components/Loading.jsx';
import Artist from './features/artist/Artist.jsx';
import Playlist from './features/playlist/Playlist.jsx';

function AppRoutes() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  return (
    <BrowserRouter>
      {user.auth === true && (
        <main className="main">
          <Sidebar />

          {/* Components below should be re-viewed */}
          <App>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/likedSongs" element={<LikedSongs />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </App>
          <Player />
        </main>
      )}

      {user.auth === false && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/resetPassword/:id" element={<Reset />} />
          <Route path="*" element={<Loading main={true} fullHeight={true} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppRoutes;
