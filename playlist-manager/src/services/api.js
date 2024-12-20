import axios from 'axios';

const API_URL = 'https://blash-assignment.onrender.com'; 

export const getPlaylists = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/playlists`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
