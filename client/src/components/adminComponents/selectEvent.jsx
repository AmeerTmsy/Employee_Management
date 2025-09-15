import React, { useEffect } from 'react';
import styles from './selectEvent.module.css'
import axios from 'axios';
function SelectEvent({ event, setSelectEvent, events, setEvents }) {

    useEffect(() => {
        event.attendees.map(att => console.log(att))
    }, [])

    // deleting the event form the google calendar&react-big-calendar
    const handleDeleteEvent = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/calendar/delete`,
                { id: event.id }, { withCredentials: true }
            );
            // console.log('response: ', response)
            const remindingEvents = events.filter(e => e.id !== event.id);
            console.log("remindingEvents: ", remindingEvents)
            setEvents(remindingEvents)
            setSelectEvent(null)
        } catch (error) {
            console.error("Error fetching events:", error.response?.data || error.message);
        }
    }

    // Making the status of the task as Completec
    const handleUpdateStatus = async () => {
        console.log('handleUpdateStatus');
        const payload = { status: "Completed" }
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/task/${event.id}`,
                payload, { withCredentials: true }
            )
            console.log(response)
        } catch (error) {
            console.error("Error fetching events:", error.response?.data || error.message);
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{event.title}</h3><i className="ri-calendar-event-line"></i>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p><span style={{ display: 'inline-block', width: '6.5em' }}>Event Starts </span>: &nbsp; {event.start.toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p><span style={{ display: 'inline-block', width: '6.5em' }}>Event Ends </span>: &nbsp; {event.end.toLocaleString()}</p>
                </div>
                <div className={styles.empEmails} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', borderBottom: '2px solid gray', borderTop: '2px solid gray', margin: '0.5em 0 0.5em 0', marginBottom: '0.5em', padding: '0.5em 0' }}>
                    <p>Attendees :</p>
                    {event?.attendees.map(att => (<p>{att.email ? att.email : att}</p>))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6em' }}>
                    <p>Priority : {event.priority}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5em' }}>
                    <button onClick={handleUpdateStatus}>Completed</button>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5em' }}>
                        <button onClick={() => setSelectEvent(null)}>Cancel</button>
                        <button onClick={handleDeleteEvent}><i className="ri-delete-bin-6-line"></i><span style={{ display: 'inline-block', width: '4em' }}>delete</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectEvent;