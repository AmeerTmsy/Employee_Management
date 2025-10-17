import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styles from './employeeLeaveRequests.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EmployeeLeavePendingRequests({ classes }) {

    const [value, onChange] = useState(new Date());
    const [pendingLeaves, setPendingLeaves] = useState([]);
    const [showPendingLeaveDatas, setShowPendingLeaveDatas] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchPendingLeaves = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/leave-request/pending`;
                const response = await axios.get(url, { withCredentials: true });
                setPendingLeaves(response.data.leaveRequests);
                console.log("pendingLeaves: ", response);
            } catch (err) {
                console.log("error: ", err);
            }
        }
        fetchPendingLeaves();
    }, [])
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const changes = (value, event) => {
        pendingLeaves ? pendingLeaves.map((employee, idx) => {
            const isExistingLeaveRequest = employee.leaves.find((leave) => new Date(leave.date).toDateString() === value.toDateString() && leave.status === 'Pending');
            if (isExistingLeaveRequest) setShowPendingLeaveDatas(true);
        }) : console.log("no pending leaves");

        setSelectedDate(value.toDateString())
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleLeaveStatus = async (employeeId, leaveId, status) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/leave-request/${employeeId}`;
            const response = await axios.patch(url, { leaveId, status }, { withCredentials: true });
            console.log(response);
        } catch (err) {
            console.log("err: ", err);
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const titleClassName = ({ date, view }) => {
        if (view === 'month' && pendingLeaves) {
            const hasLeaveRequest = pendingLeaves.some((employee) => employee.leaves.some((leave) => new Date(leave.date).toDateString() === date.toDateString()));
            if (hasLeaveRequest) return classes.leaveRequest;
            else return classes.normalDayStyle;
        }
        return null;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ margin: '1.5em 2em' }}>
                <div className={classes.calendarWrapper}>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        onClickDay={changes}
                        tileClassName={titleClassName}
                    />
                </div>
            </div>
            {showPendingLeaveDatas &&
                <div style={{ backgroundColor: '#090a0e89', padding: "1em", position: 'absolute', top: -70, left: 0, width: '100%', height: '90vh', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1' }}>
                    <i onClick={() => setShowPendingLeaveDatas(false)} style={{ position: 'absolute', top: 20, right: 20, color: 'white', cursor: 'pointer' }} className="ri-close-large-line"></i>
                    {pendingLeaves.length > 0 ?
                        pendingLeaves.map((leaveData, idx) =>
                            <div key={idx} style={{ border: '1px solid black', margin: '0.5em 2em', padding: '0.5em', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '0.5em', backgroundColor: '#090a0e39' }}>
                                {leaveData.leaves.map((leave, idx) => {
                                    if (leave.status === 'Pending' && new Date(leave.date).toDateString() === selectedDate)
                                        return (
                                            <div key={idx} style={{ minWidth: '280px', backgroundColor: 'white', padding: '0.5em', display: 'flex', flexDirection: 'column', gap: '0.1em', zIndex: 1 }}>
                                                <EmployeeTitle employeeId={leaveData.employeeId} />
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingBottom: '0.3em', paddingTop: '0.1em' }}>
                                                    <p style={{ fontWeight: '500', fontSize: '0.8em' }}>A {leave.leaveType ? leave.leaveType : "----------"} on {leave.date ? leave.date.split('T')[0] : "--------"}</p>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '0.8em' }}>Status :</p>
                                                    <p style={{ fontWeight: '400', fontSize: '0.8em' }}> {leave.status ? leave.status : '-------'}</p>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '0.8em' }}>Applied on :</p>
                                                    <p style={{ fontWeight: '400', fontSize: '0.8em' }}> {leave.createdAt ? leave.createdAt.split("T")[0] : '-------'}</p>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingBottom: '0.5em' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '0.8em' }}>Update on :</p>
                                                    <p style={{ fontWeight: '400', fontSize: '0.8em' }}> {leave.updatedAt ? leave.updatedAt.split("T")[0] : '-------'}</p>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', paddingTop: '0.5em', borderTop: '1px solid lightgray' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                        <button onClick={() => handleLeaveStatus(leaveData.employeeId, leave._id, "Rejected")} className={`${styles.leaveAlovenceBtn} ${styles.rejectBtn}`}>Reject</button>
                                                        <button onClick={() => handleLeaveStatus(leaveData.employeeId, leave._id, "Approved")} className={`${styles.leaveAlovenceBtn} ${styles.allowBtn}`}>Allow</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                })}
                            </div>
                        ) : <div style={{ border: '1px solid black', margin: '0.5em 2em', padding: '0.5em', borderRadius: '5px', backgroundColor: 'white' }}>No Pending Leave Requests</div>
                    }
                </div>
            }
        </div>
    );
}

export default EmployeeLeavePendingRequests;

function EmployeeTitle({ employeeId }) {
    const { user } = useSelector((state) => state.login)
    const [employee, setEmployee] = useState({});
    useEffect(() => {
        const fetchEmployee = async () => {
            if (employeeId) try {
                const url = `${import.meta.env.VITE_API_URL}/employees/${employeeId}`
                const response = await axios.get(url, { withCredentials: true })
                // console.log(response);
                setEmployee(response.data.employee)
            } catch (err) {
                console.log("error: ", err)
            }
        }
        fetchEmployee();
    }, [])
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingBottom: '0.3em', marginBottom: '0.3em', borderBottom: '1px solid lightgray' }}>
            <p style={{ fontWeight: '600' }}>{employee ? employee.name : "Name"}</p>
            <Link to={`/${user.userType}/employees/${employeeId}`} style={{ textAlign: 'end', fontWeight: '100', textDecoration: 'none' }}><span style={{ position: 'relative', display: 'inline-block', }}>
                <i className={`${styles.openProfileIcon} ri-picture-in-picture-exit-line`}></i>
                <span className={styles.showSpan}
                >Open Profile</span>
            </span></Link>
        </div>
    )
}