import React from 'react';
import styled from 'styled-components';
import ListHeader from './ListHeader.jsx';
import Row from './Row.jsx';

const StyledList = styled.div`
  color: var(--color-text-sub);
`;

const List = ({ playlist }) => {
  return (
    <StyledList>
      <ListHeader />
      {playlist.songs.map((el, i) => (
        <Row key={el.id} index={i} song={el} playlist={playlist} />
      ))}
    </StyledList>
  );
};

export default List;
