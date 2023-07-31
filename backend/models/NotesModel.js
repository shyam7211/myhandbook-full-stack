const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is mandatory to fill."]
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Notes', notesSchema);