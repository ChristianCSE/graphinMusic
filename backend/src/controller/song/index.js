'use strict';
import { getSQL } from './../../database/mysql';
import { artistController } from '../artist';
const songController = {};


const wrapPromises = (sqlRows, query, fieldArr) => {
  const promises = [];
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
  .then(artists => {
    const artistQ = 'SELECT * from song where artist_id = ?';
    let artistPromises = [];
    artists.map(row => artistPromises.push( getSQL(artistQ, row.id) ) );
    return Promise.all(wrapPromises(artists, artistQ, ));
  })
};

songController.getByAlbum = (albumName) => {
  //need album id (multiple albums with same name)

}


module.exports = {
  songController
}