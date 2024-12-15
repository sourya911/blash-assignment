import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './Sidebar';
import Header from './Header';
import DraggableGrid from './DraggableGrid';

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
  
      const response = await axios.get(
        `https://blash-assignment.onrender.com/api/users/${userId}/videos`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Response Data:', response.data); 

      const videos = Array.isArray(response.data) ? response.data : response.data.videos || [];
  
      if (videos.length === 0) {
        setPlaylists([]);
      } else {
        
        const videoPlaylists = videos.map((video) => ({
          name: video.title,
          thumbnail: video.thumbnail || '/images/img1.jpg',
          videoCount: 1,
          url: video.url,
        }));
        setPlaylists(videoPlaylists);
      }
    } catch (error) {
      console.error('Failed to fetch playlists:', error.message);
      setError('Failed to fetch playlists. Please try again.');
      localStorage.removeItem('token'); 
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };
  ;

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const moveCard = (fromIndex, toIndex) => {
    const updatedPlaylists = [...playlists];
    const [removed] = updatedPlaylists.splice(fromIndex, 1);
    updatedPlaylists.splice(toIndex, 0, removed);
    setPlaylists(updatedPlaylists);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-700">Product Playlists</h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : playlists.length === 0 ? (
            <p className="text-center text-gray-500">No data found for videos</p>
          ) : (
            <DraggableGrid playlists={playlists} moveCard={moveCard} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
