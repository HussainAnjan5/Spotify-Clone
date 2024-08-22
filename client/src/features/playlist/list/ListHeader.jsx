import React from 'react';
import styled, { css } from 'styled-components';

const Head = styled.div`
  height: 3.6rem;
  padding: 0 1.6rem;
  margin-bottom: 0.8rem;

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

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TH = styled.span`
  ${({ $moveTextEnd }) =>
    $moveTextEnd &&
    css`
      justify-self: end;
    `}
`;

const ListHeader = () => {
  return (
    <Head>
      <TH>#</TH>
      <TH>Title</TH>
      <TH $moveTextEnd>Release date</TH>
      <TH $moveTextEnd>Duration</TH>
      <TH>&nbsp;</TH>
      <TH>&nbsp;</TH>
    </Head>
  );
};

export default ListHeader;
