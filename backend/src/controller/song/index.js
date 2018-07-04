'use strict';
import { getSQL } from './../../database/mysql';
import { artistController } from '../artist';
import { albumController } from '../album';
const songController = {};


const wrapPromises = (sqlRows, query, fieldArr) => {
  let promises = [];
  sqlRows.map( (row) => {
    let allFields = [];
    for(let i = 0; i < fieldArr.length; i++){
      allFields.push(row[fieldArr[i]]);
    }
    promises.push(getSQL(query, allFields));
  })
  return promises;
}

/**
 * Expensive
*/
songController.getAll = () => {
  const allQ = `
  select art.name, alb.name, song.name, song.track_number 
  from artist art, album alb, song
  where 
  art.id = alb.artist_id and 
  art.id = song.artist_id`;
  return getSQL(allQ);
}

songController.getBySong = (songName) => {
  //more than likely there is more than one song with this name 
  const songQ = `SELECT * FROM song where name = ?`;
  return getSQL(songQ, songName);
};

songController.getByArtist = (artistName) => {
  //need artist id and then need need to get songs by artist_id 
  return artistController.getArtist(artistName)
  .then( (artists) => {
    const artistQ = 'SELECT * FROM song WHERE artist_id = ?';
    return Promise.all( wrapPromises(artists, artistQ, ['id'] ));
  })
};

songController.getByAlbum = (albumName) => {
  return albumController.getByAlbum(albumName)
  .then(albums => {
    const albumQ = `SELECT * FROM song WHERE album_id = ?`;
    return Promise.all( wrapPromises( albums, albumQ, ['id'] ) );
  })
};


module.exports = {
  songController
}