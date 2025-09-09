import React, { useEffect, useState } from 'react';
import classes from './leave.module.css';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EmployeeLeaveRequsest from '../components/employeeComponents/employeeLeaveRequsest';
import AdminLeaveCom from '../components/adminComponents/adminLeaveCom';

function Leave(props) {///////////////////////////////
    const { user } = useSelector((state) => state.login)
    const { userType, userId } = user;

    const [value, onChange] = useState(new Date());
    const [addRemoveLeave, setAddRemoveLeave] = useState(false);
    const [existingLeave, setExistingLeave] = useState(false);
    const [leavesData, setLeavesData] = useState({
        leaves: [
            { date: '2025-09-04', event: 'Onem' },
            { date: '2025-09-05', event: 'Onem' },
            { date: '2025-09-06', event: 'Milad-un-Nabi' },
        ],
        totalLeave: 3,
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [employeeLeaves, setEmployeeLeaves] = useState([]);
    useEffect(() => {
        const fetchLeaves = async () => {
            if (userType !== 'employee') return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/leave-request/${userId}`, { withCredentials: true })
                // console.log('res.data: ', res.data.leaveRequest.leaves);
                setEmployeeLeaves(res.data.leaveRequest?.leaves || [])
                console.log('empleleave: ', employeeLeaves);
            } catch (error) {
                console.error('Error fetching leaves: ', error);
            }
        }
        fetchLeaves();
    }, [user, userType])

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const titleClassName = ({ date, view }) => {
        if (view === 'month') {
            const employeeLeave = employeeLeaves?.find(r => new Date(r.date).toDateString() === date.toDateString());
            if (employeeLeave) {
                if (employeeLeave.leaveType === 'Casual' || employeeLeave.leaveType === 'Sick') {
                    return classes.leaveRequest;
                }
            }
            const record = leavesData.leaves.find(r => new Date(r.date).toDateString() === date.toDateString());
            if (record) {
                return classes.leave
            } else return classes.normalDayStyle
        }
        return null;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changes = (value, event) => {
        const isExistingLeave = leavesData.leaves.find((r) => new Date(r.date).toDateString() === value.toDateString());
        const isExistingLeaveRequest = employeeLeaves.find((r) => new Date(r.date).toDateString() === value.toDateString());
        setExistingLeave(!!(isExistingLeave || isExistingLeaveRequest)); // isExistingLeave ? setExistingLeave(true) : else setExistingLeave(false);
        setAddRemoveLeave(true)
        onChange(value)
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const addLeaveHandler = (e) => {
        e.preventDefault();
        if (existingLeave) {
            const updatedLeaves = leavesData.leaves.filter(
                (r) => new Date(r.date).toDateString() !== value.toDateString()
            );
            setLeavesData({ leaves: updatedLeaves, totalLeave: updatedLeaves.length });
        } else {
            const event = e.target.event.value;
            const updatedLeaves = [...leavesData.leaves, { date: value.toLocaleDateString('en-CA'), event },];
            setLeavesData({ leaves: updatedLeaves, totalLeave: updatedLeaves.length });
        }
        setAddRemoveLeave(false)
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const leaveRequestHandler = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);
        const leaveType = formData.get('leaveType');
        const reason = formData.get('reason')

        if (!leaveType || !reason) return;

        const payload = {
            employeeId: userId,
            leaveType,
            reason,
            date: value.toLocaleDateString('en-CA'),
        }

        if (existingLeave) {
            const updatedLeaves = leavesData.leaves.filter(
                (r) => new Date(r.date).toDateString() !== value.toDateString()
            );
            setLeavesData({ leaves: updatedLeaves, totalLeave: updatedLeaves.length });
        }
        else {

            console.log('res.data: ');
            try {

                const res = await axios.post(`${import.meta.env.VITE_API_URL}/leave-request`, payload, { withCredentials: true })
                console.log('res.data: ', res.data);
                setEmployeeLeaves(res.data.leaveRequest?.leaves)
                // console.log("Selected leave type:", leaveType, value.toDateString());
                const formattedDate = value.toLocaleDateString('en-CA')
                // const updatedLeaves = [...leavesData.leaves, { date: formattedDate, event: leaveType },];
                // setLeavesData({ leaves: updatedLeaves, totalLeave: updatedLeaves.length });
            } catch (err) {
                console.log(err);
            }
        }
        e.target.reset();
        setAddRemoveLeave(false)
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <div style={{ padding: '1em 1.5em', position: 'relative' }}>
                {addRemoveLeave &&
                    <div className={classes.addRemoveLeave}>
                        {userType === 'admin' && <form onSubmit={addLeaveHandler}>
                            <AdminLeaveCom
                                existingLeave={existingLeave}
                                value={value}
                                setAddRemoveLeave={setAddRemoveLeave}
                                leavesData={leavesData}
                            />
                        </form>}
                        {userType === 'employee' && <form onSubmit={leaveRequestHandler}>
                            <EmployeeLeaveRequsest
                                existingLeave={existingLeave}
                                value={value}
                                setAddRemoveLeave={setAddRemoveLeave}
                                leavesData={leavesData}
                                employeeLeaves={employeeLeaves}
                            />
                        </form>}
                    </div>
                }
                <h2 style={{ fontSize: '1.5em', fontWeight: '700', margin: '0.5em 0' }}>leave page</h2>
                <div className={classes.calendarWrapper}>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        onClickDay={changes}
                        tileClassName={titleClassName}
                    />
                </div>
            </div>
        </div>
    );
}

export default Leave;