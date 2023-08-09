import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const host = "http://localhost:5000/api/";

    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);


// Fetching all the notes.
    const getNotes = async () => {
        const response = await fetch(`${host}notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfbmFtZSI6ImFkbWluNyIsInVzZXJfaWQiOiI2NGNhNjk1ZDVkMmIxYWVmNzQ0ZGYzMDAiLCJ1c2VyX2VtYWlsIjoiYWRtaW43QGdtYWlsLmNvbSJ9LCJpYXQiOjE2OTEwODI1Njh9.i_OazyoCChmuZrH8KaNw6ZRGYMeM2X59EOAhEzithK0'
            }
        });
        const json = await response.json();
        console.log(json.notes);
        setNotes(json.notes)
    }


//Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfbmFtZSI6ImFkbWluNyIsInVzZXJfaWQiOiI2NGNhNjk1ZDVkMmIxYWVmNzQ0ZGYzMDAiLCJ1c2VyX2VtYWlsIjoiYWRtaW43QGdtYWlsLmNvbSJ9LCJpYXQiOjE2OTEwODI1Njh9.i_OazyoCChmuZrH8KaNw6ZRGYMeM2X59EOAhEzithK0'
            },
            body: JSON.stringify({ title, description, tag })
        });

        console.log(response + "-");
        // const note = {
        //     "_id": "64cbdda4b8758f1d40b796981",
        //     "user_id": "64ca695d5d2b1aef744df300",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2023-08-03T17:02:28.365Z",
        //     "__v": 0
        // };
        // console.log("Adding a note...");
        // setNotes(notes.concat(note));
    }


// Delete a note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


// Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfbmFtZSI6ImFkbWluNyIsInVzZXJfaWQiOiI2NGNhNjk1ZDVkMmIxYWVmNzQ0ZGYzMDAiLCJ1c2VyX2VtYWlsIjoiYWRtaW43QGdtYWlsLmNvbSJ9LCJpYXQiOjE2OTEwODI1Njh9.i_OazyoCChmuZrH8KaNw6ZRGYMeM2X59EOAhEzithK0'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = response.json();
        console.log('--' + json);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, getNotes, editNote, deleteNote }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;