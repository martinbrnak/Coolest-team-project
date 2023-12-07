const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
    host: 'database-1.cprkugnwm195.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'martinbrnak',
    database: 'Gym_Users'  
});


const loginRouter = express.Router();
loginRouter.use(cors());
loginRouter.use(express.json());

loginRouter.post('/', (req, res, next) => {
    console.log('received post request for ', req.body);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
    
        console.log('Connected to the database');
    })


    connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], (error, results, fields) => {
        if (error) {
            res.status(500).send();
            return;
        } 
        console.log(results);
        if (results.length > 0) {
            const user = results[0];
            res.send(user);
        } else {
            const user = {
                // id: 2,
                username: req.body.name,
                email: req.body.email,
                // password: null,
                // oauth_provider: 'google',
                // oauth_id: '??',
                created_at: req.body.updated_at,
            };
            connection.query('INSERT INTO users SET ?', [user], (error, results, fields) => {
                if (error) {
                    res.status(500).send();
                    return;
                }
                console.log(results);
                if (results && results.affectedRows > 0) {
                    res.send(req.body);
                } else {
                    res.status(404).send('User not inserted');
                }
            })
        }

    })
})



module.exports = loginRouter;