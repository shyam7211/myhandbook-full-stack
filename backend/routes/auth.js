const express = require('express');
const User = require('../models/UserModel');
const router = express.Router();

//Create a user using: POST "/api/auth/register". Doesn't require authentication
router.post('/register', async (req, res) => {
    res.json(req.body);
    const user = await User.create(req.body);
    console.log(user);
})

module.exports = router;