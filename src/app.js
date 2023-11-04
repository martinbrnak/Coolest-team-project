const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const bodyParser = require("body-parser");
const connection = mysql.createConnection({
  host: 'database-1.cprkugnwm195.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'martinbrnak'
})
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const routes = require("./routes/spotify.js");

app.use("/spotify", routes);


connection.connect();


connection.end();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/labb2", (req, res) => {
  res.send("new endpoint");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});