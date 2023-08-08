import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "64cbrdd6fb8758f1d0b79697b",
            "user_id": "64ca695d5d2b1aef744df300",
            "title": "Title_01",
            "description": "Description of the title_01",
            "tag": "Personal",
            "date": "2023-08-03T17:01:35.532Z",
            "__v": 0
        },
        {
            "_id": "64cbdda4b875a8f1d0b796981",
            "user_id": "64ca695d5d2b1aef744df300",
            "title": "Title_02",
            "description": "Description of the title_02",
            "tag": "Personal",
            "date": "2023-08-03T17:02:28.365Z",
            "__v": 0
        },
        {
            "_id": "64cbdd6f0b8758f1d0b79697b",
            "user_id": "64ca695d5d2b1aef744df300",
            "title": "Title_01",
            "description": "Description of the title_01",
            "tag": "Personal",
            "date": "2023-08-03T17:01:35.532Z",
            "__v": 0
        },
        {
            "_id": "64cbdda4b8758f1d0b9796981",
            "user_id": "64ca695d5d2b1aef744df300",
            "title": "Title_02",
            "description": "Description of the title_02",
            "tag": "Personal",
            "date": "2023-08-03T17:02:28.365Z",
            "__v": 0
        },
        {
            "_id": "64cbdd6fb87458f1d0b79697b",
            "user_id": "64ca695d5d2b1aef744df300",
            "title": "Title_01",
            "description": "Description of the title_01",
            "tag": "Personal",
            "date": "2023-08-03T17:01:35.532Z",
            "__v": 0
        },
        {
            "_id": "64cbdda4b8758f1d40b796981",
            "user_id": "64ca695d5d2b1aef744df300",
            "title": "Title_02",
            "description": "Description of the title_02",
            "tag": "Personal",
            "date": "2023-08-03T17:02:28.365Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialNotes);

    //Add a note
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "64cbdda4b8758f1d40b796981",
            "user_id": "64ca695d5d2b1aef744df300",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-08-03T17:02:28.365Z",
            "__v": 0
        };
        console.log("Adding a note...");
        setNotes(notes.concat(note));
    }

    return (
        <NoteContext.Provider value={{notes, addNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;