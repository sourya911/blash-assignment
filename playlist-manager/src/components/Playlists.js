import React, { useEffect, useState } from 'react';
import { getPlaylists } from '../services/api';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await getPlaylists();
      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  return (
    <div>
      <h2>Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id}>{playlist.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
