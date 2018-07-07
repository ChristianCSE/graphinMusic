/**
 * sqlRows: response from db 
 * query: new query that is applied to each individual row from sqlRows
 * fieldArr: array of strings defining the fields we want from sqlRows in our new query
 * return: any array of promises 
*/
import { getSQL } from '../database/mysql';
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
};

module.exports = {
  wrapPromises
};