import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistHeader from './header/PlaylistHeader.jsx';
import { selectPlaylist, selectPlaylistStatus } from './playlistSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import PlaylistNav from './nav/PlaylistNav.jsx';
import List from './list/List.jsx';
import { getPlaylist } from './playlistThunks.js';

const Body = styled.div`
  position: relative;

  // TODO: Remove this when more content is added
  min-height: 24rem;
`;

const Gradient = styled.div`
  width: 100%;
  height: 24rem;
  position: absolute;

  // Gradient
  ${({ $color = '#64748b' }) => css`
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #121212),
      linear-gradient(${$color}, ${$color});
  `}
`;

const Content = styled.div`
  padding: 0 2rem 2rem 2rem;
  position: relative;
  z-index: 1000;
`;

const Playlist = () => {
  const { id } = useParams();
  const status = useSelector(selectPlaylistStatus);
  const playlist = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylist(id));
  }, [id, dispatch]);

  if (status === 'fail') return <p>No playlist found with this id</p>;
  if (status !== 'success') return <p>Loading...</p>;

  return (
    <div>
      <PlaylistHeader playlist={playlist} />
      <Body>
        <Gradient />
        <PlaylistNav playlist={playlist} />

        <Content>
          <List playlist={playlist} />
          {/*<List list={playlist.songs} onPlaylist={true} pId={playlist.id} />*/}
        </Content>
      </Body>
    </div>
  );
};

export default Playlist;
