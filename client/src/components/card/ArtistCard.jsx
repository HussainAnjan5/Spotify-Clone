import React from 'react';
import Card from './Card.jsx';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @returns {Element}
 * @constructor
 * @instance card
 */
const ArtistCard = ({ data }) => {
  const { id, img, name } = data;
  const navigate = useNavigate();

  // Not all cards are links, so I need to use useNavigate here
  const handleNavigate = () => {
    navigate(`/artist/${id}`);
  };

  return (
    <Card
      img={img}
      imgBorder="round"
      name={name}
      description="Artist"
      onClick={handleNavigate}
    />
  );
};

export default ArtistCard;
