const axios = require('axios');
const baseUrl = 'https://api.spotify.com/v1/search?';

const getArtists = async (name, accessToken) => {
  const queryString = 'q={name}&type=artist';
  const searchTerm = queryString.replace('{name}', name);
  const apiUrl = `${baseUrl}${searchTerm}`;

  const instance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  let artists = [];
  await instance
    .get(apiUrl)
    .then(response => {
      artists = response.data.artists.items.map(item => {
        let image = '';
        if (item.images.length) image = item.images[0].url;

        return {
          id: item.id,
          name: item.name,
          image: image
        };
      });
    })
    .catch(err => {
      artists = { error: err };
    });

  return artists;
};

module.exports = {
  getArtists: getArtists
};
