const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "disha123",
  host: "localhost",
  port: 5433,
  database: "tododb",
});

module.exports = pool;
