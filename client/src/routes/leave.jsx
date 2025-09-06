import React, { useEffect, useState } from 'react';
import classes from './leave.module.css';
import Calendar from 'react-calendar';

function Leave(props) {///////////////////////////////
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
    const titleClassName = ({ date, view }) => {
        if (view === 'month') {
            const record = leavesData.leaves.find(r => new Date(r.date).toDateString() === date.toDateString());
            return record ? classes.leave : classes.normalDayStyle;
        }
        return null;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changes = (value, event) => {
        const isExistingLeave = leavesData.leaves.find((r) => new Date(r.date).toDateString() === value.toDateString());
        setExistingLeave(!!isExistingLeave); // isExistingLeave ? setExistingLeave(true) : else setExistingLeave(false);
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
    return (
        <div>
            <div style={{ padding: '1em 1.5em', position: 'relative' }}>
                {addRemoveLeave &&
                    <div className={classes.addRemoveLeave}>
                        <form onSubmit={addLeaveHandler}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2em', gap: '1em' }} >
                                <h3 style={{ textAlign: 'center' }}>{existingLeave
                                    ? `Remove Leave of - ${value.toDateString()}`
                                    : `Add Leave for - ${value.toDateString()}`
                                }</h3>
                                <p><i style={{ cursor: 'pointer' }} onClick={() => setAddRemoveLeave(false)} className="ri-close-fill"></i></p>
                            </div>
                            {!existingLeave && <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.3em', marginTop: '1em' }}>
                                <input type='text' id='event' name='event' placeholder='Describe Event' required />
                            </div>}
                            <div style={{ textAlign: 'center', marginTop: '1em' }}>
                                <button style={{ padding: '0.5em 1em' }} type="submit">{existingLeave ? 'Remove Leave' : 'Add Leave'}</button>
                            </div>
                        </form>
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