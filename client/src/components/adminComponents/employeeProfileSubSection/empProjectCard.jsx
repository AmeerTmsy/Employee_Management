import React from 'react';

function EmpProjectCard({project, ind}) {
    return (
        <div key={ind} style={{ padding: '0.6em 1em', fontSize: '0.8em', display: 'flex', justifyContent: 'space-between'}}>
            <p>{project.name}</p>
            <p>{project.status}</p>
        </div>
    );
}

export default EmpProjectCard;