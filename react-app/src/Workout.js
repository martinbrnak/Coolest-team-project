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

    console.log('Connected to the database');
})

// to be able to get all workouts tied to a specific user for the history page
workoutRouter.get('/:email', (req, res, next) => {
    console.log("received a get request for", req.params.email);

    const userEmail = req.params.email
    const selectQuery = 'SELECT id FROM workouts WHERE user = ?';
    
    connection.query(selectQuery, [userEmail], (err, results, fields) => {
        if (err) {
            res.status(500).send();
            return;
        }
        
        toReturn = [];

        console.log("results of select query", results);

        if (results.length > 0) {
            for (let i = 0 ; i < results.length ; i++) {
                const query = 'SELECT name, date, reps, sets, weight FROM exercises WHERE workout = ?'
                const workoutID = results[i];
                toReturn.push(workoutID);
                connection.query(query, [workoutID], (err, results, fields) => {
                    if (err) {
                        return res.status(500).send();
                    }

                    toReturn.push(results);                    
                })
            }

            res.send(toReturn);
        } else {
            res.status(404).send();
        }
    })
});


// posts a workout to the database and returns the associated ID
workoutRouter.post('/', (req, res, next) => {
    console.log('received post request for workout with info: ', req.body);

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