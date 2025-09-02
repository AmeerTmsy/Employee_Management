import React, { useState } from 'react';
import { useCurrentMonthDays } from '../../customHooks/dates';
import classes from './adminTaskes.module.css'
import TaskRowCard from '../taskRowCard';
import assignedTasks from '../../data/tasks';
import NewTaskModalForm from './newTaskModalForm';

function AdminTask(props) {
    const today = new Date().toISOString().split("T")[0];
    const [year, month] = [new Date().getFullYear(), new Date().getMonth()];
    const { fullDate, todayDayName } = useCurrentMonthDays(month, year);

    const [expandedRow, setExpandedRow] = useState(null);
    const [addNewModal, setAddNewModal] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {addNewModal &&
                <NewTaskModalForm setAddNewModal={setAddNewModal} />
            }
            <div style={{ marginTop: '0.2em', padding: '1em 0 0 2em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5em', fontWeight: '700' }}>taskes</h1>
                    <h1 style={{ fontSize: '1em', fontWeight: '500' }}>{todayDayName}, {fullDate}</h1>
                </div>
                <button style={{ marginRight: '2.5em', padding: '0.5em 3em' }} onClick={() => setAddNewModal(true)}>Add +</button>
            </div>
            <div className={classes.taskHome}>
                < div className={`${classes.taskRow, classes.taskTitle}`}>
                    <h4>Task</h4>
                    <h4 className={classes.taskCrew}>Crew</h4>
                    <h4>Task Status</h4>
                </div>
                {assignedTasks.length ?
                    assignedTasks.map((task, idx) =>
                        <TaskRowCard
                            task={task}
                            key={idx}
                            idx={idx}
                            expanded={expandedRow === idx}
                            onExpand={() =>
                                setExpandedRow(expandedRow === idx ? null : idx)
                            }
                        />)
                    :
                    <h6 style={{ textAlign: 'center', paddingTop: '3em' }}>loading.....</h6>
                }
                <div style={{ padding: '0.31em 0' }}></div>
            </div>

        </div >
    );
}

export default AdminTask;