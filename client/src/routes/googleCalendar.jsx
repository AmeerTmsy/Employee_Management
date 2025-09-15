import React from 'react';
import MyCalendar from '../components/adminComponents/myCalendar';

function GoogleCalendar(props) {
    return (
        <div style={{padding: '1em', display: ''}}>
            <h1 style={{fontSize: '1.3em', marginBottom: '0.5em' , fontWeight: '700'}}>Google Calendar</h1>
            <MyCalendar />
        </div>
    );
}

export default GoogleCalendar;