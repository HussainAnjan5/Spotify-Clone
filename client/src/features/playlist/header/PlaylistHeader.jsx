import React from 'react';
import styled, { css } from 'styled-components';
import HeaderCover from './HeaderCover.jsx';
import HeaderInfo from './HeaderInfo.jsx';
import Modal from '../../../components/Modal.jsx';
import ModalForm from './ModalForm.jsx';

const StyledPlaylistHeader = styled.header`
  padding: 8.4rem 2rem 2rem 2rem;

  display: flex;
  gap: 2rem;

  color: #fff;

  // Gradient
  ${({ $color = '#64748b' }) => css`
    background-color: ${$color};
    background-image: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%);
  `}
`;

const PlaylistHeader = () => {
  // NOTE: Modal.Window opens when Cover and Playlist Name are clicked
  return (
    <Modal>
      <StyledPlaylistHeader>
        <HeaderCover />
        <HeaderInfo />

        <Modal.Window name="playlist">
          <ModalForm />
        </Modal.Window>
      </StyledPlaylistHeader>
    </Modal>
  );
};

export default PlaylistHeader;
