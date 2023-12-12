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

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }

})

// to be able to get all workouts tied to a specific user for the history page
workoutRouter.get('/:email', (req, res, next) => {

    const userEmail = req.params.email
    const selectQuery = 'SELECT id FROM workouts WHERE user_id = ? ORDER BY id DESC';
    
    connection.query(selectQuery, [userEmail], (err, results, fields) => {
        if (err) {
            res.status(500).send();
            return;
        }

        let toSend = [];

        if (results.length > 0) {
            for (let i = 0; i < results.length ; i++) {
                toSend.push(results[i].id);
            }
            res.send(toSend);
            
        } else {
            res.status(404).send();
        }
    })
});


// posts a workout to the database and returns the associated ID
workoutRouter.post('/', (req, res, next) => {

    const insertQuery = 'INSERT INTO workouts (user_id) VALUES (?)';

    connection.query(insertQuery, [req.body.email], (error, results, fields) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).send();
        }
    
        if (results && results.affectedRows > 0) {
            res.status(201).json({ id: results.insertId });
        } else {
            res.status(404).send('Workout not inserted.');
        }
    });  
});


module.exports = workoutRouter;