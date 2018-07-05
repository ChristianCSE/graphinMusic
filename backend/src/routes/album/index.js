'use strict';

//album
import * as express from 'express';
import { albumController } from '../../controller/album';
import { genericError } from '../../utils/error';
const Router = express.Router();

Router.get('/all', (req, res, next) => {
  return albumController.getAll()
  .then(row => res.json(row))
  .catch(err => genericError(err, '/all', res));
});

Router.get('/:album_name', (req, res, next) => {
  let albumName = req.params.album_name;
  return albumController.getByAlbum(albumName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/:album_name', res));
})

Router.get('/artist/:artist_name', (req, res, next) => {
  const artistName = req.params.artist;
  return albumController.getByArtist(artistName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/artist/:artist_name', res));
});

Router.get('/song/:song_name', (req, res, next) => {
  let songName = req.params.song_name;
  return albumController.getBySong(songName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/song/:song_name', res));
})


Router.get('/artist/:artist_name/song/:song_name', (req, res, next) => {
  let artistName = req.params.artist_name;
  let songName = req.params.song_name; 
  return albumController.getByArtistAlbum(artistName, songName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/artist/:artist_name/song/:song_name', res));
});


module.exports = Router;