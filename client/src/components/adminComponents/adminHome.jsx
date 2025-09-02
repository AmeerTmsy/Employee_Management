import React from 'react';
import { Link } from 'react-router-dom';
import classes from './adminHome.module.css'
import AttendanceCartHome from './attendanceCartHome';

function AdminHome({ attendanceListLength, todayDayName, fullDate, presence, leaves, absence }) {
    return (
        <div>
            <div className={classes.home1}>
                <Link to={'admin/employees'} className={classes.totalEmployees}>
                    <p>{attendanceListLength}</p>
                    <p>total number of employees</p>
                </Link>
                <Link to={'admin/projects'} className={classes.totalEmployees}>
                    <p>{'5'}</p>
                    <p>Active Projects</p>
                </Link>
                <Link to={'admin/leave'} className={classes.totalEmployees}>
                    <p>{'2'}</p>
                    <p>Total leaves this month</p>
                </Link>
            </div>
            <div className={classes.home1} style={{alignItems: 'center'}}>
                <AttendanceCartHome />
                <div className={classes.totalEmployees} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '1em', marginRight: '1em'}}> 
                    <div>
                        <p>{'Sike leave - '}{'2'}</p>
                    </div>
                    <div>
                        <p>{'Casual leave - '}{'2'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;