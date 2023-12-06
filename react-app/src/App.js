const express = require('express');
const app = express();

const workoutRouter = require('./Workout.js');

app.use('/workout', workoutRouter);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server running on PORT: ' + PORT);
});