import React from 'react';
import styled from 'styled-components';
import HistoryCard from './HistoryCard.jsx';

const StyledHistory = styled.div`
  margin-bottom: 4rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
`;

const History = ({ setGradientColor }) => {
  return (
    <StyledHistory>
      <HistoryCard setGradientColor={setGradientColor} />
      <HistoryCard setGradientColor={setGradientColor} />
      <HistoryCard setGradientColor={setGradientColor} />
      <HistoryCard setGradientColor={setGradientColor} />
      <HistoryCard setGradientColor={setGradientColor} />
      <HistoryCard setGradientColor={setGradientColor} />
    </StyledHistory>
  );
};

export default History;
