const mysql = require("mysql2");

export var pool = mysql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  user: "admin",
  password: "admin",
  database: "proyecto",
  debug: false,
});
