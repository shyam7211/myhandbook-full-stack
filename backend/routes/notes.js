const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel');
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetctuser");


//Fetching all the notes using: GET "/api/notes/fetchallnotes". Doesn't require authentication
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user_id: req.user.user_id });
        console.log(req.user.user_name)
        res.json({ user: req.user.user_name, notes });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Creating notes for of a user using: POST "/api/notes/createnote". Doesn't require authentication
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title.").isLength({ min: 3 }),
    body("description", "Description must have minimum of 5 characters.").isLength({ min: 5 })],
    async (req, res) => {
        // For checking the error and telling about what is missing.
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { title, description, tag } = req.body;
        try {
            const note = await Note.create({ user_id: req.user.user_id, title, description, tag });
            res.json({ user: req.user.user_name, note });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });



module.exports = router;