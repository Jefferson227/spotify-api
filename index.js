//Load HTTP module
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const axios = require('axios');

//Spotify variables
const baseUrl = 'https://api.spotify.com/v1/search?q=muse&type=artist';

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello World\n');

  axios({
    method: 'get',
    url: baseUrl,
    headers: {
      Authorization: '<client id here>'
    }
  })
    .then(response => {
      res.write(response);
    })
    .catch(err => {
      console.error(`There was an error during the API call: ${err}`);
    });
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
