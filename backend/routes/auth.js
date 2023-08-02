const express = require("express");
const User = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_KEY = '1@3$5^7*9)-+';

//Create a user using: POST "/api/auth/createuser". Doesn't require authentication
router.post("/createuser", [
    body("name").isLength({ min: 3 }).withMessage("Username is required"),
    body("email", "Invalid email address").isEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
        // For checking the error and telling about what is missing.
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        try {
            // Checking whether the user is existing with the email provided.
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).json({message: "User already exists with this mail."})
            }
            // Creating the user.
            const salt = await bcrypt.genSalt(10);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, salt)
            });

            const accessToken = jwt.sign({user:{
                user_id: user.id,
                user_email: user.email
            }}, ACCESS_TOKEN_KEY);
            
            console.log(user);
            res.status(201).json({ message: 'User created successfully', user, accessToken});
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
);

module.exports = router;
