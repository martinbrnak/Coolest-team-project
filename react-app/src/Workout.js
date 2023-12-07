// Workout.js

const express = require('express');
const mysql = require('mysql');
// const axios = require('axios');

// I feel like this information should be in process.env ? not sure.
const connection = mysql.createConnection({
    host: 'database-1.cprkugnwm195.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'martinbrnak',
    database: 'Gym_Users'  
});

// // open DB
// connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err.stack);
//       return;
//     }
  
//     console.log('Connected to the database');
//   });

const workoutRouter = express.Router();

// to be able to get all workouts tied to a specific userID
workoutRouter.get('/:id', (req, res, next) => {
    const userID = req.params.id;

    if (foundWorkout) {
        res.send(foundWorkout);
    } else {
        res.status(404).send();
    }
});


// posts a workout to the database
workoutRouter.post('/', (req, res, next) => {
    const receivedWorkout = req.query;
    if (receivedWorkout) {
        const insertQuery = 'INSERT INTO workouts SET ?';
        connection.query(insertQuery, receivedWorkout, (error, results, fields) => {
            if (error) {
              console.error('Error inserting data:', error);
              throw error;
            }
          
            console.log('Data inserted successfully. Insert ID:', results.insertId);
          });  
        res.status(201).send(receivedWorkout);
    } else {
        res.status(400).send();
    }
});


module.exports = workoutRouter;