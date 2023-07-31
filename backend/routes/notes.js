const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        taskFrom: "Called notes route."
    });
});

module.exports = router;