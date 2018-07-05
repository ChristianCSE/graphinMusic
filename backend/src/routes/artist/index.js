'use strict';

// import require from 'express';
import * as express from 'express';
import { artistController } from '../../controller/artist';
import { genericError } from '../../utils/error';

const Router = express.Router();

Router.get('/all', (req, res, next) => {
  return artistController.getAll()
  .then(row => res.json(row))
  .catch(err => genericError(err, '/all', res));
});

Router.get('/:artist_name', (req, res, next) => {
  const artistName = req.params.artist_name;
  return artistController.getByArtist(artistName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/:artist_name', res));
});


Router.get('/album/:album_name', (req, res, next) => {
  const albumName = req.params.album_name;
  return artistController.getByAlbum(albumName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/album/:album_name', res));
});

Router.get('/song/:song_name', (req, res, next) => {
  let songName = req.params.song_name;
  return artistController.getBySong(songName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/song/:song_name', res));
});

Router.get('/album/:album_name/song/:song_name', (req, res, next) => {
  let albumName = req.params.album_name;
  let songName = req.params.song_name;
  return artistController.getByAlbumSong(albumName, songName)
  .then(row => res.json(row))
  .catch(err => genericError(err, '/album/:album_name/song/:song_name', res));
});

module.exports = Router;