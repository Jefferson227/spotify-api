const cheerio = require('cheerio');
const rp = require('request-promise');

const getCitiesByArtistId = async artistId => {
  const url = `https://open.spotify.com/artist/${artistId}/about`;
  let response = {
    hasError: false,
    errorMessage: '',
    data: []
  };

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
          response.data = {
            cities: artist.insights.cities,
            monthlyListeners: artist.insights.monthly_listeners
          };
        }
      });
    })
    .catch(() => {
      response = {
        hasError: true,
        errorMessage:
          'An error has occurred when tried to get the cities for this artist.',
        data: []
      };

      throw response;
    });

  return response;
};

module.exports = {
  getCitiesByArtistId: getCitiesByArtistId
};
