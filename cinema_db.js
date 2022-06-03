const express = require('express');
const mysql = require('mysql');
const cinema_db= express();
//creating mysql connection
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"Movie"

});
//connect
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
cinema_db.get('/createdb',(req,res) => {
    let sql ='CREATE DATABASE movie';
    db.query(sql,(err,result) => {
        if(err) throw err;
        res.send('Database created...')

    });
});
//create table
cinema_db.get('/cinema',(req,res) => {
  let sql ="CREATE TABLE movie(movie_Id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) ,genre VARCHAR(255), rating INT, description VARCHAR(255))";
  db.query(sql,(err,result) =>{
    if(err) throw err;
    console.log(result);
    res.send('movie table created...');
  })
});
cinema_db.get('/showtime',(req,res) => {
  let sql ="CREATE TABLE showtime(showtime_ID INT AUTO_INCREMENT PRIMARY KEY, CONSTRAINT FK_movie_Id ,time DATETIME(fsp), rating INT, location VARCHAR(255))";
  db.query(sql,(err,result) =>{
    if(err) throw err;
    console.log(result);
    res.send('showtime table created...');
  })
});
cinema_db.listen('3000', () => {
    console.log('server started on port 3000');
});
