import styled, { css } from 'styled-components';
import List from '../../components/List.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getArtist, selectArtist, selectArtistStatus } from './artistSlice.js';
import ArtistHeader from './ArtistHeader.jsx';
import ArtistNav from './ArtistNav.jsx';

const StyledArtist = styled.div``;

const Body = styled.div`
  position: relative;
`;

const Gradient = styled.div`
  width: 100%;
  height: 24rem;
  position: absolute;

  // Gradient
  ${({ $color = '#1ed760' }) => css`
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #121212),
      linear-gradient(${$color}, ${$color});
  `}
`;

const Content = styled.div`
  padding: 0 2rem 2rem 2rem;
  position: relative;
  z-index: 1000;
`;

const SongsHeading = styled.h2`
  margin-bottom: 1.6rem;
  color: #fff;
  font-size: 2.4rem;
  font-weight: 600;
`;

const Artist = () => {
  const { id } = useParams();
  const artist = useSelector(selectArtist);
  const status = useSelector(selectArtistStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtist(id));
  }, [id, dispatch]);

  if (status === 'fail') return <p>No artist found with this id</p>;
  if (status !== 'success') return <p>Loading...</p>;

  return (
    <StyledArtist>
      <ArtistHeader artist={artist} />

      <Body>
        <Gradient $color="#49796B" />
        <ArtistNav artist={artist} />

        <Content>
          <SongsHeading>Popular</SongsHeading>
          <List list={artist.songs} />
        </Content>
      </Body>
    </StyledArtist>
  );
};

export default Artist;
