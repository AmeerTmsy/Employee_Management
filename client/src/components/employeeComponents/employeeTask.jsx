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
            {/* <div style={{ marginTop: '0.5em', padding: '1em 0 0 2em' }}>
                <h1 style={{ fontSize: '1.5em', fontWeight: '700' }}>tasks</h1>
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
            </div>} */}

            <div>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '0 0em', marginBottom: '0.3em' }}>
                    <div className={`${classes.taskRow} ${classes.taskRowHeader}`}>
                        <div>Today</div>
                        <div className={classes.taskRowCell}>DUE DATE</div>
                        <div className={classes.taskRowCell}>STAGE</div>
                        <div className={classes.taskRowCell}>PRIORITY</div>
                        <div className={classes.taskRowCell}>TEAM</div>
                        <div className={classes.taskRowCell}>ASSIGNED</div>
                    </div>
                    {
                        tasks.map(task => (
                            <div className={classes.taskRow}>
                                <div style={{display: 'flex', alignItems: 'center'}}><i style={{ paddingRight: '0.5em', color: 'gray' }} className="ri-checkbox-blank-circle-line"></i>{task.tastTitle}</div>
                                <div className={classes.taskRowCell}>{task.date}</div>
                                <div className={classes.taskRowCell}> <span className={`${classes.cellSpanStyle} ${classes.cellStageSpanStyle}`}>{task.stage}</span></div>
                                <div className={classes.taskRowCell}> <span className={`${classes.cellSpanStyle} ${classes.cellPriorityStyle}`}>{task.priority}</span></div>
                                <div className={classes.taskRowCell}>{task.team}</div>
                                <div className={classes.taskRowCell}> <img style={{width: '30px', borderRadius: '25px'}} src={task.profile} alt="profile image" /> </div>
                            </div>
                        ))
                    }
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '0 0em', marginBottom: '0.3em' }}>
                    <div className={`${classes.taskRow} ${classes.taskRowHeader}`}>
                        <div>Tomorrow</div>
                        <div className={classes.taskRowCell}>DUE DATE</div>
                        <div className={classes.taskRowCell}>STAGE</div>
                        <div className={classes.taskRowCell}>PRIORITY</div>
                        <div className={classes.taskRowCell}>TEAM</div>
                        <div className={classes.taskRowCell}>ASSIGNED</div>
                    </div>
                    {
                        tasks.map(task => (
                            <div className={classes.taskRow}>
                                <div style={{display: 'flex', alignItems: 'center'}}><i style={{ paddingRight: '0.5em', color: 'gray' }} className="ri-checkbox-blank-circle-line"></i>{task.tastTitle}</div>
                                <div className={classes.taskRowCell}>{task.date}</div>
                                <div className={classes.taskRowCell}> <span className={`${classes.cellSpanStyle} ${classes.cellStageSpanStyle}`}>{task.stage}</span></div>
                                <div className={classes.taskRowCell}> <span className={`${classes.cellSpanStyle} ${classes.cellPriorityStyle}`}>{task.priority}</span></div>
                                <div className={classes.taskRowCell}>{task.team}</div>
                                <div className={classes.taskRowCell}> <img style={{width: '30px', borderRadius: '25px'}} src={task.profile} alt="profile image" /> </div>
                            </div>
                        ))
                    }
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '0 0em', marginBottom: '0.3em' }}>
                    <div className={`${classes.taskRow} ${classes.taskRowHeader}`}>
                        <div>This week</div>
                        <div className={classes.taskRowCell}>DUE DATE</div>
                        <div className={classes.taskRowCell}>STAGE</div>
                        <div className={classes.taskRowCell}>PRIORITY</div>
                        <div className={classes.taskRowCell}>TEAM</div>
                        <div className={classes.taskRowCell}>ASSIGNED</div>
                    </div>
                    {
                        tasks.map(task => (
                            <div className={classes.taskRow}>
                                <div style={{display: 'flex', alignItems: 'center'}}><i style={{ paddingRight: '0.5em', color: 'gray' }} className="ri-checkbox-blank-circle-line"></i>{task.tastTitle}</div>
                                <div className={classes.taskRowCell}>{task.date}</div>
                                <div className={classes.taskRowCell}> <span className={`${classes.cellSpanStyle} ${classes.cellStageSpanStyle}`}>{task.stage}</span></div>
                                <div className={classes.taskRowCell}> <span className={`${classes.cellSpanStyle} ${classes.cellPriorityStyle}`}>{task.priority}</span></div>
                                <div className={classes.taskRowCell}>{task.team}</div>
                                <div className={classes.taskRowCell}> <img style={{width: '30px', borderRadius: '25px'}} src={task.profile} alt="profile image" /> </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
}


export default EmployeeTask;



const tasks = [
    {
        tastTitle: 'Finish monthly reporting',
        date: 'Today',
        stage: 'In progress',
        priority: 'high',
        team: 'Marketing',
        profile: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580'
    },
    {
        tastTitle: 'Finish monthly reporting',
        date: 'Today',
        stage: 'In progress',
        priority: 'high',
        team: 'Poeration',
        profile: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870'
    },
    {
        tastTitle: 'Finish monthly reporting',
        date: 'Today',
        stage: 'In progress',
        priority: 'high',
        team: 'Customer Care',
        profile: 'https://images.unsplash.com/photo-1676115405660-5720eb0fb20c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580'
    },
]