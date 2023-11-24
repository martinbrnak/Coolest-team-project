const express = require("express");
const router = express.Router();



router.get("/home", (req, res) => {
    try {
        
    res.send('this page is a placeholder for home page');
}catch (error) {
    console.log(error);
}
});

module.exports = router;