const pg = require("pg");
const Pool = pg.Pool;

require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
    port: process.env.DB_PORT,
});

module.exports = pool;