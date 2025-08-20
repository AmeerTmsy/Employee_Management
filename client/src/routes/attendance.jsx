import React, { useEffect, useState } from 'react';
import { useCurrentMonthDays } from '../customHooks/dates';
// import employeeAttendanceData from '../data/empAttendence';
import axios from 'axios';

function Attendance(props) {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const [currentMonth, setCurrentMonth] = useState(todayMonth);  // 0-based
    const [currentYear, setCurrentYear] = useState(todayYear);
    const tableContainerRef = React.useRef(null);
    const currentDayRef = React.useRef(null);
    const [hasScrolled, setHasScrolled] = React.useState(false);

    const { days, todayDate, monthNumber, year, monthName } = useCurrentMonthDays(currentMonth, currentYear);
    const [attendance, setAttendance] = useState({});
    const [attendanceList, setAttendanceList] = useState([]);
    useEffect(() => {
        // console.log('currentMonth', currentMonth, 'currentYear', currentYear);
    }, [currentMonth, currentYear])
    useEffect(() => {
        const fetchAttendanceList = async () => {
            try {
                const url = `http://localhost:3000/attendance`;
                const response = await axios.get(url, { withCredentials: true });
                setAttendanceList(response?.data.attendance);
                // console.log(response.data.attendance); // API response data
                // if(attendanceList) console.log('attendanceList: ', attendanceList);
                // attendanceList.map(att => console.log(att))

            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };
        fetchAttendanceList();
    }, [attendance])

    useEffect(() => {
        const initialAttendance = {};
        attendanceList.forEach(att => {
            const empAttendance = {};
            const monthRecords = att.records.filter(r => {
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

            initialAttendance[att.employeeId] = empAttendance;
        });
        setAttendance(initialAttendance);
    }, [days, currentMonth, currentYear, attendanceList]);

    useEffect(() => {
        const sctabel = () => {
            if (currentDayRef.current && tableContainerRef.current) {
                const column = currentDayRef.current;
                console.log(`scroll x ${column.offsetLeft}`)
                const container = tableContainerRef.current;
                if (currentMonth !== todayMonth && currentYear !== todayYear) {
                    container.scrollLeft = 0;
                    setHasScrolled(true);
                } else {
                    // console.log(container.scrollLeft)
                    // console.log(`scroll x ${column.offsetLeft}`)
                    // // container.scrollLeft = container.scrollLeft + column.offsetLeft;
                    // container.scrollLeft = column.offsetLeft;
                    // console.log(container.scrollLeft)
                    const columnRect = column.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    const x = columnRect.left - containerRect.left + container.scrollLeft;

                    container.scrollLeft = x;
                }
            }
        }
        sctabel();
        // console.log(attendanceList);
        // console.log(days);
        // console.log(currentMonth);
    }, [days, currentMonth]);

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

    const handleChange = async (employeeId, name, day, value) => {
        const dateObj = new Date(year, monthNumber - 1, Number(day) + 1);
        const dateString = dateObj.toISOString().split('T')[0];
        const payload = { employeeId, date: dateString, status: value };
        try {
            const url = `http://localhost:3000/attendance/add`;
            const response = await axios.post(url, payload, { withCredentials: true });
            console.log(response);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
        setAttendance(prev => ({
            ...prev,
            [employeeId]: { ...prev[employeeId], [day]: value, }
        }));
        // console.log("Updated payload:", payload);
    };

    return (
        <div className="presence-container">
            <h1 className="presence-title">Attendance</h1>
            <div style={{ textAlign: 'center' }}>
                <select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(Number(e.target.value))}
                    style={{ marginLeft: "1em", paddingRight: "1em", paddingLeft: '1em', border: '0px ' }}
                >
                    {Array.from({ length: todayYear - 2020 + 1 }, (_, i) => todayYear - i).map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div className="attendance-month-select">
                <div onClick={() => handleMonthChange('prev')} className='prev-month'><i className="ri-arrow-drop-left-line"></i></div>
                <div>{monthName}</div>
                <div onClick={() => handleMonthChange('next')} className={`next-month ${currentYear === todayYear && currentMonth === todayMonth ? 'next-month-disable' : ''}`}><i className="ri-arrow-drop-right-line"></i></div>
            </div>

            <div className="table-scroll-container" ref={tableContainerRef}>
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th className="sticky-col">Employee</th>
                            {days.map((day) => (
                                <th key={day} ref={day === todayDate ? currentDayRef : null}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceList.map((emp) => (
                            <tr key={emp.employeeId}>
                                <td className="sticky-col">{emp.employeeName}</td>
                                {days.map(day => {
                                    const dayKey = String(day);
                                    return (
                                        <td key={`${emp.employeeId}-${dayKey}`}>
                                            {day === todayDate ?
                                                <select
                                                    className="attendance-select"
                                                    value={attendance[emp.employeeId]?.[dayKey] || ""}
                                                    onChange={(e) => handleChange(emp.employeeId, emp.employeeName, dayKey, e.target.value)}
                                                >
                                                    <option value=""></option>
                                                    <option value="P">P</option>
                                                    <option value="X">X</option>
                                                    <option value="HP">HP</option>
                                                    <option value="L">L</option>
                                                </select>
                                                :
                                                <span className={`
                                                    ${attendance[emp.employeeId]?.[dayKey] === 'P' ? " P "
                                                        : attendance[emp.employeeId]?.[dayKey] === 'HP' ? " HP "
                                                            : attendance[emp.employeeId]?.[dayKey] === 'L' ? " L "
                                                                : attendance[emp.employeeId]?.[dayKey] === 'X' ? " X " : " "}
                                                    `}>{attendance[emp.employeeId]?.[dayKey] || ""}</span>
                                            }
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Attendance;