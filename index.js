//Load HTTP module
const service = require('./service');
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
