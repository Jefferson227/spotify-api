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
  service
    .getArtists(req.params.name)
    .then(artists => {
      res.write(JSON.stringify(artists));
      res.end();
    })
    .catch(err => {
      res.send(`Error on request: ${err.error}`);
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
      res.send(`Error on request: ${err.error}`);
    });
});

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
