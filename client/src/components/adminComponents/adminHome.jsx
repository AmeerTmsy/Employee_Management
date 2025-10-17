import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './adminHome.module.css'
import AttendanceCartHome from './attendanceCartHome';
import axios from 'axios';

function AdminHome({ attendanceListLength, todayDayName, fullDate, presence, leaves, absence }) {
    const [datas, setDatas] = useState({
        totalEmployees: 0, activeProjects: 0, totalLeaves: 0, leaveTypes: {}
    });

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const url = import.meta.env.VITE_API_URL;
                const [employeesResponse, projectsResponse, attendanceResponse, leaveTypeResponse] = await Promise.all([
                    axios.get(`${url}/employees/count`, { withCredentials: true }),
                    axios.get(`${url}/project/count`, { withCredentials: true }),
                    axios.get(`${url}/attendance/month-attendance`, { withCredentials: true }),
                    axios.get(`${url}/leave-request/count`, { withCredentials: true }),
                ]);
                
                setDatas(prevDatas => ({
                    ...prevDatas,
                    totalEmployees: employeesResponse?.data.employeesCount || 0,
                    activeProjects: projectsResponse?.data.projectsCount || 0,
                    totalLeaves: attendanceResponse?.data.result[0]?.totalLeaves || 0,
                    leaveTypes: leaveTypeResponse?.data.result || {}
                }));
            } catch (error) {
                console.error('Error fetching count of employees:', error);
            }
        };

        fetchDatas();
    }, [])

    useEffect(()=>{
        console.log("datas: ", datas)
    },[datas])

    return (
        <div style={{padding: '0 0em'}}>
            <div className={classes.home1} style={{ padding: '2em 0'}}>
                <Link to={'admin/employees'} className={classes.totalEmployees}>
                    <i className="ri-group-line"></i>
                    <p>{datas.totalEmployees}</p>
                    <p>Total number of employees</p>
                </Link>
                <Link to={'admin/projects'} className={classes.totalEmployees}>
                    <i className="ri-projector-line"></i>
                    <p>{datas.activeProjects}</p>
                    <p>Active projects</p>
                </Link>
                <Link to={'admin/leave'} className={classes.totalEmployees}>
                    <p>{datas.totalLeaves}</p>
                    <p>Total leaves this month</p>
                </Link>
            </div>
            <div className={classes.home1} style={{ alignItems: 'center' }}>
                <AttendanceCartHome />
                <div className={classes.totalEmployees} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '1em', marginRight: '1em' }}>
                    <div>
                        <p>{'Sick leave - '}{datas?.leaveTypes?.sick}</p>
                    </div>
                    <div>
                        <p>{'Casual leave - '}{datas?.leaveTypes?.casual}</p>
                    </div>
                    <div>
                        <p>{'Other leave - '}{datas?.leaveTypes?.other}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;