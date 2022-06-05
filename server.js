const express = require('express');
const app = express();
const cors = require('cors')
const databaseInit = require('./cinema_db')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));
//This will call the exported function from cinema_db.js
databaseInit();
const cinemaRouter = require('./routes/cinema');
// const databaseRouter = require('./cinema_db');
const showtimeRouter = require('./routes/showtime');

// app.use('/db', databaseRouter);
app.use('/cinema', cinemaRouter);
app.use('/showtime', showtimeRouter);

app.listen(3000, () => console.log("Server up and running"));