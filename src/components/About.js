import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext);

    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            About is here for {a.state.name} who is in {a.state.class} class.
        </div>
    )
}

export default About;