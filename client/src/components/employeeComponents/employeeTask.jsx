import React, { useEffect, useRef, useState } from 'react';
import classes from './employeeTask.module.css'
import { useCurrentMonthDays } from '../../customHooks/dates';
import myTask from '../../data/myTask';
import TaskCompletionChart from '../donut';

function EmployeeTask(props) {
    const [taskCompletion, setTaskCompletion] = useState(0);
    const [taskPending, setTaskPending] = useState(100);
    const [showSubTasks, setShowSubTasks] = useState(false);

    const targetRef = useRef(null);

    useEffect(() => {
        if (myTask) {
            const completedCount = myTask.subtasks.filter(t => t.isCompleted).length;
            const completedPercentage = Math.round((completedCount / myTask.subtasks.length) * 100);
            setTaskCompletion(completedPercentage);
            setTaskPending(100 - completedPercentage);
        }
    }, [myTask])
    useEffect(() => {
        if (showSubTasks && targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [showSubTasks]);
    const [year, month] = [new Date().getFullYear(), new Date().getMonth()];
    const { fullDate, todayDayName } = useCurrentMonthDays(month, year);

    const [expandedRow, setExpandedRow] = useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '0.5em', padding: '1em 0 0 2em' }}>
                <h1 style={{ fontSize: '1.5em', fontWeight: '700' }}>taskes</h1>
                <h1 style={{ fontSize: '1em', fontWeight: '500' }}>{todayDayName}, {fullDate}</h1>
            </div>
            <div className={classes.taskHome}>
                <TaskCompletionChart taskCompletion={taskCompletion} taskPending={taskPending} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1em',
                    padding: '2em 1em 2em 0.3em'
                }}>
                    <h3 style={{ fontSize: '1.3em', fontWeight: '500',textAlign: 'center' }}>{myTask.title}</h3>
                    <p style={{ textAlign: 'center', paddingTop: '0.5em' }}>{myTask.description}</p>
                    <p style={{ textAlign: 'center', paddingTop: '1.5em', fontWeight: '500' }}>Comment: {myTask.comments[0].text}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '1em', gap: '1em' }}>
                        <p style={
                            {
                                // marginLeft: '1em',
                                color: myTask?.status === "Progress" ? 'orange' :
                                    myTask?.status === "Completed" ? 'green' : 'inherit'
                            }
                        }>{myTask.status === 'Progress' ? 'In Progress' :
                            myTask.status === 'Completed' ? 'Completed' :
                                myTask.status === 'Assigned' ? 'Just Assigned' :
                                    myTask.status === 'Returned' ? 'Returned' : ''
                            }</p>
                        <button
                            onClick={() => {
                                setShowSubTasks(pre => !pre)
                            }}
                            style={{
                                height: '2.5em',
                                width: ' 8em',
                                fontSize: '1.2em',
                                // marginRight: '1em'
                            }}
                        >{showSubTasks ? 'Hide' : 'All Tasks'}</button>
                    </div>
                </div>
            </div>
            {showSubTasks && <div ref={targetRef} className={`${classes.subtaskes} ${showSubTasks && classes.subtaskesLive}`}>
                {myTask.subtasks.map(task => (
                    <div key={task._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p >{task.title}</p>
                        <p className={`${task.isCompleted && classes.completionCheck} ${classes.taskCheckBox}`}
                        >{task.isCompleted ? <i className="ri-checkbox-line"></i> : <i className={`ri-checkbox-blank-line`}></i>}</p>
                    </div>
                ))}
            </div>}
        </div >
    );
}


export default EmployeeTask;