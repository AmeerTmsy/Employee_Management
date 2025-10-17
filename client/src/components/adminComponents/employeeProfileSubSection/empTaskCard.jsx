import React from 'react';

function EmpTaskCard({task, ind}) {
    return (
        <div key={ind} style={{ padding: '0.6em 1em', fontSize: '0.8em', display: 'flex', justifyContent: 'space-between'}}>
            <p>{task.title}</p>
            <p>{task.status ? "Completed": "Not Completed"}</p>
        </div>
    );
}

export default EmpTaskCard;