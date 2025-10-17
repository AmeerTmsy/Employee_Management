import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './employeeAttendances.module.css';

function EmployeeAttendances(props) {
    const [value, onChange] = useState(new Date());
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '0.3em', }}>
            <div style={{ maxWidth: '500px'}}>
                <Calendar onChange={onChange} value={value} />
            </div>
            <div className={styles.attendanceDetails}>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '1em 1em', borderRadius: '0.15em', boxShadow: '0px 1px 5px #b4b4b4ff'}}>
                    <p>Presents</p>
                    <p>5</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '1em 1em', borderRadius: '0.15em', boxShadow: '0px 1px 5px #b4b4b4ff'}}>
                    <p>Absents</p>
                    <p>5</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '1em 1em', borderRadius: '0.15em', boxShadow: '0px 1px 5px #b4b4b4ff'}}>
                    <p>Leaves</p>
                    <p>5</p>
                </div>
            </div>
        </div>
    );
}

export default EmployeeAttendances;