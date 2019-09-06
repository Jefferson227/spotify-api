//Load HTTP module
const service = require('./service');
const crawler = require('./crawler');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

app.get('/', function(req, res) {
  res.send('Hello this is the Spotify API :)');
});

app.get('/artists/:name', function(req, res) {
  res.status(200);

  service
    .getArtists(req.params.name)
    .then(artists => {
      res.write(JSON.stringify(artists));
      res.end();
    })
    .catch(error => {
      res.status(400);
      res.write(JSON.stringify(error));
      res.end();
    });
});

app.get('/artist/:artistId/cities', function(req, res) {
  res.status(200);

  crawler
    .getCitiesByArtistId(req.params.artistId)
    .then(cities => {
      res.write(JSON.stringify(cities));
      res.end();
    })
    .catch(error => {
      res.status(400);
      res.send(JSON.stringify(error));
    });
});

app.get('/artist/:artistId', function(req, res) {
  res.status(200);

  service
    .getArtistById(req.params.artistId)
    .then(artist => {
      res.write(JSON.stringify(artist));
      res.end();
    })
    .catch(error => {
      res.status(400);
      res.write(JSON.stringify(error));
      res.end();
    });
});

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
