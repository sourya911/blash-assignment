import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Videos = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/videos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Your Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <a href={video.url} target="_blank" rel="noopener noreferrer">Watch</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Videos;
