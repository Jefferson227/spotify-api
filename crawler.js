const cheerio = require('cheerio');
const rp = require('request-promise');

const getCitiesByArtistId = async artistId => {
  const url = `https://open.spotify.com/artist/${artistId}/about`;
  let cities = {};

  await rp(url)
    .then(html => {
      let $ = cheerio.load(html);

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
          cities = artist.insights.cities;
        }
      });
    })
    .catch(err => {
      console.error(err);
      cities = { error: err };
    });

  return cities;
};

module.exports = {
  getCitiesByArtistId: getCitiesByArtistId
};
