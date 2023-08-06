import { useState } from "react";
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const s1 = {
        "name": "Shyam",
        "class": "7C"
    };
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Ram",
                "class": "2C"
            })
        }, 1100);
    }
    return (
        <NoteContext.Provider value={{state, update}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;