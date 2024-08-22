import React, { useState } from 'react';
import styled from 'styled-components';
import LibraryHeader from './LibraryHeader.jsx';
import Saved from './Saved.jsx';

const StyledLibrary = styled.div`
  flex-grow: 1;
  overflow: hidden;

  background-color: var(--color-black);
  border-radius: 8px;
`;

const Library = () => {
  const [activeTag, setActiveTag] = useState('');

  const handleChangeTag = (tag) => {
    if (tag === activeTag) setActiveTag('');
    else setActiveTag(tag);
  };

  return (
    <StyledLibrary>
      <LibraryHeader activeTag={activeTag} onChangeTag={handleChangeTag} />
      <Saved activeTag={activeTag} />
    </StyledLibrary>
  );
};

export default Library;
