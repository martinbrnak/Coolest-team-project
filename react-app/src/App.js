const express = require('express');
const app = express();
const cors = require('cors');

const workoutRouter = require('./Workout.js');
const loginRouter = require('./Login.js');

app.use(cors());
app.use('/workout', workoutRouter);
app.use('/login', loginRouter);
app.use(express.json());

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server running on PORT: ' + PORT);
});