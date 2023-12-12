// Exercise.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
    host: 'database-1.cprkugnwm195.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'martinbrnak',
    database: 'Gym_Users' 
})

const exerciseRouter = express.Router();
exerciseRouter.use(cors());
exerciseRouter.use(express.json());

connection.connect((err) => {
    if (err) {
        return console.error('Error connection to the database:', err.stack);
    }
})

// gets all exercises for a given workout to display in history tab
exerciseRouter.get('/:workout', (req, res, next) => {

    const workoutID = req.params.workout;
    const selectQuery = 'SELECT workout, reps, weight, date, name, sets FROM exercises WHERE workout = ?';
    connection.query(selectQuery, [workoutID], (err, results, fields) => {
        if (err) {
            return res.status(500).send();
        }

        res.send(results)
    })
})

// posts an exercise to the database
exerciseRouter.post('/', (req, res, next) => {

    const insertQuery = 'INSERT INTO exercises (workout, reps, weight, date, name, sets) VALUES (?, ?, ?, CURRENT_DATE(), ?, ?)';

    connection.query(insertQuery, [req.body.workout, req.body.reps, req.body.weight, req.body.name, req.body.sets], (err, results, fields) => {
        if (err) {
            console.error('Error inserting data:', err);
            return;
        }

        if (results && results.affectedRows > 0) {
            res.status(201).send();
        } else {
            res.status(404).send('Exercise not inserted.');
        }
    })
})

module.exports = exerciseRouter;