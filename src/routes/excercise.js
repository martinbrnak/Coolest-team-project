const express = require("express");
const router = express.Router();
const axios = require('axios');



router.get("/excercise", (req, res) => {
    try {
        
        res.send('this page is a placeholder for excercise page');
}catch (error) {
    console.log(error);
}
axios.get('https://wger.de/api/v2/exercise/?limit=10')
  .then(response => {
    // Handle the response data
    console.log('wger.de API response:', response.data);

    // You can now use the 'response.data' variable to work with the fetched data
    // For example, iterate through the exercises and do something with each one
    response.data.results.forEach(exercise => {
      console.log('Exercise ID:', exercise.id);
      console.log('Exercise Name:', exercise.name);
      // Add more details as needed
    });
  })
  .catch(error => {
    // Handle errors during the request
    console.error('Error during wger.de API request:', error);
  });
});


module.exports = router;