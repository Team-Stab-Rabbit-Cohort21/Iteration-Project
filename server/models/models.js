const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

// See db_postgres_create.sql for table schema

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
