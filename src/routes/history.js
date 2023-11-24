const express = require("express");
const router = express.Router();



router.get("/history", (req, res) => {
    try {
        
    res.send('this page is a placeholder for history page');
}catch (error) {
    console.log(error);
}
});

module.exports = router;