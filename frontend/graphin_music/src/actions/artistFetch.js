
//import { BASE_API_URL } from '../env/constants.js';
import { BASE_API_URL, FETCH_ARTIST } from './constants';
import { genericActionError } from '../utils/errors';

import axios from 'axios';

//action creator
const FETCH_ARTIST_REQ = (data) => {
  return {
    type: FETCH_ARTIST, 
    data
  };
};




//action
export const fetchArtist = (albumName='', songName='') => {
  let params = '';
  if(albumName === '' && songName === '') params = 'all';
  else if(albumName === '' && songName != '') params = `album/${albumName}`;
  else if(albumName != '' && songName === '') params = `song/${songName}`;
  else params = `/album/${album}/song/${songName}`;
  params = `${BASE_API_URL}/${params}`;
  return (dispatch) => {
    return axios.get(params)
    .then((data) => {
      console.log('fetchArtist data: ', data);
      return dispatch(FETCH_ARTIST_REQ(data));
    }).catch((err) => genericActionError(err, 'fetchArtist'));
  }
};

