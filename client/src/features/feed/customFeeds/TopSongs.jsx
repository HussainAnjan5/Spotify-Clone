import FeedRow from '../FeedRow.jsx';
import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios.js';

const TopSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await axios.get('/songs?sort=-plays&limit=5');
      const data = res.data.data.songs;
      setSongs(data);
    };

    fetchSongs();
  }, []);

  return (
    <FeedRow title="Most listened songs of all time" list={songs} type="song" />
  );
};

export default TopSongs;
