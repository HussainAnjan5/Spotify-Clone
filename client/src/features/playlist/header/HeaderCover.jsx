import React from 'react';
import styled, { css } from 'styled-components';
import { RiPencilLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Modal from '../../../components/Modal.jsx';
import { selectPlaylist } from '../playlistSlice.js';

const StyledCover = styled.div`
  height: 18rem;
  width: 18rem;

  position: relative;
  overflow: hidden;

  border-radius: 4px;
  box-shadow: 0 4px 6rem rgba(0, 0, 0, 0.5);

  ${({ hideHover }) =>
    hideHover &&
    css`
      cursor: pointer;

      &:hover {
        svg {
          display: inline-block;
        }

        img {
          filter: brightness(70%);
        }
      }
    `}
`;

const PencilIcon = styled(RiPencilLine)`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: 1000;

  font-size: 6rem;
`;

const Img = styled.img`
  width: 100%;
`;

const HeaderCover = () => {
  const { id, img } = useSelector(selectPlaylist);
  const userPlaylists = useSelector((state) => state.user.data.playlists);

  // FIXME: server should handle this
  const isSeparatePlaylist = !userPlaylists.find(
    (playlist) => playlist.id === id,
  );

  return (
    <Modal.Open name="playlist" isDisabled={isSeparatePlaylist}>
      <StyledCover hideHover={!isSeparatePlaylist}>
        <PencilIcon />
        <Img src={img} alt="Playlist cover" />
      </StyledCover>
    </Modal.Open>
  );
};

export default HeaderCover;
