import React, { useState } from 'react';
import SavedLink from './SavedLink.jsx';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SavedSearch from './SavedSearch.jsx';

const StyledSaved = styled.div`
  height: calc(100% - 12rem);
  padding: 0 0.8rem;
  overflow-y: scroll;
`;

const Saved = ({ activeTag }) => {
  const { likedPlaylists, followedArtists, playlists } = useSelector(
    (state) => state.user.data,
  );
  const [query, setQuery] = useState('');

  const sortedList =
    // Filter out selected tab items
    (
      activeTag
        ? activeTag === 'artists'
          ? followedArtists
          : [...likedPlaylists, ...playlists]
        : [...followedArtists, ...likedPlaylists, ...playlists]
    )
      // search list by query
      .filter((el) => el.name.toLowerCase().includes(query.toLowerCase()))
      // Sort list alphabetically
      .sort((a, b) => (a.name > b.name ? 1 : -1));

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  return (
    <StyledSaved className="saved">
      <SavedSearch
        query={query}
        onChangeQuery={handleChangeQuery}
        onClearQuery={handleClearQuery}
      />

      {sortedList?.map((item) => (
        <SavedLink key={item.id} item={item} />
      ))}
    </StyledSaved>
  );
};

export default Saved;
