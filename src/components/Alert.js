import React, { useContext } from 'react'
import alertContext from '../context/alert/alertContext';

export default function Alert() {
    const context = useContext(alertContext);
    const { alert } = context;

    const capitalize = (word) => {
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        alert && <div>
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}:</strong> {alert.msg}.
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>
        </div>
    )
}