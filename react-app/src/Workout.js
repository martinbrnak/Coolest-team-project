// Workout.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const connection = mysql.createConnection({
    host: 'database-1.cprkugnwm195.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'martinbrnak',
    database: 'Gym_Users'  
});


const workoutRouter = express.Router();
workoutRouter.use(cors());
workoutRouter.use(express.json());


// to be able to get all workouts tied to a specific user for the history page
workoutRouter.get('/:email', (req, res, next) => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
    
        console.log('Connected to the database');
    })

    const userEmail = req.params.email
    const selectQuery = 'SELECT exercise, date FROM workouts WHERE user = ?';
    
    connection.query(selectQuery, [userEmail], (err, results, fields) => {
        if (err) {
            res.status(500).send();
            return;
        }
        
        if (results.length > 0) {
            res.send(results);
        } else {
            res.status(404).send();
        }
    })
});


// posts a workout to the database
workoutRouter.post('/', (req, res, next) => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return res.status(500).send();
        }
    
        console.log('Connected to the database');
    })

    // req.body should be JSON.stringify({ user, exercise <-- name of exercise that they clicked })
    const workout = {
        user: req.body.user.email,
        exercise: req.body.exercise
    }

    const insertQuery = 'INSERT INTO workouts (user, exercise, date) VALUES (?, ?, CURRENT_DATE())';

    connection.query(insertQuery, workout, (error, results, fields) => {
        if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send();
        }
    
        if (results && results.affectedRows > 0) {
            res.status(201).send();
        } else {
            res.status(404).send('Workout not inserted.');
        }
    });  
    
});


module.exports = workoutRouter;