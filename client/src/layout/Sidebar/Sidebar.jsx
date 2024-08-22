import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  RiHome4Fill,
  RiHome4Line,
  RiMusicFill,
  RiMusicLine,
  RiSearchFill,
  RiSearchLine,
} from 'react-icons/ri';
import Library from './Library/Library.jsx';
import styled from 'styled-components';

const StyledSidebar = styled.nav`
  height: 100%;
  width: 34rem;
  margin: 0.8rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow: hidden;
`;

const Block = styled.div`
  padding: 1.2rem 2.4rem;

  background-color: var(--color-black);
  border-radius: 8px;
`;

/**
 * @description Icon will be changed from outline to fill when link is active
 */
const StyledLink = styled(NavLink)`
  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }

  &:link,
  &:visited {
    height: 4rem;

    display: flex;
    align-items: center;
    gap: 2rem;

    font-size: 1.6rem;
    font-weight: 600;
    color: inherit;

    svg {
      font-size: 2.4rem;
    }
  }

  // Toggle icons
  .fill {
    display: none;
  }

  &.active {
    color: #fff;

    .fill {
      display: inline-block;
    }

    .line {
      display: none;
    }
  }
`;

const Sidebar = () => {
  const role = useSelector((state) => state.user.data.role);

  return (
    <StyledSidebar>
      <Block>
        <StyledLink to="/">
          <RiHome4Line className="line" />
          <RiHome4Fill className="fill" />

          <span>Home</span>
        </StyledLink>

        <StyledLink to="/search">
          <RiSearchLine className="line" />
          <RiSearchFill className="fill" />
          <span>Search</span>
        </StyledLink>
      </Block>

      <Library />

      {role === 'artist' && (
        <Block>
          <StyledLink to="/admin">
            <RiMusicLine className="line" />
            <RiMusicFill className="fill" />
            <span>Artist</span>
          </StyledLink>
        </Block>
      )}
    </StyledSidebar>
  );
};

export default Sidebar;
