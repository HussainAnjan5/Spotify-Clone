import React from 'react';
import Card from './Card.jsx';
import { useDispatch } from 'react-redux';
import { replaceQueue } from '../../features/queue/queueSlice.js';

/**
 *
 * @returns {Element}
 * @constructor
 * @instance card
 */
const SongCard = ({ data }) => {
  const { img, name } = data;
  const dispatch = useDispatch();

  const handlePlaySong = (song) => {
    dispatch(replaceQueue({ songs: [song], i: 0, id: song.id }));
  };

  return (
    <Card
      img={img}
      imgBorder="square"
      name={name}
      description="Song"
      onButtonClick={() => handlePlaySong(data)}
    />
  );
};

export default SongCard;
