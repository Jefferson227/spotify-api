const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('fs');

const URL = 'https://open.spotify.com/artist/1lIjN6laJcdd6txiGXvZaq/about';

request(URL, function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    let $ = cheerio.load(body); //loading of complete HTML body

    $('script').each(function(index) {
      if (
        $(this)
          .html()
          .includes('Spotify.Entity')
      ) {
        let scriptText = $(this)
          .html()
          .replace('Spotify = {};', '')
          .replace('Spotify.Entity = ', '')
          .replace(/;/gi, '')
          .trim();

        let artist = JSON.parse(scriptText);
        console.log(artist.insights.cities);
      }
    });
  }
});
