import React from 'react';
import classes from './projectCard.module.css';

function ProjcetCard({ project, idx }) {
    return (
        <div key={idx} className={`${classes.projectkRow} ${idx % 2 === 0 && classes.oddRowStyle}`}>
            <p>{idx+1}.&nbsp;{project.name}</p>
            <p>{project.deadline.split("T")[0]}{/* &nbsp;&nbsp;<i style={{color: `${project.status === 'Completed' && 'green'}`}} className={`${project.status === 'Completed' ? 'ri-checkbox-line': 'ri-checkbox-blank-line'}`}></i> */}</p>
            <p>{project.status}</p>
        </div>
    );
}

export default ProjcetCard;