import React from 'react';
import Menu from '../../../components/Menu.jsx';
import {
  RiIndeterminateCircleLine,
  RiLockFill,
  RiMoreLine,
} from 'react-icons/ri';
import styled from 'styled-components';
import { deletePlaylist } from '../../user/userThunks.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  height: 3.2rem;
  width: 3.2rem;

  color: var(--color-text-sub);
  background: transparent;

  svg {
    font-size: 3.2rem;
  }

  &:hover {
    color: #fff;
    scale: 1.04;
  }

  &:active {
    color: var(--color-text-sub);
    scale: 1;
  }
`;

const PlaylistMenu = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeletePlaylist = () => {
    dispatch(deletePlaylist(id));
    navigate('/');
  };

  return (
    <Menu>
      <Menu.Open>
        <Button>
          <RiMoreLine />
        </Button>
      </Menu.Open>
      <Menu.Body>
        {/*TODO: Add this feature*/}
        <Menu.Item>
          <RiLockFill />
          <span>Make Private</span>
        </Menu.Item>
        <Menu.Item onClick={handleDeletePlaylist}>
          <RiIndeterminateCircleLine />
          <span>Delete</span>
        </Menu.Item>
      </Menu.Body>
    </Menu>
  );
};

export default PlaylistMenu;
