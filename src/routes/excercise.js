const express = require("express");
const router = express.Router();



router.get("/excercise", (req, res) => {
    try {
        
    res.send('this page is a placeholder for excercises page');
}catch (error) {
    console.log(error);
}
});

module.exports = router;