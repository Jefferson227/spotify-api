//Load HTTP module
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

//Spotify variables
const baseUrl = 'https://api.spotify.com/v1/search?q=muse&type=artist';
const token = process.env.CLIENT_ID;

app.get('/', function(req, res) {
  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // res.write('Hello World\n');

  // Creating axios instance
  const instance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${token}` }
  });

  instance
    .get(baseUrl)
    .then(response => {
      const artists = response.data.artists.items.map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });

      res.write(JSON.stringify(artists));
      res.end();
    })
    .catch(err => {
      console.error(`There was an error during the API call: ${err}`);
      res.write('{}');
      res.end();
    });
});

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
