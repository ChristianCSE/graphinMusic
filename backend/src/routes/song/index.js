'use strict';

import * as express from 'express';
import { songController } from '../../controller/song';
import { genericError } from '../../utils/error';
const Router = express.Router();


/**
 * Get all songs without any filtering criteria 
 * song/all
*/
Router.get('/all', (req, res, next) => {
  return songController.getAll()
  .then(row => res.json(row))
  .catch(err => genericError(err, '/all', res));
});

Router.get('/:song_name', (req, res, next) => {
  let songName = req.params.song_name;
  return songController.getBySong(songName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/:song_name', res));
});

/**
 * Get all songs by this name artist, this name could be shared
 * NOTE: Should we bundle up with the correct artist? 
 * song/artist/Playboi Carti
*/
Router.get('/artist/:artist_name', (req, res, next) => {
  let artistName = req.params.artist_name; 
  return songController.getByArtist(artistName)
  .then(row => res.json(row))
  .catch(err => genericError(err, 'artist/:artist_name', res));
});

/**
 * 
 * song/album/Die Lit
*/
Router.get('/album/:album_name', (req, res, next) => {
  let albumName = req.params.album_name; 
  return songController.getByAlbum(albumName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/album/:album_name', res));
});

/**
 * Get all the songs in this album by this artist
 * song/artist/Playboi Carti/album/Die Lit
*/
Router.get('/artist/:artist_name/album/:album_name', (req, res, next) => {
  let artistName = req.params.artist_name;
  let albumName = req.params.album_name;
  return songController.getByArtistAlbum(artistName, albumName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/artist/:artist_name/album/:album_name', res));
});

module.exports = Router;