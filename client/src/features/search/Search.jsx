import React, { useEffect, useState } from 'react';
import './Search.scss';
import axios from '../../api/axios.js';
import { IoSearch } from 'react-icons/io5';
import List from '../../components/List.jsx';
import SquareList from '../../components/SquareList.jsx';

const Search = () => {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('song');
  const [results, setResults] = useState({
    type: 'song',
    results: [],
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetcher = async () => {
      try {
        const res = await axios.get(`/search/${queryType}?name=${query}`, {
          signal: controller.signal,
        });

        setResults({ type: queryType, list: res.data.data });
        setError(false);
      } catch (e) {
        setResults({ type: queryType, list: [] });
        setError(true);
      }
    };
    fetcher();

    return () => {
      controller.abort();
    };
  }, [query, queryType]);

  const changeTagHandler = (tag) => {
    setQueryType(tag);
  };

  return (
    <div className="search">
      <div className="search__nav">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="What your want to listen to?"
            onChange={(e) => setQuery(e.target.value)}
          />
          <IoSearch className="search__icon" />
        </form>
      </div>
      <ul className="search__tags">
        <li
          className={
            'search__tag ' + (queryType === 'song' && 'search__tag--active')
          }
          onClick={() => changeTagHandler('song')}
        >
          Song
        </li>
        <li
          className={
            'search__tag ' + (queryType === 'artist' && 'search__tag--active')
          }
          onClick={() => changeTagHandler('artist')}
        >
          Artist
        </li>
        <li
          className={
            'search__tag ' + (queryType === 'playlist' && 'search__tag--active')
          }
          onClick={() => changeTagHandler('playlist')}
        >
          Playlist
        </li>
      </ul>

      {error && (
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          😔 Could not find a match. Try another one.
        </h2>
      )}

      {results.type === 'song' && <List list={results.list} search={true} />}
      {results.type === 'artist' && (
        <SquareList list={results.list} type="artist" />
      )}
      {results.type === 'playlist' && (
        <SquareList list={results.list} type="playlist" />
      )}
    </div>
  );
};

export default Search;
