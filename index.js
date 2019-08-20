//Load HTTP module
const service = require('./service');
const crawler = require('./crawler');
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function(req, res) {
  res.send('Hello this is the Spotify API :)');
});

app.get('/artists/:name', function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  service
    .getArtists(req.params.name)
    .then(response => {
      const artists = response.data.artists.items.map(item => {
        let image = '';
        if (item.images.length) image = item.images[0].url;

        return {
          id: item.id,
          name: item.name,
          image: image
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

app.get('/artist/:artistId/cities', function(req, res) {
  crawler
    .getCitiesByArtistId(req.params.artistId)
    .then(cities => {
      res.write(JSON.stringify(cities));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.send('Error on request.');
    });
});

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
