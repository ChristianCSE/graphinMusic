'use strict';
import { artistController } from './../artist';
import { albumController } from './../album';
import { getSQL } from './../../database/mysql';
import { wrapPromises } from '../../utils/utils';
const songController = {};

/**
 * Expensive (should this return all this info?)
*/
songController.getAll = () => {
  const allQ = `SELECT * FROM song`;
  return getSQL(allQ);
};

songController.getBySong = (songName) => {
  //more than likely there is more than one song with this name 
  const songQ = `SELECT * FROM song where name = ?`;
  return getSQL(songQ, songName);
};

songController.getByArtist = (artistName) => {
  //need artist id and then need need to get songs by artist_id 
  return artistController.getByArtist(artistName)
  .then( (artists) => {
    const artistQ = 'SELECT * FROM song WHERE artist_id = ?';
    const fields = ['id'];
    return Promise.all( wrapPromises(artists, artistQ, fields ));
  })
};

songController.getByAlbum = (albumName) => {
  console.log('getByAlbum', albumController);
  return albumController.getByAlbum(albumName)
  .then((albums) => {
    const albumQ = `SELECT * FROM song WHERE album_id = ?`;
    const fields = ['id'];
    return Promise.all( wrapPromises( albums, albumQ, fields ) );
  })
};

songController.getByArtistAlbum = (artistName, albumName) => {
  const artistAlbumQ = `
  SELECT song.* 
  FROM song, artist ar, album al
  WHERE ar.name =? AND al.name = ?
  AND song.artist_id = ar.id AND song.album_id = al.id`; 
  return getSQL(artistAlbumQ, [artistName, albumName]);
};


export { songController };