import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import classes from './employeeAttendance.module.css'
import 'react-calendar/dist/Calendar.css';

const attendances = {
    employeeId: 'EMP001',
    name: 'Ravi Sharma',
    records: [
        { date: '2025-08-30', status: 'P' },
        { date: '2025-08-31', status: 'P' },
        { date: '2025-09-01', status: 'P' },
        { date: '2025-09-02', status: 'L' },
        { date: '2025-09-03', status: 'X' },
        { date: '2025-09-04', status: 'P' },
        { date: '2025-09-05', status: 'HP' },
        { date: '2025-09-06', status: 'P' },
        { date: '2025-09-07', status: 'P' },
        { date: '2025-09-08', status: 'X' },
        { date: '2025-09-09', status: 'L' },
        { date: '2025-09-10', status: 'L' },
        { date: '2025-09-11', status: 'L' },
        { date: '2025-09-12', status: 'L' },
        { date: '2025-09-13', status: 'L' },
    ],
    totalP: 4,
    totalHP: 1,
    totalX: 2,
    totalL: 2
}

function EmployeeAttendance(props) {
    // const [value, onChange] = useState(new Date(2025, 7, 1));
    const [value, onChange] = useState(new Date());
    const changes = (value, event) => {
        console.log();
        console.log("value: ", value, " event: ", event);
    }

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const record = attendances.records.find(r => new Date(r.date).toDateString() === date.toDateString());
            if (record) {
                if (record.status === 'X') return classes.absent;   // red
                if (record.status === 'P') return classes.present;  // green
                if (record.status === 'L') return classes.leave;    // orange
                if (record.status === 'HP') return classes.halfPresent; // light green
            } else {
                return classes.normalDayStyle
            }
        }
        return null;
    };
    return (
        <div className={classes.myAttendance}>
            <h1 style={{ padding: '1em', }}>My Attendance</h1>
            <div className={classes.calendarWrapper}>
                <Calendar
                    onChange={onChange}
                    // value={value}
                    onClickDay={changes}
                    tileClassName={tileClassName}
                />
            </div>
        </div>
    );
}

export default EmployeeAttendance;