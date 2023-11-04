const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const bodyParser = require("body-parser");
const connection = mysql.createConnection({
  host: 'database-1.cprkugnwm195.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'martinbrnak'
  // database: ''
})
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const routes = require("./routes/spotify.js");

app.use("/spotify", routes);


connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ' + error.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});

//connection.query('SELECT * FROM users', (error, results) => {
//  if (error) {
//    console.error('Error executing query: ' + error.stack);
//    return;
//  }
//  console.log('Query results:', results);
//});


connection.end((error) => {
  if (error) {
    console.error('Error closing the database connection: ' + error.stack);
    return;
  }
  console.log('Database connection closed.');
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/labb2", (req, res) => {
  res.send("new endpoint");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});