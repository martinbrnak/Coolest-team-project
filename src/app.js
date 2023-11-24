const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const bodyParser = require("body-parser");
const connection = mysql.createConnection({
  host: 'database-1.cprkugnwm195.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'martinbrnak',
  database: 'Gym_Users'
});

const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const login = require("./routes/login.js");
const home = require("./routes/home.js");
const history = require("./routes/history.js");
const plans = require("./routes/plans.js");
const excercise = require("./routes/excercise.js");

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ' + error.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});

connection.query('SELECT * FROM users', (error, results) => {
  if (error) {
    console.error('Error executing query: ' + error.stack);
    return;
  }
  console.log('Query results:', results);
});


connection.end((error) => {
  if (error) {
    console.error('Error closing the database connection: ' + error.stack);
    return;
  }
  console.log('Database connection closed.');
});

// Middleware to redirect from root to "/login"
app.use((req, res, next) => {
  if (req.path === "/") {
    res.redirect(`http://localhost:${port}/login`);
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send('user should not access this');
});

app.get("/login", login);
app.get("/home", home);
app.get("/history", history);
app.get("/plans", plans);
app.get("/excercise", excercise);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});