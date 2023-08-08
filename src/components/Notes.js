import React, { useContext } from 'react'
import NotesItem from './NotesItem'
import noteContext from '../context/notes/noteContext'

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div className="row my-3">
            <h2>Your Story</h2>
            {notes.map((note) => {
                return (
                    <NotesItem note={note} />
                )
            })}
        </div>
    )
}

export default Notes
