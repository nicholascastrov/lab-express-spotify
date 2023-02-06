var express = require('express');
var router = express.Router();

let app = express('')

const SpotifyWebApi = require('spotify-web-api-node');


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs');
});

router.get("/artist-search", ((req, res, next) =>{
  spotifyApi
  .searchArtists(req.query.artist)
  .then(data => {
    const result = data.body.artists
    console.log('The received data from the API: ', data.body.artists);
    // ----> 'HERE'S WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    res.render("artist-search-results.hbs", result)
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
}))

router.get("/albums/:artistId", ((req, res, next) =>{

  spotifyApi
  .getArtistAlbums(req.params.artistId)
  .then(data => {
    
    const resultAlbum = data.body;
    console.log('heeeeeeeellooooo ', data.body);
    res.render("albums.hbs", resultAlbum) 
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
}))

router.get("/tracks/:id", ((req, res, next) => {
  spotifyApi
  .getAlbumTracks(req.params.id)
  .then(data => {
    const resultTracks = data.body;
    res.render("tracks.hbs", resultTracks)
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
}))



module.exports = router;
