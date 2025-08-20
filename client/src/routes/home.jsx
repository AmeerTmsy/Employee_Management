import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useCurrentMonthDays } from '../customHooks/dates';

function Home(props) {
    const today = new Date().toISOString().split("T")[0];
    const [year, month] = [new Date().getFullYear(), new Date().getMonth()];
    const { fullDate, todayDayName } = useCurrentMonthDays(month, year);

    const [attendanceList, setAttendanceList] = useState([]);
    const [presence, setPresence] = useState(0);
    const [leaves, setLeaves] = useState(0);
    const [absence, setAbsence] = useState(0);
    
    useEffect(() => {
        const fetchAttendanceList = async () => {
            try {
                const url = `http://localhost:3000/attendance`;
                const response = await axios.get(url, { withCredentials: true });
                setAttendanceList(response?.data.attendance);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };
        fetchAttendanceList();
    }, [])

    useEffect(() => {
        setPresence(0);
        setLeaves(0);
        setAbsence(0);
        if (attendanceList) attendanceList.map(att =>
            att.records.map(day =>{
                day.date === today && day.status === 'P' && setPresence(pre => pre += 1);
                day.date === today && day.status === 'L' && setLeaves(pre => pre += 1);
                day.date === today && day.status === 'X' && setAbsence(pre => pre += 1);
            })
        )
    }, [attendanceList])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <h1 style={{ marginTop: '5em', textAlign: 'center' }}>Welcome Back</h1>
            <div className='home1'>
                <Link to={'/employees'} className='totalEmployees'>
                    <p>{attendanceList?.length}</p>
                    <p>total number of employees</p>
                </Link>
                <Link to={'/attendance'} className='leaveOfEmployees'>
                    <div>
                        <p>{todayDayName ? todayDayName : 'Today'},</p>
                        <p>{fullDate && fullDate}</p>
                    </div>
                    <div>
                        <p className='presenceStyle'>{presence}</p>
                        <p>Presence</p>
                    </div>
                    <div>
                        <p className='leavesStyle'>{leaves}</p>
                        <p>Leaves</p>
                    </div>
                    <div>
                        <p className='absenceStyle'>{absence}</p>
                        <p>Absence</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;