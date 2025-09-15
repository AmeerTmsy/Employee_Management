import React, { useEffect, useState } from "react";
import styles from "./EventForm.module.css";
import axios from 'axios'

const priorities = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
    { value: "normal", label: "Normal" },
    { value: "urgent", label: "Urgent" },
    { value: "optional", label: "Optional" },
];

function EventForm({ slotInfo, onSave, onCancel }) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("normal");
    const [attendees, setAttendees] = useState([]);
    const [newAttendee, setNewAttendee] = useState('')

    // useEffect(() => {
    //     console.log('slotInfo: ', slotInfo.start, '\n', slotInfo.end)
    // }, [slotInfo])

    const handleAddAttendee = () => {
        const trimmed = newAttendee.trim();
        if (trimmed && !attendees.includes(trimmed)) {
            setAttendees([...attendees, trimmed]);  // Append if valid and not duplicate
        }
        setNewAttendee("");  // Clear input regardless
        console.log('Updated attendees:', [...attendees, trimmed]);  // Log intended update
    };

    const handleRemoveAttendee = (attendeeToRemove) => {
        setAttendees(prevAttendees =>
            prevAttendees.filter(a => a !== attendeeToRemove)
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!attendees.length > 0) return
        if (!title) return;

        const payload = { title, priority, start: slotInfo.start, end: slotInfo.end, attendees: attendees }
        console.log('handlesubmit')
        try {
            const response = await axios.post(
                "http://localhost:3000/api/calendar/create",
                payload, { withCredentials: true }
            );
            console.log(response);

            // const {data} = await response;
            // ✅ update local state with new task

            onSave({
                title,
                priority,
                start: slotInfo.start,
                end: slotInfo.end,
                attendees: attendees
            });

            console.log("Event created:", data);
        } catch (err) {
            console.error(
                "Error saving event:",
                err.response?.data || err.message
            );
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Add New Event</h3><i className="ri-function-add-fill"></i>
                </div>

                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'flex', flexDirection: 'column', }}>
                        {/* Event Title: */}
                        <input type="text" value={title} placeholder="Event Title" onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label style={{ fontSize: '0.7em', marginTop: '0.25em', color: '#747474ff', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', width: '2.5em' }}>Start</span> : {slotInfo.start.toLocaleString()} | &nbsp;
                        <span style={{ display: 'inline-block', width: '2.5em' }}>End</span> : {slotInfo.end.toLocaleString()}
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        {/* Event Title: */}
                        <input type="email"
                            value={newAttendee}
                            placeholder="Attendees"
                            onChange={(e) => setNewAttendee(e.target.value)}
                        /><i
                            onClick={handleAddAttendee}
                            style={{ position: 'absolute', top: '15px', right: '0' }}
                            className="ri-user-add-line"></i>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
                        <p style={{ padding: '0.4em 0' }} >
                            {attendees?.map((a, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        display: 'inline-flex',  // Key fix: Shrinks to content + icon
                                        alignItems: 'center',    // Vertically centers text + icon
                                        padding: '0.05em 0.25em',
                                        backgroundColor: 'lightgray',
                                        borderRadius: '3px',
                                        margin: '0.1em',
                                    }}
                                >
                                    {a}
                                    <i
                                        onClick={() => handleRemoveAttendee(a)}
                                        className="ri-close-fill"
                                        style={{ marginLeft: '0.2em', cursor: 'pointer' }}  // Flush spacing; add cursor for UX
                                    />
                                </span>
                            ))}
                        </p>
                    </label>
                    <label style={{ marginTop: '1em' }}> <span style={{}}>Priority :</span>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >{priorities.map((p) => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}</select>
                    </label>
                    <div className={styles.actions}>
                        <button className={styles.cancelBtn} type="button" onClick={onCancel}>Cancel</button>
                        <button className={styles.saveBtn} type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventForm;
