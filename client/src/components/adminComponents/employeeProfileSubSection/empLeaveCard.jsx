import axios from 'axios';
import React, { useState } from 'react';
// import { formatDate } from 'react-calendar/dist/shared/dateFormatter.js';

function EmpLeaveCard({ setEmployeeLeaves, employeeId, leave, ind }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleLeaveStatusChange = async (e) => {
        e.preventDefault();
        console.log('value', e.target.value)
        console.log('id', employeeId)
        console.log('leaveId', leave._id)
        try {
            const url = `${import.meta.env.VITE_API_URL}/leave-request/${employeeId}`
            const response = await axios.patch(url, { status: e.target.value, leaveId: leave._id }, { withCredentials: true });
            // console.log('response: ', response)
            setEmployeeLeaves(response.data.leaveRequest)
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div key={ind} style={{ padding: '0.6em 1em', fontSize: '0.8em', display: 'flex', justifyContent: 'space-between' }}>
            <p>{leave.date.split("T")[0]}</p>
            <p>{leave.leaveType}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em' }}>
                <form onChange={handleLeaveStatusChange} style={{ position: "relative", width: "95px" }}>
                    <select style={{
                        backgroundColor: 'transparent', cursor: 'pointer', 
                        fontFamily: 'Montserrat, sans-serif', appearance: 'none', 
                        WebkitAppearance: "none", MozAppearance: "none", 
                    }}
                        name="status" id="status" value={leave.status}
                        onClick={() => setIsOpen(!isOpen)}
                        onBlur={() => setIsOpen(false)} // reset when focus is lost
                    >
                        <option style={{ marginRight: '10em', fontSize: '0.9em', fontFamily: 'Montserrat, sans-serif' }} value="Pending">Pending</option>
                        <option style={{ marginRight: '10em', fontSize: '0.9em', color: 'green', fontFamily: 'Montserrat, sans-serif' }} value="Approved">Approve</option>
                        <option style={{ marginRight: '10em', fontSize: '0.9em', color: 'red', fontFamily: 'Montserrat, sans-serif' }} value="Rejected">Reject</option>
                    </select>
                    <span
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: `translateY(-50%) rotate(${isOpen ? "180deg" : "0deg"})`,
                            transition: "transform 0.3s ease",
                            pointerEvents: "none", // so clicks go through to select
                        }}
                    ><i className="ri-arrow-down-s-line"></i></span>
                </form>
            </div>
        </div>
    );
}

export default EmpLeaveCard;