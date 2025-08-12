import React, { useEffect, useState } from 'react';
import { useCurrentMonthDays } from '../customHooks/dates';
import employeeAttendanceData from '../data/empAttendence';

function Presence(props) {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const [currentMonth, setCurrentMonth] = useState(todayMonth);  // 0-based
    const [currentYear, setCurrentYear] = useState(todayYear);

    const { days, todayDate, monthNumber, year, monthName } = useCurrentMonthDays(currentMonth, currentYear);
    const [attendance, setAttendance] = useState({});
    useEffect(() => {
        // console.log('currentMonth', currentMonth, 'currentYear', currentYear);
    }, [currentMonth, currentYear])

    useEffect(() => {
        const initialAttendance = {};
        employeeAttendanceData.forEach(emp => {
            const empAttendance = {};
            const monthRecords = emp.records.filter(r => {
                const recordDate = new Date(r.date);
                return (
                    recordDate.getMonth() === currentMonth &&
                    recordDate.getFullYear() === currentYear
                );
            });
            days.forEach(day => {
                const record = monthRecords.find(r => new Date(r.date).getDate() === day);
                empAttendance[String(day)] = record
                    ? record.status
                    : (currentYear < todayYear || (currentYear === todayYear && currentMonth < todayMonth))
                        ? "O" // Past months - mark all
                        : (currentYear === todayYear && currentMonth === todayMonth && day <= todayDate)
                            ? "O" // Current month until today
                            : "";  // Future
            });

            initialAttendance[emp.employeeId] = empAttendance;
        });
        setAttendance(initialAttendance);
    }, [days, currentMonth, currentYear]);

    const handleMonthChange = (month) => {
        if (month === 'next') {
            if (currentYear > todayYear ||
                (currentYear === todayYear && currentMonth >= todayMonth)) {
                return; // Stop navigation
            }
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(prev => prev + 1);
            } else {
                setCurrentMonth(prev => prev + 1);
            }
        }
        else if (month === 'prev') {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(prev => prev - 1);
            } else {
                setCurrentMonth(prev => prev - 1);
            }
        }
    }
    const handleChange = (employeeId, name, day, value) => {
        const dateObj = new Date(year, monthNumber - 1, Number(day) + 1);
        const dateString = dateObj.toISOString().split('T')[0];
        const payload = { employeeId, name, date: dateString, status: value };
        setAttendance(prev => ({
            ...prev,
            [employeeId]: { ...prev[employeeId], [day]: value, }
        }));
        console.log("Updated payload:", payload);
    };

    return (
        <div className="presence-container">
            <h1 className="presence-title">Attendance</h1>
            <h4 style={{textAlign: 'center'}}>{currentYear}</h4>
            <div className="attendance-month-select">
                <div onClick={() => handleMonthChange('prev')} className='prev-month'><i className="ri-arrow-drop-left-line"></i></div>
                <div>{monthName}</div>
                <div onClick={() => handleMonthChange('next')} className={`next-month ${currentYear === todayYear && currentMonth === todayMonth ? 'next-month-disable' : ''}`}><i className="ri-arrow-drop-right-line"></i></div>
            </div>

            <div className="table-scroll-container">
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th className="sticky-col">Employee</th>
                            {days.map((day) => (
                                <th key={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employeeAttendanceData.map((emp) => (
                            <tr key={emp.name}>
                                <td className="sticky-col">{emp.name}</td>
                                {days.map(day => {
                                    const dayKey = String(day);
                                    return (
                                        <td key={`${emp.employeeId}-${dayKey}`}>
                                            {day === todayDate ?
                                                <select
                                                    className="attendance-select"
                                                    value={attendance[emp.employeeId]?.[dayKey] || ""}
                                                    onChange={(e) => handleChange(emp.employeeId, emp.name, dayKey, e.target.value)}
                                                >
                                                    <option value=""></option>
                                                    <option value="P">P</option>
                                                    <option value="X">X</option>
                                                    <option value="HP">HP</option>
                                                    <option value="L">L</option>
                                                </select>
                                                :
                                                <span>{attendance[emp.employeeId]?.[dayKey] || ""}</span>
                                            }
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Presence;