import FeedRow from '../FeedRow.jsx';
import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios.js';

const NewReleases = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await axios.get('/songs?sort=-createdAt&limit=5');
      const data = res.data.data.songs;
      setSongs(data);
    };

    fetchSongs();
  }, []);

  return <FeedRow title="New releases for you" list={songs} type="song" />;
};

export default NewReleases;
