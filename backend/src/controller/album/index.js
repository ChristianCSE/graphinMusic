'use strict';
import { artistController } from '../artist/';
import { songController } from '../song';
import { getSQL } from './../../database/mysql';
import { wrapPromises } from '../../utils/utils';
const albumController = {};

//you could honestly just do a join and then do a where clause 
//TODO: Benchmark the performance of making two independent queries and 
//then making a join (the join should ultimately be more expensive, but we need to make sure)

albumController.getAll = () => {
  const allQ = 'SELECT * FROM album';
  return getSQL(allQ);
};

albumController.getByAlbum = (albumName) => {
  const albumQ = `SELECT * FROM album WHERE name = ?`;
  return getSQL(albumQ, albumName);
};

albumController.getByArtist = (artistName) => {
  return artistController.getByArtist(artistName)
  .then(artists => {
    //multiple artist may have the same name
    const artistQ = `SELECT * FROM album where artist_id=?`;
    let fields = ['id'];
    return Promise.all( wrapPromises(artists, artistQ, fields) );
  });
};

albumController.getBySong = (songName) => {
  return songController.getBySong(songName)
  .then(songs => {
    let songQ = `SELECT * FROM album where album_id = ?`;
    let fields = ['album_id'];
    return Promise.all( wrapPromises(songs, songQ, fields) );
  });
};

albumController.getByArtistSong = (artistName, songName) => {
  const artistSongQ = `
  SELECT album.* 
  FROM album, 
  (SELECT id FROm artist where name = ?) artist, 
  (SELECT album_id from song where name = ?) song
  WHERE 
  artist.id = album.artist_id AND song.album_id = album.id`;
  return getSQL(artistSongQ, [artistName, songName]);
};

module.exports = {
  albumController
}