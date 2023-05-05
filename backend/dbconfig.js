const mysql = require("mysql2");
require("dotenv").config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB,
});

db.connect(async (err) => {
  if (err) console.log(err);
  else {
    console.log("DB connected");
  }
});

module.exports = db;
