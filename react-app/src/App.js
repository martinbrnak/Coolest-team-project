const express = require('express');
const app = express();
const cors = require('cors');

const workoutRouter = require('./Workout.js');
const loginRouter = require('./Login.js');
const exerciseRouter = require('./Exercise.js')

app.use(cors());
app.use('/workout', workoutRouter);
app.use('/login', loginRouter);
app.use('/exercise', exerciseRouter)
app.use(express.json());

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server running on PORT: ' + PORT);
});

module.exports = app;