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

  let response = {
    hasError: false,
    errorMessage: '',
    data: []
  };

  await instance
    .get(apiUrl)
    .then(res => {
      response.data = res.data.artists.items.map(item => {
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
      const { message } = err;

      response = {
        hasError: true,
        errorMessage: message,
        data: []
      };

      throw response;
    });

  return response;
};

module.exports = {
  getArtists: getArtists
};
