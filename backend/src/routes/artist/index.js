'use strict';

// import require from 'express';
import * as express from 'express';
import { artistController } from '../../controller/artist';
const Router = express.Router();

/**
 * 
*/
Router.get('/', (req, res, next) => {
  return artistController.getAll()
  .then(row => Promise.resolve(res.json(row)));
});

/**
 * 
*/
Router.get('/:artist_name', (req, res, next) => {
  const artistName = req.params.artist_name;
  return artistController.getArtist(artistName)
  .then(row => res.json(row));
});


Router.get('/album/:album_name', (req, res, next) => {
  return null;
})

Router.get('/song/:song_name', (req, res, next) => {
  let songName = req.params.song_name;
  return null;
})

Router.get('/album/:album_name/song/:song_name', (req, res, next) => {
  let albumName = req.params.album_name;
  let songName = req.params.song_name;
  return null;
})

/**
 * 
*/
Router.get('/*', (req, res, next) => {
  return res.json({"Error" : "Path DNE"});
})


module.exports = Router;