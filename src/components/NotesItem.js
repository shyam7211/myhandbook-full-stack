import React from 'react'

const NotesItem = (props) => {
    const { title, description } = props.note;
    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title me-auto">{title}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2"></i>
                        <i className="fa-solid fa-trash mx-2"></i>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NotesItem
