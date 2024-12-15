import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const getPlaylists = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/playlists`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
