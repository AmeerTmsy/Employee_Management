import React, { useState } from 'react';
import classes from './taskes.module.css'
import assignedTasks from '../data/tasks'
import TaskRowCard from '../components/taskRowCard';
import { useCurrentMonthDays } from '../customHooks/dates';
import { useSelector } from 'react-redux';
import AdminTask from '../components/adminComponents/adminTask';
import EmployeeTask from '../components/employeeComponents/employeeTask';

function Taskes(props) {
    const today = new Date().toISOString().split("T")[0];
    const [year, month] = [new Date().getFullYear(), new Date().getMonth()];
    const { fullDate, todayDayName } = useCurrentMonthDays(month, year);
    const { login, user } = useSelector((state) => state.login)

    const [expandedRow, setExpandedRow] = useState(null);

    return (
        <div>
            {user.userType === 'admin' && <AdminTask />}
            {user.userType === 'employee' && <EmployeeTask />}
        </div>
    );
}

export default Taskes;