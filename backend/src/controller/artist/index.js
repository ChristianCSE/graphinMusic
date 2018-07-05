'use strict';
import { albumController } from '../album';
import { songController } from '../song';
import { getSQL } from './../../database/mysql';
import { wrapPromises } from '../../utils/utils';
import { wrap } from 'module';

const artistController = {};


artistController.getAll = () => {
  const allQ = `SELECT * FROM artist`;
  return getSQL(allQ);
};

artistController.getByArtist = (artistName) => {
  const artistQ = `SELECT * FROM artist where name = ?`;
  return getSQL(artistQ, artistName);
};

artistController.getByAlbum = (albumName) => {
  return albumController.getByAlbum(albumName)
  .then( albums => {
    const albumQ = `SELECT * FROM artist where id =?`;
    const fields = ['artist_id'];
    return Promise.all(wrapPromises(albums, albumQ, fields));
  });
};

artistController.getBySong = (songName) => {
  return songController.getBySong(songName)
  .then( songs => {
    const songQ = `SELECT * FROM artist where id = ?`;
    const fields = ['artist_id'];
    return Promise.all( wrapPromises(songs, songQ, fields) );
  });
};

artistController.getByAlbumSong = (albumName, songName) => {
  const albumSongQ = `
    SELECT artist.* 
    FROM artist, 
    (select artist_id from album where name = 'Die Lit') album, 
    (select artist_id from song where name = 'Lean 4 Real') song
    WHERE album.artist_id = artist.id AND song.artist_id = artist.id`;
  return getSQL(albumSongQ, [albumName, songName]);
}

module.exports = {
  artistController
}