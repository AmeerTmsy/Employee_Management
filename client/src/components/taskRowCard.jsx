import React, { useState } from 'react';
import classes from './taskRowCard.module.css'

function TaskRowCard({ task, idx, expanded, onExpand }) {

    const [taskStatus, setTaskStatus] = useState(task.status === "Completed");

    const changeTaskStatus = () => {
        console.log('employee,', task.crew);
        console.log('status,', task.status);
        setTaskStatus(!taskStatus);
    }

    const toggleRow = () => {
        setExpanded(!expanded);
    };

    return (
        < div onClick={onExpand} key={idx} className={`${classes.taskRow} ${idx % 2 === 0 && classes.oddRowStyle} ${expanded ? classes.expanded : ""}`}>
            <p>{task.task}</p>
            <p className={classes.taskCrew}>
                {task.crew.map((member, i) => (
                    <span key={i}>{member.name}{i < task.crew.length - 1 && ", "}</span>
                ))}
            </p>
            <p className={classes.taskStat}>{task.status}<i
                onClick={changeTaskStatus}
                style={{
                    color: `${taskStatus ? 'green' : task.status === 'Returned' ? 'red' : 'black'}`,
                    paddingLeft: '5px'
                }}
                className={`ri-checkbox${taskStatus ? "" : '-blank'}-line`}></i>
            </p>
            {expanded && (
                <div style={{paddingTop: '1em'}}>
                    <p style={{ borderLeft: '1px solid gray', paddingLeft: '10px', position: 'relative' }}>
                        {/* <span style={{ display: 'inline-block', width: '5px', height: '5px', backgroundColor: 'black', position: 'absolute', top: '0px', left: '-3px', borderRadius: '50%'}}></span> */}
                        hello<br />hello<br />hello<br />hello<br />hello<br />hello<br />
                        {/* <span style={{ display: 'inline-block', width: '5px', height: '5px', backgroundColor: 'black', position: 'absolute', bottom: '0px', left: '-3px', borderRadius: '50%'}}></span> */}
                    </p>
                </div>
            )}
        </div>
    );
}

export default TaskRowCard;