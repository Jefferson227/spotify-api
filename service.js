const axios = require('axios');
const baseUrl = 'https://api.spotify.com/v1';
const accessTokenUrl = 'https://accounts.spotify.com/api/token';
const ACCESS_TOKEN_ERROR = 'ACCESS_TOKEN_ERROR';

const isTokenExpired = date => {
  if (!date || !process.env.ACCESS_TOKEN) return true;

  const now = new Date();
  const tokenDate = new Date(date);
  const timeDifference = (now.getTime() - tokenDate.getTime()) / 1000 / 60;

  return timeDifference > 30;
};

const getAccessToken = async () => {
  let accessToken = process.env.ACCESS_TOKEN;
  let isExpired = isTokenExpired(process.env.ACCESS_TOKEN_DATE);
  if (accessToken && accessToken !== ACCESS_TOKEN_ERROR && !isExpired)
    return accessToken;

  const clientId = 'a81a51cc73e44dc6ae7842098623f7da';
  const clientSecret = '207783d7180f4c71860cef96578ff3a7';
  const buffer = Buffer.from(`${clientId}:${clientSecret}`);
  const encodedAppKey = buffer.toString('base64');
  const data = 'grant_type=client_credentials';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${encodedAppKey}`
  };

  await axios
    .post(accessTokenUrl, data, {
      headers
    })
    .then(res => {
      process.env.ACCESS_TOKEN = res.data['access_token'];
      process.env.ACCESS_TOKEN_DATE = new Date();
    })
    .catch(() => {
      process.env.ACCESS_TOKEN = ACCESS_TOKEN_ERROR;
    });

  return process.env.ACCESS_TOKEN;
};

const getArtists = async name => {
  const accessToken = await getAccessToken();
  const queryString = '/search?q={name}&type=artist';
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
        const image = item.images.length ? item.images[0].url : '';

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

const getArtistById = async id => {
  const accessToken = await getAccessToken();
  const queryString = `/artists/${id}`;
  const apiUrl = `${baseUrl}${queryString}`;

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
      const artist = res.data;
      const image = artist.images.length ? artist.images[0].url : '';

      response.data = {
        id: artist.id,
        name: artist.name,
        image: image
      };
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
  getArtists,
  getArtistById
};
