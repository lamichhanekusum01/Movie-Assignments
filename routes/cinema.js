const express = require('express');
const res = require('express/lib/response');
const cinema = express.Router();
const db = require('../connection');
// console.log("here");
//Select all records form cinema table
cinema.get('/GetAll', (req, res) => {
    let sql = "select * from movie";
    db.query(sql, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        }
        res.send(result);
    })
});
//Returns movie based on id 
cinema.get('/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * from movie where movie_id = " + id;
    db.query(sql, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        }
        res.send(result);
    })
});

cinema.get('/detail/:id', (req, res) => {
    let id = req.params.id;
    let movie;
    let showtimes;
    let sql = "SELECT * from movie  where movie_id = " + id;
    db.query(sql, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        }
        console.log(result[0]);
        movie = result[0];
        sql = "SELECT * from showtime  where FK_movie_id = " + id;
        db.query(sql, (err, result) => {
            if (err) {
                res.statusCode = 500;
                res.send(err);
            }
            showtimes = result;
            console.log(movie);
            console.log(showtimes);
            res.send({
                movie,
                showtimes
            })
        })

    })


});

//Delete cinema based on id 
cinema.get('/Delete', (req, res) => {
    let id = req.query.id;
    let query = "delete from movie where movie_id = " + id;
    db.query(sql, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        }
        res.send(result);
    })
})

cinema.post('', (req, res) => {
    let sql = "insert into movie(title, genre, rating, description)  values (?,?,?,?)"
    let movie = req.body;
    console.log(movie)
    db.query(sql, [movie.title, movie.genre, movie.rating, movie.description], (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        }
        res.send(result);
    })
})
// cinema.listen('3000', () => {
//     console.log('server started on port 3000');
// });

module.exports = cinema