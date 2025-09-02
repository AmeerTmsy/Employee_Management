import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCurrentMonthDays } from '../customHooks/dates';
import AdminHome from '../components/adminComponents/adminHome';
import EmployeeHome from '../components/employeeComponents/employeeHome';

function Home(props) {
    const today = new Date().toISOString().split("T")[0];
    const [year, month] = [new Date().getFullYear(), new Date().getMonth()];
    const { fullDate, todayDayName } = useCurrentMonthDays(month, year);
    const { login, user } = useSelector((state) => state.login)

    const [attendanceList, setAttendanceList] = useState([]);
    const [presence, setPresence] = useState(0);
    const [leaves, setLeaves] = useState(0);
    const [absence, setAbsence] = useState(0);

    useEffect(() => {
        const fetchAttendanceList = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/attendance`;
                const response = await axios.get(
                    url,
                    {
                        withCredentials: true,
                        headers: {
                            "ngrok-skip-browser-warning": "true"
                        }
                    }
                );
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
            att.records.map(day => {
                day.date === today && day.status === 'P' && setPresence(pre => pre += 1);
                day.date === today && day.status === 'L' && setLeaves(pre => pre += 1);
                day.date === today && day.status === 'X' && setAbsence(pre => pre += 1);
            })
        )
    }, [attendanceList])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '1em 0em 0em 0em' }}>
            <h1 style={{ marginTop: '1.5em', textAlign: 'center' }}>Welcome Back</h1>
            {user.userType === 'admin' && <AdminHome attendanceListLength={attendanceList.length} todayDayName={todayDayName} fullDate={fullDate} presence={presence} leaves={leaves} absence={absence} />}
            {user.userType === 'employee' && <EmployeeHome todayDayName={todayDayName} fullDate={fullDate} />}
        </div>
    );
}

export default Home;