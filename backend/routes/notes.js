const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel');
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetctuser");


//Fetching all the notes using: GET "/api/notes/fetchallnotes". Require authentication
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


//Creating notes for of a user using: POST "/api/notes/createnote". Require authentication
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


//Updating notes for of a user using: PUT "/api/notes/updatenote". Require authentication
router.put('/updatenote/:id', fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;
        let newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        try {
            const note = await Note.findById(req.params.id);
            if(!note){return res.status(404).json({error: "Note Not Found"})};

            if(note.user_id.toString() !== req.user.user_id){
                return res.status(401).json({error: "Unauthorized to update"})
            }

            const updatedNote = await Note.findByIdAndUpdate(
                req.params.id,
                newNote,
                {new: true}
            )
            console.log(updatedNote);
            res.json({message: "Note Updated", updatedNote})
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
)


//Deleting note for of a user using: DELETE "/api/notes/deletenote". Require authentication
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        
        try {
            const note = await Note.findById(req.params.id);
            if(!note){return res.status(404).json({error: "Note Not Found"})};

            if(note.user_id.toString() !== req.user.user_id){
                return res.status(401).json({error: "Unauthorized to update"})
            }

            const deletedNote = await Note.findByIdAndDelete(req.params.id);
            res.json({message: "Note Deleted", deletedNote})
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
)


module.exports = router;