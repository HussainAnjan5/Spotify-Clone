import React from 'react';
import { RiMoreFill, RiPlayFill } from 'react-icons/ri';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  exChangeCurrent,
  exReplaceQueue,
  selectQueueCurrentId,
  selectQueueId,
} from '../../queue/queueSlice.js';
import LikeButton from './LikeButton.jsx';

const StyledRow = styled.div`
  height: 5.6rem;
  padding: 0 1.6rem;

  display: grid;
  grid-template-columns:
    1.6rem
    minmax(12rem, 4fr)
    minmax(12rem, 2fr)
    minmax(12rem, 1fr)
    1.6rem
    1.6rem;
  align-items: center;
  gap: 1.6rem;

  border-radius: 4px;

  ${({ $active }) =>
    $active &&
    css`
      div:nth-child(2) {
        color: var(--color-brand);
      }
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.1);

    div:nth-last-child(1),
    div:nth-last-child(2) {
      opacity: 1;
    }

    div:first-child {
      span {
        opacity: 0;
      }

      svg {
        opacity: 1;
      }
    }
  }
`;

const Id = styled.div`
  height: 1.6rem;
  width: 1.6rem;

  justify-self: end;
  display: flex;
  position: relative;

  span {
    position: absolute;
    right: 0;

    font-size: 1.6rem;
    font-weight: 400;
  }

  svg {
    opacity: 0;
    font-size: 1.6rem;
    color: #fff;
  }
`;

const Title = styled.div`
  display: flex;

  img {
    height: 4rem;
    width: 4rem;
    margin-right: 1.2rem;
    border-radius: 4px;
  }

  div {
    display: flex;
    flex-direction: column;

    span {
      font-weight: 400;
    }

    span:first-child {
      font-size: 1.6rem;
      color: #fff;
    }

    span:last-child {
      font-size: 1.4rem;
    }
  }
`;

const Info = styled.div`
  font-size: 1.4rem;
`;

const Action = styled.div`
  opacity: 0;
  cursor: pointer;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    color: #fff;
    scale: 1.04;
  }

  &:active {
    color: inherit;
    scale: 1;
  }
`;

// Row needs list for global queue state
const Row = ({ index, song, playlist }) => {
  const queueId = useSelector(selectQueueId);
  const queueCurrentId = useSelector(selectQueueCurrentId);
  const { id, img, name } = song;
  const dispatch = useDispatch();

  const handlePlaySong = () => {
    if (queueId !== playlist.id) {
      dispatch(exReplaceQueue(playlist.id, playlist.songs));
    }

    dispatch(exChangeCurrent(index));
  };

  return (
    <StyledRow key={id} $active={queueCurrentId === id}>
      <Id>
        <span>{index + 1}</span>
        <RiPlayFill />
      </Id>

      <Title onClick={handlePlaySong}>
        <img src={img} alt="song cover" />
        <div>
          <span>{name}</span>
          <span>{name}</span>
        </div>
      </Title>

      <Info style={{ justifySelf: 'end' }}>Apr 2 2017</Info>
      <Info style={{ justifySelf: 'end' }}>3:20</Info>

      <Action role="button">
        <LikeButton id={id} />
      </Action>
      <Action role="button">
        <RiMoreFill />
      </Action>
    </StyledRow>
  );
};

export default Row;
