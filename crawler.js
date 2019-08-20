const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('fs');

const getCitiesByArtistId = artistId => {
  const URL = `https://open.spotify.com/artist/${artistId}/about`;
  let artist = '';

  request(URL, function(err, res, body) {
    if (err) {
      artist = { error: err };
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

          // const json = JSON.parse(scriptText);
          const json = scriptText;
          // console.log(json);
          // artist = JSON.parse(json);
          artist = json;
        }
      });
    }
  });

  return artist;
};

module.exports = {
  getCitiesByArtistId: getCitiesByArtistId
};
