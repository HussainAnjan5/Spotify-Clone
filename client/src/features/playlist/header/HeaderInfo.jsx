import React from 'react';
import Modal from '../../../components/Modal.jsx';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPlaylist } from '../playlistSlice.js';

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Type = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
`;

// TODO: Auto adjust text line based on length
const Name = styled.h1`
  font-size: 9.6rem;
  font-weight: 800;

  ${({ hideHover }) =>
    hideHover &&
    css`
      cursor: pointer;
    `}
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.4rem;
  font-weight: 400;
`;

const StatusContainer = styled.div`
  margin-top: 0.8rem;

  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StatusBar = styled.span`
  font-size: 1.4rem;
  font-weight: 400;

  &::before {
    content: '●';
    margin-right: 0.4rem;
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const AuthorImg = styled.img`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 5rem;
`;

const AuthorName = styled(Link)`
  &,
  &:link,
  &:visited {
    font-size: 1.4rem;
    font-weight: 600;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderInfo = () => {
  const playlist = useSelector(selectPlaylist);
  const { id } = playlist;
  const userPlaylists = useSelector((state) => state.user.data.playlists);

  // FIXME: server should handle this
  const isSeparatePlaylist = !userPlaylists.find(
    (playlist) => playlist.id === id,
  );

  return (
    <Info>
      <Type>Playlist</Type>

      <Modal.Open name="playlist" isDisabled={isSeparatePlaylist}>
        <Name hideHover={!isSeparatePlaylist}>{playlist.name}</Name>
      </Modal.Open>

      {playlist.description && (
        <Description>{playlist.description}</Description>
      )}

      <StatusContainer>
        <Author>
          <AuthorImg src={playlist.user.img} alt="User profile" />
          {/* TODO: Modify this after user profile is created */}
          <AuthorName to={''}>{playlist.user.name}</AuthorName>
        </Author>

        {/*TODO: This will calculated by server */}
        <StatusBar>441 likes</StatusBar>
        <StatusBar>12 songs, about 1 hr 30 min</StatusBar>
      </StatusContainer>
    </Info>
  );
};

export default HeaderInfo;
