import React from 'react';
import FeedRow from '../FeedRow.jsx';
import { useSelector } from 'react-redux';

const FavouriteArtists = () => {
  const followedArtists = useSelector(
    (state) => state.user.data.followedArtists,
  );

  return (
    <FeedRow
      title="Your favorite artists"
      list={followedArtists.slice(0, 5)}
      type="artist"
    />
  );
};

export default FavouriteArtists;
