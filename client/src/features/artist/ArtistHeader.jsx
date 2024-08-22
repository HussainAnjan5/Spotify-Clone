import React from 'react';
import badgeImg from '../../assets/verify.png';
import styled, { css } from 'styled-components';

function tintColor(color, amount) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).slice(-2),
      )
  );
}

const Header = styled.header`
  height: 30rem;
  padding: 6.4rem 1.8rem 1.8rem 1.8rem;

  display: flex;
  flex-direction: column;

  color: #fff;

  // Gradient
  ${({ $color = '#1ed760' }) => css`
    background-color: ${$color};
    background-image: repeating-radial-gradient(
        circle at 0 0,
        transparent 0,
        ${$color} 10px
      ),
      repeating-linear-gradient(
        ${tintColor($color, -10)},
        ${tintColor($color, -30)}
      );
  `}
`;

const Verified = styled.div`
  margin-top: auto;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  font-size: 1.4rem;

  img {
    height: 2.4rem;
  }
`;

const ArtistName = styled.h1`
  font-size: 9.6rem;
  font-weight: 800;
`;

const ListenersCount = styled.p`
  font-size: 1.6rem;
  line-height: 2;
  margin-top: 0.4rem;
`;

const ArtistHeader = ({ artist }) => {
  return (
    <Header $color="#49796B">
      <Verified>
        <img src={badgeImg || ''} alt="Verified badge" />
        <span>Verified Artist</span>
      </Verified>

      <ArtistName>{artist.name}</ArtistName>

      <ListenersCount>
        {/* TODO: this should be calculated by backend in the future */}
        {artist.songs.reduce((acc, song) => acc + song.plays, 0)} plays
      </ListenersCount>
    </Header>
  );
};

export default ArtistHeader;
