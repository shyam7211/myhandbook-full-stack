import React, { useContext } from 'react'
import NotesItem from './NotesItem'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Story</h2>
                {notes.map((note) => {
                    return (
                        <NotesItem key={note._id} note={note} />
                    )
                })}
            </div>
        </>
    )
}

export default Notes
