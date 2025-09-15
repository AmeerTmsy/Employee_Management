import React, { useState } from "react";
import classes from './myCalendar.module.css'
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";
import EventForm from "./eventForm"
import { useEffect } from "react";
import axios from 'axios'
import SelectEvent from "./selectEvent";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function MyCalendar(props) {
    // ✅ Track current date & view
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState(Views.MONTH);
    // 🔥 state to control modal
    const [slotInfo, setSlotInfo] = useState(null);
    const [selectEvent, setSelectEvent] = useState(null);
    const [events, setEvents] = useState([
        // {
        //     title: "Team Meeting",
        //     start: new Date(2025, 8, 12, 10, 0),
        //     end: new Date(2025, 8, 12, 12, 0),
        //     priority: "high", // 🔴 red
        //     attendees: ["ameer@gmail.com"]
        // },
        // {
        //     title: "Project Deadline",
        //     start: new Date(2025, 8, 15),
        //     end: new Date(2025, 8, 15),
        //     priority: "medium", // 🟡 yellow
        //     attendees: ["ameer@gmail.com"]
        // },
    ]);

    useEffect(() => {
        console.log('events: ', events)
    }, [events])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:3000/api/calendar/list",
                    { withCredentials: true } 
                );
                console.log('data, ', data)
                const mapped = data.map(ev => ({
                    title: ev.summary,
                    start: new Date(ev.start.dateTime || ev.start.date),
                    end: new Date(ev.end.dateTime || ev.end.date),
                    priority: "normal",
                    id: ev.id,
                    attendees: ev.attendees
                }));

                setEvents(mapped);
            } catch (error) {
                console.error("Error fetching events:", error.response?.data || error.message);
            }
        };

        fetchEvents();
    }, []);

    const handleSave = async (newEvent) => {
        setEvents([...events, newEvent]);
        setSlotInfo(null); // close modal
    };

    return (
        <div style={{ height: '' }} className={classes.myCalendarWrapper}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '80vh' }}
                step={30} // 15 minutes per step
                timeslots={2} // 4 slots per hour
                selectable
                views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // ✅ Enable all views
                view={currentView} // ✅ controlled view
                date={currentDate} // ✅ controlled date
                defaultView={Views.MONTH} // ✅ Start in month view
                // step={60} // minutes per slot in week/day view
                showMultiDayTimes // ✅ for better week/day display
                toolbar={true} // ✅ Enable navigation toolbar
                onNavigate={(date) => setCurrentDate(date)} // ✅ navigation works
                onView={(view) => setCurrentView(view)}
                onSelectSlot={(info) => setSlotInfo(info)}
                onSelectEvent={(event) => setSelectEvent(event)}
                eventPropGetter={(event) => {
                    const colorVar = `--priority-${event.priority || "normal"}`;
                    return {
                        className: classes.event,
                        style: {
                            backgroundColor: `var(${colorVar})`,
                        },
                    };
                }}
            />
            {/* ✅ Show modal if slot is selected */}
            {slotInfo && (
                <EventForm
                    slotInfo={slotInfo}
                    onSave={handleSave}
                    onCancel={() => setSlotInfo(null)}
                />
            )}
            {selectEvent && (
                <SelectEvent 
                event={selectEvent} 
                setSelectEvent={setSelectEvent} 
                events={events}
                setEvents={setEvents}
                />
            )}
        </div>
    );
}

export default MyCalendar;