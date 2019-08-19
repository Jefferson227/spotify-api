const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

//Spotify variables
const baseUrl = 'https://api.spotify.com/v1/search?';
const token = process.env.CLIENT_ID;

// Creating axios instance
const instance = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${token}` }
});

const getArtists = name => {
  const queryString = 'q={name}&type=artist';
  const searchTerm = queryString.replace('{name}', name);
  const apiUrl = `${baseUrl}${searchTerm}`;

  return instance.get(apiUrl);
};

module.exports = {
  getArtists: getArtists
};
