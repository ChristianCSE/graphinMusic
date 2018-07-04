'use strict';
import { getSQL } from './../../database/mysql';
import { artistController } from '../artist/';

const albumController = {};


albumController.getAll = () => {
  const allQ = 'SELECT * from album';
  return getSQL(allQ);
}

albumController.getByArtist = (artistName) => {
  return artistController.getArtist(artistName)
  .then(artist => {
    //multiple artist may have the same name
    const getBySingleArtist = 'SELECT * FROM album where artist_id=?';
    let artistPromises = [];
    artist.map((row) => artistPromises.push( getSQL(getBySingleArtist, row.id )) );
    return Promise.all(artist);
  });
}

module.exports = {
  albumController
}