import React from 'react';
import PlayButton from '../../../components/PlayButton.jsx';
import styled from 'styled-components';
import { exChangeCurrent, exReplaceQueue } from '../../queue/queueSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { dislikePlaylist, likePlaylist } from '../playlistSlice.js';
import { RiAddCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import PlaylistMenu from './PlaylistMenu.jsx';

const Nav = styled.nav`
  padding: 2rem;

  display: flex;
  align-items: center;
  gap: 2.6rem;
  position: relative;
  z-index: 1000;
`;

const LikeButton = styled(RiAddCircleLine)`
  font-size: 3.2rem;
  cursor: pointer;

  &:hover {
    scale: 1.04;
    color: #fff;
  }

  &:active {
    scale: 1;
    color: var(--color-text-sub);
  }
`;

const DislikeButton = styled(RiCheckboxCircleFill)`
  font-size: 3.2rem;
  color: var(--color-brand);
  cursor: pointer;

  &:hover {
    scale: 1.04;
  }

  &:active {
    color: var(--color-brand-press);
    scale: 1;
  }
`;

const PlaylistNav = ({ playlist }) => {
  const userId = useSelector((state) => state.user.data.id);
  const likedPlaylists = useSelector((state) => state.user.data.likedPlaylists);
  const dispatch = useDispatch();

  const isPersonal = playlist.user.id === userId;

  const handlePlayPlaylist = () => {
    // TODO: If no songs play should be hidden
    if (playlist.songs.length) {
      dispatch(exReplaceQueue(playlist.id, playlist.songs));
      dispatch(exChangeCurrent(0));
    }
  };

  // TODO: This should be handled by server
  const isLikedPlaylist = (id) => !!likedPlaylists.find((el) => el.id === id);

  const handleLikePlaylist = () => dispatch(likePlaylist(playlist.id));
  const handleDislikePlaylist = () => dispatch(dislikePlaylist(playlist.id));

  return (
    <Nav>
      <PlayButton size={5.6} iconSize={2.4} onClick={handlePlayPlaylist} />

      {/* TODO: This should be prevented in server */}
      {!isPersonal &&
        (isLikedPlaylist(playlist.id) ? (
          <DislikeButton onClick={handleDislikePlaylist} />
        ) : (
          <LikeButton onClick={handleLikePlaylist} />
        ))}

      {isPersonal && <PlaylistMenu id={playlist.id} />}
    </Nav>
  );
};

export default PlaylistNav;
