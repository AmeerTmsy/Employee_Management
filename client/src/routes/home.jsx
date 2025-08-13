import axios from 'axios';
import React, { useEffect, useState } from 'react';

import employeeAttendanceData from '../data/empAttendence'

function Home(props) {

    const [employeesCount, setEmployeesCount] = useState(0);
    const [leaveCount, setLeaveCount] = useState(0);
    const today = new Date().toISOString().split('T')[0];


    useEffect(() => {
        let absantCount = 0;
        employeeAttendanceData?.map(emp => {
            // if (emp.records.date === today && emp.records.status === 'L') 
            emp.records.map(record => record.date === today && record.status === 'L' && absantCount++)
        })
        setLeaveCount(absantCount)

    }, [today, employeeAttendanceData])
    useEffect(() => {
        axios.get(`http://localhost:3000/employees/count`, { withCredentials: true })
            .then(res => setEmployeesCount(res.data.employeesCount))
            .catch(error => console.log(error))
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <h1 style={{ marginTop: '5em', textAlign: 'center' }}>Welcome Back</h1>
            <div className='home1'>
                <div className='totalEmployees'>
                    <p>{employeesCount}</p>
                    <p>total number of employees</p>
                </div>
                <div className='leaveOfEmployees'>
                    <p>{leaveCount}</p>
                    <p>total number of leaves</p>
                </div>
            </div>
        </div>
    );
}

export default Home;