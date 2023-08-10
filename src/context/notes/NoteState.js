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

        console.log(response,"-");
        const json = await response.json()
        const note = json.note
        console.log("Adding a note...", json.note);
        setNotes(notes.concat(note));
    }


// Delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfbmFtZSI6ImFkbWluNyIsInVzZXJfaWQiOiI2NGNhNjk1ZDVkMmIxYWVmNzQ0ZGYzMDAiLCJ1c2VyX2VtYWlsIjoiYWRtaW43QGdtYWlsLmNvbSJ9LCJpYXQiOjE2OTEwODI1Njh9.i_OazyoCChmuZrH8KaNw6ZRGYMeM2X59EOAhEzithK0'
            }
        });

        const json = await response.json();
        console.log(json);
        console.log('the notes', notes);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


// Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfbmFtZSI6ImFkbWluNyIsInVzZXJfaWQiOiI2NGNhNjk1ZDVkMmIxYWVmNzQ0ZGYzMDAiLCJ1c2VyX2VtYWlsIjoiYWRtaW43QGdtYWlsLmNvbSJ9LCJpYXQiOjE2OTEwODI1Njh9.i_OazyoCChmuZrH8KaNw6ZRGYMeM2X59EOAhEzithK0'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log('--' + json);

        const updatedNote = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < updatedNote.length; index++) {
            const element = updatedNote[index];
            if (element._id === id) {
                updatedNote[index].title = title;
                updatedNote[index].description = description;
                updatedNote[index].tag = tag;
                break;
            }
        }
        setNotes(updatedNote);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, getNotes, editNote, deleteNote }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;