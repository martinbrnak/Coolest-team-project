const express = require("express");
const router = express.Router();



router.get("/plans", (req, res) => {
    try {
        
    res.send('this page is a placeholder for plans page');
}catch (error) {
    console.log(error);
}
});

module.exports = router;