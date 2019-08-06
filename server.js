const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('fs');

const URL = 'https://open.spotify.com/artist/1Dvfqq39HxvCJ3GvfeIFuT/about';

request(URL, function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    let $ = cheerio.load(body); //loading of complete HTML body

    let test = $('.ArtistAbout__city').text();

    console.log('testing');
    // console.log($('.ArtistAbout__city'));
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
          .trim();
        console.log(JSON.parse(scriptText));
      }
    });
    console.log(test);

    // $('.ArtistAbout__city').each(function(
    //   index
    // ) {
    //   const link = $(this)
    //     .find('div._1UoZlX>a')
    //     .attr('href');
    //   const name = $(this)
    //     .find('div._1-2Iqu>div.col-7-12>div._3wU53n')
    //     .text();
    //   console.log(link); //link for smartphone
    //   console.log(name); //name of smartphone
    // });
  }
});
