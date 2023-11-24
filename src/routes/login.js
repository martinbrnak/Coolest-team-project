const express = require("express");
const router = express.Router();



router.get("/login", (req, res) => {
  try {
    const login = [
      'This will show login page',
      'Username',
      'Password',
    ];

    res.status(200).json(login);
  } catch (error) {
    console.log(error);
  }
});

//
//Post method
//

// router.post("/songs", (req, res) => {
//   try {
//     // POST DATA TO MONGODB
//   } catch (err) {
//     console.log(err);
//   }
// });
//
module.exports = router;