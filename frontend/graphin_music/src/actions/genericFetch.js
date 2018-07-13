import { BASE_API_URL, FETCH_GENERIC } from './constants';
import { genericActionError } from '../utils/errors';

import axios from 'axios';



//action creator 
const FETCH_GENERIC = (data) => {
  return {
    type: FETCH_GENERIC, 
    data
  }
};



export const fetchGeneric = (artistName='', albumName='', songName='') => {
  let params = `artist/${artistName}/album/${albumName}/song/${songName}`;
  params = `${BASE_API_URL}/${params}`;
  return (dispatch) => {
    return axios.get(params)
    .then((data) => {
      console.log('fetchGeneric data: ', data);
      return dispatch(FETCH_GENERIC(data));
    }).catch((err) => genericActionError(err, 'fetchArtist'));
  }
}