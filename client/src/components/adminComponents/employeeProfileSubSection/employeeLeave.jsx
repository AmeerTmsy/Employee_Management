import React, { useEffect, useState } from 'react';
import leaves from '../../../data/myLeaves';
import EmpLeaveCard from './empLeaveCard';
import styles from './employeeLeave.module.css'
import axios from 'axios';

function EmployeeLeave({ employee }) {
    const [employeeLeaves, setEmployeeLeaves] = useState(leaves);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchLeaves = async () => {
            if (!employee || !employee._id) return;
            try {
                const url = `${import.meta.env.VITE_API_URL}/leave-request/${employee._id}`
                const response = await axios.get(url, { withCredentials: true });
                console.log('response: ', response.data.leaveRequest.leaves)
                setEmployeeLeaves(response.data.leaveRequest)
            } catch (err) {
                console.log(err);
            }
        }

        fetchLeaves();
    }, [employee])

    const filteredLeaves = employeeLeaves.leaves?.filter(leave => {
        if (filter === 'All') return true;
        return leave.status === filter;
    }) || [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderRadius: '1em' }}>
                <div className={styles.leaveButtonContainer}>
                    <button className={styles.filtersButton} style={{ borderRadius: '0.2em 0 0 0.2em' }}>All</button>
                    <button className={styles.filtersButton} style={{ borderLeft: 'none', }}>Year</button>
                    <button className={styles.filtersButton} style={{ borderLeft: 'none', borderRadius: '0 0.2em 0.2em 0' }}>Month</button>
                </div>
                <div style={{ display: 'flex', gap: '0.7em' }}>
                    <div className={styles.leaveButtonContainer}>
                        <button onClick={() => setFilter('Approved')} className={styles.filtersButton} style={{ borderRadius: '0.2em 0 0 0.2em' }}>Allowed</button>
                        <button onClick={() => setFilter('Pending')} className={styles.filtersButton} style={{ borderLeft: 'none', }}>Pending</button>
                        <button onClick={() => setFilter('Rejected')} className={styles.filtersButton} style={{ borderLeft: 'none', borderRadius: '0 0.2em 0.2em 0' }}>Rejected</button>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', height: '5px', borderTop: '1px solid #989898ff', marginTop: '0.27em', borderRadius: '5px 5px 0 0', boxShadow: '0px -3px 5px #cbcbcbff', backgroundColor: 'transparent' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '0.24em' }}>
                <div style={{ backgroundColor: '#6b6b6b33', padding: '0.5em 2em 0.5em 1em', fontSize: '0.9em', display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
                    <p>Date</p>
                    <p>Reason</p>
                    <p>Status</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '0.1em 0', padding: '0.4em 0', backgroundColor: '#6b6b6b33' }}>
                {employeeLeaves.leaves.map((leave, ind) => {
                    if (filter === 'All') return <EmpLeaveCard setEmployeeLeaves={setEmployeeLeaves} employeeId={employee._id} key={ind} leave={leave} ind={ind} />
                    else if (filter === 'Approved' && leave.status === 'Approved') return <EmpLeaveCard setEmployeeLeaves={setEmployeeLeaves} employeeId={employee._id} key={ind} leave={leave} ind={ind} />
                    else if (filter === 'Rejected' && leave.status === 'Rejected') return <EmpLeaveCard setEmployeeLeaves={setEmployeeLeaves} employeeId={employee._id} key={ind} leave={leave} ind={ind} />
                    else if (filter === 'Pending' && leave.status === 'Pending') return <EmpLeaveCard setEmployeeLeaves={setEmployeeLeaves} employeeId={employee._id} key={ind} leave={leave} ind={ind} />
                    else return <></>
                })}
            </div>

            <div style={{ width: '100%', margin: '0.1em 0', padding: '0.4em 0', backgroundColor: '#6b6b6b33', borderRadius: '0 0 0.15em 0.15em ' }}>
                <h3 style={{ fontSize: '0.9em', fontWeight: '500', margin: '0 0.8em', borderBottom: '1px solid gray' }}>This Month</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.9em' }}>
                    <div style={{ width: '100%', padding: '1em', textAlign: 'center', }}>
                        <p>Total LOP days</p>
                    </div>
                    <div style={{ width: '100%', padding: '1em', textAlign: 'center', }}>
                        <p>LOP deduction</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeLeave;