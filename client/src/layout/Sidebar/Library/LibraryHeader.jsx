import React from 'react';
import { RiAddFill, RiBook3Line } from 'react-icons/ri';
import Tags from './Tags.jsx';
import styled from 'styled-components';
import { createPlaylist } from '../../../features/user/userThunks.js';
import { useDispatch } from 'react-redux';

const Header = styled.header`
  padding: 0.8rem 1.6rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const HeaderTitle = styled.div`
  padding: 0.8rem;

  display: flex;
  align-items: center;
  gap: 1.2rem;

  font-size: 1.6rem;
  font-weight: 600;

  svg {
    font-size: 2.4rem;
  }

  span {
    flex-grow: 1;
  }
`;

const AddButton = styled.button`
  height: 3.2rem;
  width: 3.2rem;
  padding: 0.8rem;

  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 5rem;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    background: var(--color-highlight);
  }

  &:active {
    background: var(--color-press);
  }
`;

const LibraryHeader = ({ activeTag, onChangeTag }) => {
  const dispatch = useDispatch();

  const handleCreatePlaylist = () => {
    dispatch(createPlaylist());
  };

  return (
    <Header>
      <HeaderTitle>
        <RiBook3Line />
        <span>Library</span>
        <AddButton onClick={handleCreatePlaylist}>
          <RiAddFill style={{ scale: '1.4' }} />
        </AddButton>
      </HeaderTitle>
      <Tags activeTag={activeTag} onChangeTag={onChangeTag} />
    </Header>
  );
};

export default LibraryHeader;
