import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './employee.module.css';
import EmployeeAttendances from '../components/adminComponents/employeeProfileSubSection/EmployeeAttendances';
import EmplyeeTasks from '../components/adminComponents/employeeProfileSubSection/EmplyeeTasks';
import EmployeeProject from '../components/adminComponents/employeeProfileSubSection/employeeProject';
import EmployeeLeave from '../components/adminComponents/employeeProfileSubSection/employeeLeave';
import EmployeePerformance from '../components/adminComponents/employeeProfileSubSection/employeePerformance';
import SalarySlip from '../components/adminComponents/employeeProfileSubSection/salarySlip';

function Employee(props) {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [isPresent, setIsPresent] = useState(true);

    const [showList, setShowList] = useState({
        attendance: false,
        tasks: false,
        projects: false,
        leave: true,
        performance: false,
        salarySlip: false,
    })

    useEffect(() => {
        // console.log('id: ', id)
        async function fetchEmployee() {
            if (id) try {
                const url = `${import.meta.env.VITE_API_URL}/employees/${id}`;
                const response = await axios.get(url);
                // console.log(response)
                setEmployee(response.data.employee)
            } catch (err) {
                console.log(err)
            }
        }
        fetchEmployee();
    }, [id])

    useEffect(() => {
        // console.log(employee);
    }, [employee])

    const handleTabClick = (tab) => {
        setShowList({
            attendance: tab === 'attendance',
            tasks: tab === 'tasks',
            projects: tab === 'projects',
            leave: tab === 'leave',
            performance: tab === 'performance',
            salarySlip: tab === 'salarySlip',
        });
    };

    return (
        <div style={{position: 'relative'}} >
            <div style={{ margin: '0 1em' }}>
                <div style={{ padding: '1em 0 0.5em 0', borderBottom: '1px solid gray', display: 'flex', justifyContent: 'space-between', fontSize: '0.8em' }}>
                    <p><Link to={'/admin/employees'}>Employees</Link> <i className="ri-arrow-right-s-line"></i>{` ${employee.name}`} </p>
                    <p>Info</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1em' }}>
                    <div>
                        <div className={styles.circle}>
                            <div>
                                <p>myG<br /></p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', margin: '0 2em', marginBottom: '0.5em', marginTop: '0.5em', alignSelf: 'stretch' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1em' }}>
                            <div>
                                <p style={{ fontWeight: '500' }}>{employee.name}</p>
                                <p style={{ paddingBottom: '0.5em' }}>{employee.email}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0em' }}>
                                <p>{employee.designation} </p>
                                <p style={{ fontSize: '0.7em' }}>Joined on {employee.dateOfJoining}</p>
                            </div>
                        </div>
                        <div style={{ fontSize: '1.5em', display: 'flex', alignItems: 'center' }}>
                            {isPresent ? <i style={{ color: 'green' }} className="ri-account-pin-circle-fill"></i> : <i className="ri-account-pin-circle-line"></i>}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1.5px solid #989898ff', borderRadius: '5px', marginTop: '2em', boxShadow: '0px 2px 3px #cbcbcbff' }}>
                    <div style={{ display: 'flex', gap: '0.5em', padding: '0.2em 0.2em 0.2em 0.2em' }}>
                        <button onClick={() => handleTabClick('attendance')} className={`${styles.belowHoverLine} ${showList.attendance && styles.showSadow}`}>Attendance</button>
                        <button onClick={() => handleTabClick('tasks')} className={`${styles.belowHoverLine} ${showList.tasks && styles.showSadow}`}>Tasks</button>
                        <button onClick={() => handleTabClick('projects')} className={`${styles.belowHoverLine} ${showList.projects && styles.showSadow}`}>Projects</button>
                        <button onClick={() => handleTabClick('leave')} className={`${styles.belowHoverLine} ${showList.leave && styles.showSadow}`}>Leave</button>
                        <button onClick={() => handleTabClick('performance')} className={`${styles.belowHoverLine} ${showList.performance && styles.showSadow}`}>Performance</button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5em', padding: '0.2em 0.2em 0.2em 0.2em' }}>
                        <button onClick={() => handleTabClick('salarySlip')} className={`${styles.belowHoverLine} ${showList.salarySlip && styles.showSadow}`}>Salary Slip</button>
                    </div>
                </div>
                <div style={{ paddingTop: '0.3em' }}>
                    {showList.attendance ? <EmployeeAttendances /> :
                        showList.tasks ? <EmplyeeTasks /> :
                            showList.projects ? <EmployeeProject /> :
                                showList.leave ? <EmployeeLeave employee={employee} /> :
                                    showList.performance ? <EmployeePerformance /> :
                                        showList.salarySlip ? <SalarySlip employee={employee} /> : ''}
                </div>
            </div>
        </div>
    );
}

export default Employee;