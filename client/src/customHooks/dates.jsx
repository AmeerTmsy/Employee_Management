import { useState, useEffect } from "react";

export const useCurrentMonthDays = (month, year) => {
  const [monthInfo, setMonthInfo] = useState({
    days: [],
    todayDate: null,       // Today's date number (e.g., 9)
    todayDayName: "",      // Today's day name (e.g., Friday)
    monthName: "",         // Month short name (e.g., Aug)
    monthNumber: null,     // Month number (1-12)
    year: null,            // Year (e.g., 2025)
    fullDate: ""           // DD-MM-YYYY format
  });

  useEffect(() => {
    const date = new Date(year, month); // month is 0-based here
    const today = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const totalDays = new Date(year, month + 1, 0).getDate(); // total days in current month
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

    setMonthInfo({
      days: daysArray,
      todayDate: isCurrentMonth ? today.getDate() : null,
      todayDayName: isCurrentMonth ? dayNames[today.getDay()] : "",
      monthName: monthNames[month],
      monthNumber: month + 1,
      year: year,
      fullDate: isCurrentMonth
        ? `${String(today.getDate()).padStart(2, "0")}-${String(month + 1).padStart(2, "0")}-${year}`
        : ""
    });
  }, [month, year]);

  return monthInfo;
};
