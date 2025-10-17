import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminLeaveCom from './adminLeaveCom';
import EmployeeLeaveRequsest from '../employeeComponents/employeeLeaveRequsest';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';

function PublicLeaves({ classes }) {
    const { user } = useSelector((state) => state.login)
    const { userType, userId } = user;

    const [value, onChange] = useState(new Date());
    const [addRemoveLeave, setAddRemoveLeave] = useState(false);
    const [existingHoliday, setExistingHoliday] = useState(false);
    const [existingLeave, setExistingLeave] = useState(false);
    const [newHoliday, setNewHoliday] = useState({ name: '', description: '', date: '' });
    const [holidays, setHolidays] = useState([]);
    const [employeeLeaveRequests, setEmployeeLeaveRequests] = useState();

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const fetchHoliday = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/public-holiday`
                const response = await axios.get(url, { withCredentials: true })
                console.log('Holiday response: ', response);
                setHolidays(response.data.publicHolidays)
            } catch (error) {
                console.log('Error fetching leaves: ', error);
            }
        }
        fetchHoliday()

        const fetchEmployeeLeaves = async () => {
            if (user.userType !== 'employee') return
            try {
                const url = `${import.meta.env.VITE_API_URL}/leave-request/${userId}`
                const response = await axios.get(url, { withCredentials: true })
                console.log('Leave response: ', response);
                setEmployeeLeaveRequests(response.data.leaveRequest)
            } catch (err) {
                console.error(err)
            }
        }
        fetchEmployeeLeaves();
    }, [user, userType])
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const titleClassName = ({ date, view }) => {
        if (view === 'month') {
            const holiday = holidays?.find(holiday => new Date(holiday.date).toDateString() === date.toDateString());
            if (holiday) return classes.leave;

            if (employeeLeaveRequests) {
                const isleaveExist = employeeLeaveRequests.leaves.find(leave => new Date(leave.date).toDateString() === date.toDateString())
                if (isleaveExist) {
                    if (isleaveExist.status == 'Pending') return classes.leaveRequest
                    if (isleaveExist.status == 'Rejected') return classes.RejectedLeave
                    if (isleaveExist.status == 'Approved') return classes.approvedLeave
                }
            }

            return classes.normalDayStyle
        }
        return null;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changes = (value, event) => {
        let isExistingHoliday = holidays.find((holiday) => new Date(holiday.date).toDateString() === value.toDateString());
        let isExistingLeave;
        if (userType === 'employee') if (employeeLeaveRequests) isExistingLeave = employeeLeaveRequests.leaves.find(leave => new Date(leave.date).toDateString() === value.toDateString())
        setExistingHoliday(isExistingHoliday ? true : false);
        setExistingLeave(isExistingLeave ? true : false)
        setAddRemoveLeave(true)
        onChange(value)
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const addHolidayHandler = async (e) => {
        e.preventDefault();
        if (existingHoliday) {
            const updatedHolidays = holidays.filter((holiday) => new Date(holiday.date).toDateString() !== value.toDateString());
            setHolidays(updatedHolidays);
        } else {
            setNewHoliday({ ...newHoliday, date: value.toLocaleDateString('en-CA') })
            try {
                const url = `${import.meta.env.VITE_API_URL}/public-holiday`
                const response = await axios.post(url, newHoliday, { withCredentials: true })
                console.log("response: ", response);
            } catch (err) {
                console.error('err: ', err)
            }
        }
        setAddRemoveLeave(false)
    }
    //\/\//\//\///\////\/////\//////\///////\////////\/////////\///////////////\///////////////\////////////////////////\/////////////
    const leaveRequestHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const leaveType = formData.get('leaveType');
        const description = formData.get('description');
        const date = value.toLocaleDateString('en-CA');

        if (!leaveType || !description) return;

        const payload = { employeeId: userId, leaveType, description, date };
        console.log('payload: ', payload)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/leave-request`, payload, { withCredentials: true });
            console.log('res.data: ', res.data);
            setEmployeeLeaveRequests(res.data.leaveRequest);
        } catch (err) {
            console.error(err);
        }
        e.target.reset();
        setAddRemoveLeave(false);
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div>
            <div style={{ padding: '0em 2em 0em 2em', position: 'relative' }}>
                {addRemoveLeave &&
                    <div className={classes.addRemoveLeave}>
                        {userType === 'admin' &&
                            <form onSubmit={addHolidayHandler}>
                                <AdminLeaveCom
                                    classes={classes}
                                    existingHoliday={existingHoliday}
                                    value={value}
                                    setAddRemoveLeave={setAddRemoveLeave}
                                    newHoliday={newHoliday}
                                    setNewHoliday={setNewHoliday}
                                    holidays={holidays}
                                />
                            </form>
                        }
                        {userType === 'employee' &&
                            <form onSubmit={leaveRequestHandler}>
                                <EmployeeLeaveRequsest
                                    existingHoliday={existingHoliday}
                                    existingLeave={existingLeave}
                                    value={value}
                                    setAddRemoveLeave={setAddRemoveLeave}
                                    employeeLeaveRequests={employeeLeaveRequests}
                                    holidays={holidays}
                                />
                            </form>
                        }
                    </div>
                }
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

export default PublicLeaves;