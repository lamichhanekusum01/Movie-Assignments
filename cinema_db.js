const mysql = require('mysql8.0');
  var db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Admin@123"
  });
  //connect
  db.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
  });

function createDatabase(){
    let sql = 'CREATE DATABASE IF NOT EXISTS Movie';
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        else console.log("database created")
    });
};

function useDatabase(){
    let sql = 'USE Movie';
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        else console.log("Movie database used!!")
    });
};

//This will populate data in the database
function populateData() {
    // createDatabase();
    let movies = [
        [1, "Thor Love and Thunder","Action",4.9,"MCU movie"],
        [2, "Sawshank Redemption","Mind Bender",4.5,"A story of convicted man and his days at jail"],
        [3, "Forrest Gump","Comedy,Good to watch",4,"Basically he runs,"],
        [4, "Top Gun: Maverick","Action",3,"After more than 30 years of service as one of the Navy's top aviators, Pete \"Maverick\" Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him. "],
        [5, "Doctor Strange in the Multiverse of Madness","Action",3.5,"MCU movie"],
    ]
    let showTime = [
        [1,1,"2022-06-11T10:00:00","Downtown sc"],
        [2,1,"2022-06-11T11:00:00","Downtown sc"],
        [3,1,"2022-06-11T12:00:00","Downtown sc"],
        [4,1,"2022-06-11T13:00:00","Downtown sc"],
        [5,1,"2022-06-11T14:00:00","Downtown sc"],
        [6,2,"2022-06-11T10:00:00","Moose Mall"],
        [7,2,"2022-06-11T11:00:00","Moose Mall"],
        [8,2,"2022-06-11T12:00:00","Moose Mall"],
        [9,2,"2022-06-11T13:00:00","Moose Mall"],
        [10,2,"2022-06-11T14:00:00","Moose Mall"],
        [21,3,"2022-06-11T10:00:00","Downtown sc"],
        [22,3,"2022-06-11T11:00:00","Downtown sc"],
        [23,3,"2022-06-11T12:00:00","Downtown sc"],
        [24,3,"2022-06-11T13:00:00","Downtown sc"],
        [25,3,"2022-06-11T14:00:00","Downtown sc"],
        [26,4,"2022-06-11T10:00:00","Moose Mall"],
        [27,4,"2022-06-11T11:00:00","Moose Mall"],
        [28,4,"2022-06-11T12:00:00","Moose Mall"],
        [29,4,"2022-06-11T13:00:00","Moose Mall"],
        [30,4,"2022-06-11T14:00:00","Moose Mall"],
        [31,5,"2022-06-11T10:00:00","Downtown sc"],
        [32,5,"2022-06-11T11:00:00","Downtown sc"],
        [33,5,"2022-06-11T12:00:00","Downtown sc"],
        [34,5,"2022-06-11T13:00:00","Downtown sc"],
        [35,5,"2022-06-11T14:00:00","Downtown sc"],
        [36,5,"2022-06-11T10:00:00","Moose Mall"],
        [37,5,"2022-06-11T11:00:00","Moose Mall"],
        [38,5,"2022-06-11T12:00:00","Moose Mall"],
        [39,5,"2022-06-11T13:00:00","Moose Mall"],
    ]
    //This will populate from 
    let sql = "insert into movie(movie_id, title, genre, rating, description)  values ?"
    db.query(sql,[movies],(err, result) => {
        if (err){
            console.log(err.sqlMessage)
        }
    })

    sql = "insert into showtime(showtime_ID, Fk_movie_Id, time, location) values ?"
    db.query(sql,[showTime],(err, result) => {
        if (err){
            console.log(err.sqlMessage)
        }
    })
    console.log("Database populated!!");
};



//create table
//This function will create a movie table in the database
function createMovieTable() {
    let sql = "CREATE TABLE IF NOT EXISTS movie(movie_Id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) ,genre VARCHAR(255), rating INT, description VARCHAR(255))";
    // console.log("here");
    db.query(sql, (err, result) => {
        if (err) console.log(err.sql + "\n message:" + err.sqlMessage );
        else console.log('movie table created...');
    })
};

//This function will create a showtime table in the database
function createShowTimeTable() {
    let sql = "CREATE TABLE IF NOT EXISTS showtime(showtime_ID INT AUTO_INCREMENT PRIMARY KEY,FK_movie_Id INT,time DATETIME, location VARCHAR(255), foreign key (FK_movie_id) references Movie(movie_Id))";
    db.query(sql, (err, result) => {
        if (err) console.log(err.sql + "\n message:" + err.sqlMessage );
        else console.log('showtime table created...');
    })
};


module.exports = function () {
    createDatabase();
    useDatabase();
    createMovieTable();
    createShowTimeTable();
    populateData();
    console.log("Database Initialized!!");
};