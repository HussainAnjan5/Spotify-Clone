import styled, { css } from 'styled-components';
import { RiPlayFill } from 'react-icons/ri';
import React from 'react';
import PlayButton from '../PlayButton.jsx';

const StyledCard = styled.div`
  padding: 1.2rem;
  flex: 1;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-highlight);

    div button {
      opacity: 1;
      translate: 0;
    }
  }
`;

const ImgContainer = styled.div`
  margin-bottom: 0.8rem;
  position: relative;

  button {
    position: absolute;
    bottom: 0.8rem;
    right: 0.8rem;

    transition: 0.3s;
    opacity: 0;
    translate: 0 1rem;
  }
`;

const Img = styled.img`
  width: 100%;

  ${({ $imgBorder }) =>
    $imgBorder === 'round' &&
    css`
      border-radius: 50rem;
    `}

  ${({ $imgBorder }) =>
    $imgBorder === 'square' &&
    css`
      border-radius: 0.6rem;
    `}
`;

const Name = styled.p`
  margin-bottom: 0.4rem;
  font-size: 1.6rem;
  color: #fff;
`;

const Role = styled.p`
  font-size: 1.4rem;
  color: var(--color-text-sub);
`;

const Card = ({
  imgBorder,
  img,
  name,
  description,
  onButtonClick,
  onClick,
}) => {
  return (
    <StyledCard onClick={onClick}>
      <ImgContainer>
        <Img src={img} $imgBorder={imgBorder} />
        <PlayButton
          size={4.8}
          iconSize={2.4}
          hasShadow={true}
          onClick={onButtonClick}
        >
          <RiPlayFill />
        </PlayButton>
      </ImgContainer>
      <Name>{name}</Name>
      <Role>{description}</Role>
    </StyledCard>
  );
};

export default Card;
