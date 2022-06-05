const express = require('express');
const router = express.Router();
const db = require('../connection')
// console.log("here");
//Select all records form showtime table
router.get('/GetAll', (req, res) => {
    let sql = "select * from showtime as s inner join movie as m on m.movie_id = s.FK_movie_Id";
    db.query(sql, (err, result) => {
        if (err){
            res.statusCode = 500;
            res.send(err);
        }
        res.send(result); 
    })
});
//Returns showtime based on movie id 
router.get('/GetAll/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * from showtime as s inner join movie as m on m.movie_id = s.FK_movie_Id where Fk_movie_Id = " + id;
    db.query(sql, (err, result) => {
        if (err){
            res.statusCode = 500;
            res.send(err);
        }
        res.send(result); 
    })
});

//Returns showtime based on showtime id 
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * from showtime as s inner join movie as m on m.movie_id = s.FK_movie_Id where showtime_id = " + id;
    db.query(sql, (err, result) => {
        console.log(result)
        if (err){
            res.statusCode = 500;
            res.send(err);
        }
        res.send(result); 
    })
});

//Add a showtime
router.post('',(req,res) => {
    let sql = "insert into showtime(Fk_movie_id, time, location)  values (?,?,?)"
    let showTime = req.body;
    console.log(showTime)
    db.query(sql,[showTime.movie_Id, showTime.showTime, showTime.location],(err, result) => {
        if (err){
            console.log(err);
            res.statusCode = 500;
            res.send(err);
        }
        console.log(result);
        res.statusCode = 200;
        res.send(result); 
    })
})

//Update a showtime
router.put('',(req,res) => {
    let showTime = req.body;
    let sql = "Update showtime set time = ? , location = ? where showtime_Id =" + showTime.showtime_ID;
    console.log(showTime)
    db.query(sql,[showTime.showTime, showTime.location],(err, result) => {
        if (err){
            console.log(err);
            res.statusCode = 500;
            res.send(err);
        }
        res.statusCode = 200;
        console.log(result);
        res.send(result); 
    })
})

//Deletes a showtime
router.delete('/:id',(req,res) => {
    let sql = "Delete from showtime where showtime_Id = " +  req.params.id;
    db.query(sql,(err, result) => {
        if (err){
            res.statusCode = 500;
            res.send(err);
        }
        res.statusCode = 200;
        res.send(result); 
    })
})

module.exports = router