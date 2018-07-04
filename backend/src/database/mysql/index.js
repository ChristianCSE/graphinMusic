import * as mysql from 'mysql';

const DB_CONFIG = {
  host: 'localhost', 
  user: 'root', 
  password: process.env.DBPASSWORD, 
  database: 'music'
};

const pool = mysql.createPool(DB_CONFIG); 

const getSQL = (query, arr) => {
  return new Promise((res, rej) => {
    pool.getConnection((err, conn) => {
      if(err) throw err; 
      if(!conn) throw new Error('ERROR connection: ', conn);
      conn.query(query, arr, (err, row, fields) => {
        conn.release();
        if(err) throw err; 
        console.log('\n DONE! ', query);
        res(row);
      });
    });
  });
}

module.exports = {
  pool, 
  getSQL
}