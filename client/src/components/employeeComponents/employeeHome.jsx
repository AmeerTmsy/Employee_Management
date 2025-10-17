import React, { useEffect, useState } from 'react';
import classes from "./employeeHome.module.css"
import axios from 'axios';
import { getDistance } from 'geolib';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

function EmployeeHome({ todayDayName, fullDate }) {
    const [punchin, setPunchin] = useState(false);
    const [allowedIPA, setAllowedIPA] = useState(false);
    const [isInLocation, setIsInLocation] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());



    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    }, [currentTime]);

    const formattedTime = currentTime.toLocaleTimeString();

    useEffect(() => {
        const officeCoords = { latitude: 10.988326, longitude: 76.225535 };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("latitude: ", position.coords.latitude, "\nlongitude: ", position.coords.longitude,);
                    var dis = getDistance(
                        officeCoords,
                        { latitude: position.coords.latitude, longitude: position.coords.longitude },
                    );
                    console.log(`Distance: `, dis, ` meters`);
                    if (dis < 10) {
                        console.log(dis)
                        setIsInLocation(true)
                        console.log(isInLocation)
                    }
                    else setIsInLocation(false)
                },
                (err) => {
                    console.log(err.message)
                }
            )
        } else {
            console.log("Geolocation is not supported by your browser.");
        }
    }, [])


    const hangelAttendance = () => {
        setPunchin(pre => !pre)
    }
    return (
        <>
            <div className={classes.home}>
                {/* <div to={'/'} className={`${classes.employeePunch} ${punchin ? classes.punchOn : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1em', position: 'relative' }}>
                    <p>{punchin ?
                        <i className={`ri-emotion-happy-line ${classes.punchIcon} ${classes.punchIconSmile}`}></i>
                        :
                        <i className={`ri-emotion-normal-line ${classes.punchIcon}`}></i>
                    }</p>
                    <p >{todayDayName}, {fullDate}</p>
                </div>
                <div>
                    <button disabled={!isInLocation} className={`${classes.punchBtn} ${punchin ? classes.punchBtnOn : ""}`} onClick={hangelAttendance}>{punchin ? 'Off' : 'On'}</button>
                </div>
                {isInLocation === false && <span style={{ fontSize: '0.8em', position: 'absolute', bottom: '2px', left: '50%', color: 'red', transform: 'translate(-50%, -170%)' }}>You have to be in office to mark you attendance</span>}
            </div> */}
                <div className={classes.firstRow}>
                    <div className={classes.firstRowChaild}>
                        <div className={classes.calendar}>
                            <Calendar onChange={onChange} value={value} />
                        </div>
                    </div>
                    <div className={classes.firstRowChaild}>
                        <div className={classes.tasks}>
                            <div className={classes.tasksHead}>
                                <h4 style={{fontWeight: '500'}}>{`My Tasks (10)`}</h4>
                                <p><i class="ri-more-2-fill"></i></p>
                            </div>
                            {taskss.map(task_ => <TaskCardss task_={task_} />)}
                        </div>
                    </div>
                    <div className={classes.firstRowChaild} style={{ flexDirection: 'column', justifyContent: 'space-between', padding: '0 0.5em' }}>
                        <div className={classes.comments} style={{}}>
                            <div className={classes.commentHead}>
                                <h4 style={{fontWeight: '500'}}>{`New Comments`}</h4>
                            </div>
                            <div>
                                <div >
                                    {commentss.map(comment_ => <CommentCardss comment_={comment_} />)}
                                </div>
                                <div style={{ fontSize: '0.8em', fontWeight: '500' }}><span> + Add</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.home}>
                {/*  */}
                <div className={classes.firstRow}>
                    <div className={classes.firstRowChaild} style={{ flexDirection: 'column', justifyContent: 'space-between', padding: '0 0.5em' }}>
                        <div className={classes.comments} style={{}}>
                            <div className={classes.commentHead}>
                                <h4>Categories</h4>
                            </div>
                            <div>
                                <div>
                                    <div className={classes.commentRowData}>
                                        <p><span style={{ fontWeight: '400', fontSize: '0.9em' }}>{"Projects"}</span></p>
                                    </div>
                                    <div className={classes.commentRowData}>
                                        <p><span style={{ fontWeight: '400', fontSize: '0.9em' }}>{"Projects"}</span></p>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.8em', fontWeight: '500' }}>+ Add more</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.firstRowChaild}>
                        <div className={classes.tasks}>
                            <div className={classes.tasksHead}>
                                <h4 style={{fontWeight: '500'}}>{`My Traking`}</h4>
                                <p><i class="ri-more-2-fill"></i></p>
                            </div>
                            <div>
                                <div className={classes.taskRowData} style={{ fontSize: '0.8em' }}>
                                    <p><span style={{ paddingRight: '0.5em' }}><i className="ri-timer-line"></i></span> <span>{"Create wireframe"}</span></p>
                                    <p>{'10m 30s'} <span><i style={{ padding: '0 0.5em' }} className="ri-play-mini-fill"></i></span> <span><i className="ri-more-2-fill"></i></span></p>
                                </div>
                            </div>
                            <div>
                                <div className={classes.taskRowData} style={{ fontSize: '0.8em' }}>
                                    <p><span style={{ paddingRight: '0.5em' }}><i className="ri-timer-line"></i></span> <span>{"Create wireframe"}</span></p>
                                    <p>{'10m 30s'} <span><i style={{ padding: '0 0.5em' }} className="ri-play-mini-fill"></i></span> <span><i className="ri-more-2-fill"></i></span></p>
                                </div>
                            </div>
                            <div>
                                <div className={classes.taskRowData} style={{ fontSize: '0.8em' }}>
                                    <p><span style={{ paddingRight: '0.5em' }}><i className="ri-timer-line"></i></span> <span>{"Create wireframe"}</span></p>
                                    <p>{'10m 30s'} <span><i style={{ padding: '0 0.5em' }} className="ri-play-mini-fill"></i></span> <span><i className="ri-more-2-fill"></i></span></p>
                                </div>
                            </div>
                            <div>
                                <div className={classes.taskRowData} style={{ fontSize: '0.8em' }}>
                                    <p><span style={{ paddingRight: '0.5em' }}><i className="ri-timer-line"></i></span> <span>{"Create wireframe"}</span></p>
                                    <p>{'10m 30s'} <span><i style={{ padding: '0 0.5em' }} className="ri-play-mini-fill"></i></span> <span><i className="ri-more-2-fill"></i></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.firstRowChaild} style={{ flexDirection: 'column', justifyContent: 'space-between', padding: '0 0.5em' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', background: 'rgba(235, 235, 235, 2.7)' }}>
                            <p style={{fontWeight: '700'}}>{formattedTime}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                                <button className={classes.punchInOutBtn}>Punch Out <i style={{ fontSize: '1.5em' }} className="ri-pause-circle-line"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default EmployeeHome;



const taskss = [
    {
        name: 'task 1',
        day: 'today',
        status: 'completed'
    },
    {
        name: 'task 2',
        day: 'today',
        status: 'working'
    },
    {
        name: 'task 1',
        day: 'today',
        status: 'completed'
    },
    {
        name: 'task 2',
        day: 'today',
        status: 'working'
    },
    {
        name: 'task 3',
        day: 'tomorrow',
        status: 'working'
    },
]
const commentss = [
    {
        commentText: 'Comment 1',
        day: 'today',
        description: 'This is a sample description for the comment',
        status: 'accept'
    },
    // {
    //     commentText: 'Comment 2',
    //     day: 'today',
    //     description: 'This is a sample description for the comment',
    //     status: 'accept'
    // },
    {
        commentText: 'Comment 3',
        day: 'tomorrow',
        description: 'This is a sample description for the comment',
        status: 'pending'
    },
]

function TaskCardss({ task_ }) {
    return (
        <div>
            <div className={classes.taskRowData}>
                <p><span><i
                    className={`${task_.status === 'completed' ? 'ri-checkbox-circle-fill' : "ri-checkbox-blank-circle-line"} ${task_.status === 'completed' && classes.completedTask}`}
                ></i></span> <span>{task_.commentText}</span></p>
                <p style={{ fontSize: '0.9em', color: task_.day === 'today' ? '#c1b334ff' : 'gray' }}>{task_.day}</p>
            </div>
        </div>
    );
}
function CommentCardss({ comment_ }) {
    return (
        <div className={classes.commentRowData}>
            <div>
                <p><span style={{ fontWeight: '500', fontSize: '0.9em' }}>{comment_.commentText}</span></p>
                <p><Link><i className="ri-arrow-right-s-line"></i></Link></p>
            </div>
            <div style={{ fontSize: '0.8em', fontWeight: '400', paddingTop: '0.3em' }}>
                <p>{comment_.description}</p>
            </div>
        </div>
    );
}
