const express = require('express');
const router = express.Router();

router.get("/", (req,res) => {
    res.json({
        taskCall: "router from auth.js"
    });
})

module.exports = router;