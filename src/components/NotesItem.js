import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';

const NotesItem = (props) => {
    const { title, description } = props.note;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const alertcontext = useContext(alertContext);
    const {showAlert} = alertcontext;

    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title me-auto">{title}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {props.updateNote(props.note)}}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(props.note._id); showAlert('Successfully Note Deleted','success')}}></i>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NotesItem
