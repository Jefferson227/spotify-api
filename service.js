const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

//Spotify variables
const baseUrl = 'https://api.spotify.com/v1/search?q=muse&type=artist';
const token = process.env.CLIENT_ID;

// Creating axios instance
const instance = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${token}` }
});

const getArtists = () => {
  return instance.get(baseUrl);
};

module.exports = {
  getArtists: getArtists
};
