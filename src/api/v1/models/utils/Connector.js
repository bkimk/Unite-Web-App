const mysql = require('mysql2');
const { dirname } = require('path');
const dbConfig = require(`${dirname(require.main.filename)}/src/config/DBConfig`)


// Create Pool
const tcpPool = mysql.createPool(dbConfig);

// Wraps tcpPool with a promise wrapper
const pool = tcpPool.promise()

// Ping database to check for common exception errors
pool.getConnection((err, connection) => {
  if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
      }
  }

  if (connection) {
    console.log('Database connection was successful')
    pool.releaseConnection(connection)
  }

  return
})


module.exports = pool
