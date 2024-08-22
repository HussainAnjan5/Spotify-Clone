import React from 'react';
import { dislikeSong, likeSong } from '../../user/userThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';

const HeartFill = styled(RiHeartFill)`
  color: var(--color-brand);
`;

const HeartLine = styled(RiHeartLine)``;

// TODO: Make this component reusable if used in a different places
const LikeButton = ({ id }) => {
  const { likedSongs } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  // TODO: server should handle this
  const isUserLikedSong = !!likedSongs.find((song) => song.id === id);
  const handleLikeSong = () => dispatch(likeSong(id));
  const handleDislikeSong = () => dispatch(dislikeSong(id));

  return (
    <>
      {isUserLikedSong ? (
        <HeartFill onClick={handleDislikeSong} />
      ) : (
        <HeartLine onClick={handleLikeSong} />
      )}
    </>
  );
};

export default LikeButton;
