import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { RiPushpinFill } from 'react-icons/ri';

const StyledSavedLink = styled(NavLink)`
  padding: 0.8rem;

  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1.2rem;

  border-radius: 6px;

  &:hover {
    background: var(--color-highlight);
  }

  &:active {
    background: #000;
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.07);

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.04);
    }
  }
`;

const Img = styled.img`
  border-radius: 4px;
  width: 4.8rem;

  ${({ $artist }) =>
    $artist &&
    css`
      border-radius: 5rem;
    `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  margin-bottom: 0.2rem;
  font-size: 1.6rem;
  color: #fff;
`;

// TODO: Make 14 base font size
const Type = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  color: var(--color-text-sub);
  font-size: 1.4rem;
`;

const Pin = styled(RiPushpinFill)`
  color: var(--color-brand);
  font-size: 1.2rem;
`;

/*
 * TODO:
 *  - Add pin feature
 *  - Show playlist creator name
 */
const SavedLink = ({ item }) => {
  const isArtist = item.role === 'artist';
  const link = (isArtist ? '/artist/' : '/playlist/') + item.id;
  const pinned = false;

  return (
    <StyledSavedLink to={link}>
      <Img src={item.img} alt="Heart" $artist={isArtist} />
      <Content>
        <Name>{item.name}</Name>
        <Type>
          {pinned ? <Pin /> : null}
          <span>{isArtist ? 'Artist' : 'Playlist'}</span>
        </Type>
      </Content>
    </StyledSavedLink>
  );
};

export default SavedLink;
