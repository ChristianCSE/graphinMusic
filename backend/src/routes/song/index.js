'use strict';

import * as express from 'express';
import { songController } from '../../controller/song';
const Router = express.Router();


//I need to make middleware or some generic error catcher

const genericError = (err, methodName, res) => {
  console.error(`ERROR ${methodName}`, err);
  return res.json({"ERROR" : err});
} 

/**
 * Get all songs without any filtering criteria 
*/
Router.get('/all', (req, res, next) => {
  return songController.getAll()
  .then(row => res.json(row))
  .catch(err => genericError(err, '/all', res));
});

Router.get('/:song_name', (req, res, next) => {
  let songName = req.params.song_name;
  return songController.getBySong(songName)
  .then(rows => res.json(rows))
  .catch(err => genericError(err, '/:song_name', res));
});

/**
 * Get all songs by this name artist, this name could be shared
 * NOTE: Should we bundle up with the correct artist? 
*/
Router.get('/artist/:artist_name', (req, res, next) => {
  let artistName = req.params.artist_name; 
  return songController.getByArtist(artistName)
  .then(rows => res.json(rows))
  .catch(err => genericError(err, 'artist/:artist_name', res));
});

Router.get('/album/:album_name', (req, res, next) => {
  let albumName = req.params.album_name; 
  return songController.getByAlbum(albumName)
  .then(rows => res.json(rows))
  .catch(err => genericError(err, '/album/:album_name', res));
});

/**
 * Get all the songs in this album by this artist
*/
Router.get('/artist/:artist_name/album/:album_name', (req, res, next) => {
  return null;
});


Router.get('/*', (req, res, next) => {
  return res.json({"Error": "Path DNE"});
})

module.exports = Router;