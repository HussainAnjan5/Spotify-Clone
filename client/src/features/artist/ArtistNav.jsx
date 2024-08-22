import React from 'react';
import PlayButton from '../../components/PlayButton.jsx';
import { followArtist, unfollowArtist } from '../user/userThunks.js';
import styled from 'styled-components';
import { replaceQueue } from '../queue/queueSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Nav = styled.nav`
  padding: 1.8rem;

  display: flex;
  align-items: center;
  gap: 2.6rem;
  position: relative;
  z-index: 1000;
`;

const FollowButton = styled.button`
  padding: 0.3rem 1.5rem;

  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.4rem;
  color: #fff;
  background: transparent;
  border: 1px solid #727272;
  border-radius: 5rem;

  transition: all 0.1s;

  &:hover {
    scale: 1.02;
    border-color: #fff;
  }

  &:active {
    scale: 1;
    color: #727272;
    border-color: #727272;
  }
`;

const ArtistNav = ({ artist }) => {
  const id = artist.id;
  const { id: userId, followedArtists } = useSelector(
    (state) => state.user.data,
  );
  const dispatch = useDispatch();

  const handlePlayArtist = () => {
    if (artist.songs.length) dispatch(replaceQueue({ songs: artist.songs }));
  };

  // TODO: Server should handle this when user gets artist date
  const isUserFollowed = (id) => !!followedArtists.find((el) => el.id === id);

  return (
    <Nav>
      <PlayButton size={5.6} iconSize={2.4} onClick={handlePlayArtist} />

      {userId !== id &&
        (isUserFollowed(id) ? (
          <FollowButton onClick={() => dispatch(unfollowArtist(id))}>
            Unfollow
          </FollowButton>
        ) : (
          <FollowButton onClick={() => dispatch(followArtist(id))}>
            Follow
          </FollowButton>
        ))}
    </Nav>
  );
};

export default ArtistNav;
