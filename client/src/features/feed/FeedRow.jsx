import React from 'react';
import styled from 'styled-components';
import SongCard from '../../components/card/SongCard.jsx';
import ArtistCard from '../../components/card/ArtistCard.jsx';

const RowHeading = styled.h2`
  font-size: 2.4rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 0.6rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  //  TEMP
  margin-bottom: 4rem;
`;

const FeedRow = ({ title, list, type }) => {
  return (
    <div>
      <RowHeading>{title}</RowHeading>

      {type === 'song' && (
        <Row>
          {list.map((el) => (
            <SongCard key={el.id} data={el} />
          ))}
        </Row>
      )}

      {type === 'artist' && (
        <Row>
          {list.map((el) => (
            <ArtistCard key={el.id} data={el} />
          ))}
        </Row>
      )}

      {/*<RowHeading>Top Playlists for you</RowHeading>*/}
      {/*<Row>*/}
      {/*  {[1, 2, 3, 4, 5].map(() => (*/}
      {/*    <PlaylistCard />*/}
      {/*  ))}*/}
      {/*</Row>*/}
    </div>
  );
};

export default FeedRow;
