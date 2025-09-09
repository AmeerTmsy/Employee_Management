import React from 'react';

function EmployeeLeaveRequsest({ existingLeave, value, setAddRemoveLeave, leavesData, employeeLeaves }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2em', gap: '1em' }} >
                <h3 style={{ textAlign: 'center' }}>{existingLeave
                    ? `Remove Leave of - ${value.toDateString()}`
                    : `Add Leave for - ${value.toDateString()}`
                }</h3>
                <p><i style={{ cursor: 'pointer' }} onClick={() => setAddRemoveLeave(false)} className="ri-close-fill"></i></p>
            </div>
            {existingLeave && <h3 style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: '500' }}>{
                leavesData.leaves.find(r => new Date(r.date).toDateString() === value?.toDateString()) ?
                leavesData.leaves.find(r => new Date(r.date).toDateString() === value?.toDateString()).event :
                employeeLeaves.find(r => new Date(r.date).toDateString() === value?.toDateString()).leaveType
            }</h3>}

            {!existingLeave && <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3em', marginTop: '1em' }}>
                <div style={{ display: 'flex', gap: '0.5em' }}>
                    <input type="radio" name="leaveType" id="sick" value={'Sick'} required />
                    <label htmlFor="sick">Sick</label> <br />
                </div>
                <div style={{ display: 'flex', gap: '0.5em' }}>
                    <input type="radio" name="leaveType" id="casual" value={'Casual'} required />
                    <label htmlFor="casual">Casual</label> <br />
                </div>
                <div style={{ display: 'flex', gap: '0.5em' }}>
                    <label htmlFor="reason">Reason</label> <br />
                    <input type="text" name="reason" id="reason" required />
                </div>
            </div>}
            <div style={{ textAlign: 'center', marginTop: '1em' }}>
                {!existingLeave && <button style={{ padding: '0.5em 1em' }} type="submit">Request Leave</button>}
            </div>
        </div>
    );
}

export default EmployeeLeaveRequsest;