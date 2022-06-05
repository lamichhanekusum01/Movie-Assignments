const mysql = require('mysql8.0');
// This will export the db instance
// This is done to make code reusable
  var db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Admin@123",
      database: "Movie"

  });
  //connect
  db.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
  });

  module.exports = db;


