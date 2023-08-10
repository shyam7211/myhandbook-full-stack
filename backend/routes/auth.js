const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetctuser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const ACCESS_TOKEN_KEY = '1@3$5^7*9)-+';
let success = false;

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
            return res.status(400).json({success, error: error.array() });
        }
        try {
            // Checking whether the user is existing with the email provided.
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, message: "User already exists with this mail." })
            }
            // Creating the user.
            const salt = await bcrypt.genSalt(10);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, salt)
            });

            const accessToken = jwt.sign({
                user: {
                    user_name: user.name,
                    user_id: user.id,
                    user_email: user.email
                }
            }, ACCESS_TOKEN_KEY);

            console.log(user);
            res.status(201).json({success: true, message: 'User created successfully', user, accessToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({success, error: 'Failed to create user' });
        }
    }
);

//Authenticate a user using: POST "/api/auth/login". Doesn't require authentication
router.post("/login", [
    body("email", "Invalid email address").isEmail(),
    body("password", "Password field is required.").exists(),
],
    async (req, res) => {
        // For checking the error and telling about what is missing.
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ success, error: error.array() });
        }
        const { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success, error: "Please enter valid credentials." });
        }
        const validpassword = await bcrypt.compare(password, user.password);
        console.log(password, user.password, validpassword);
        if (!validpassword) {
            return res.status(400).json({ success, error: "Please enter valid credentials." });
        }
        try {
            const accessToken = jwt.sign({
                user: {
                    user_name: user.name,
                    user_id: user.id,
                    user_email: user.email
                }
            }, ACCESS_TOKEN_KEY);

            console.log(user);
            res.status(201).json({ success: true, message: 'User logged in successfully', user, accessToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({success, error: 'Failed to login user' });
        }
    }
)


//Get loggedin user info using: POST "/api/auth/getuser". Require authentication
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const user = await User.findById(user_id).select("-password");
        res.json({success: true, user});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, error: 'Internal Server Error' });
    }
})

module.exports = router;
