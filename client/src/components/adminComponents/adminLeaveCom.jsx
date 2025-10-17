import React from 'react';

function AdminLeaveCom({ classes, existingHoliday, value, setAddRemoveLeave, newHoliday, setNewHoliday, holidays }) {
    return (
        <div style={{}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2em', gap: '1em' }} >
                <h3 style={{ textAlign: 'center' }}>{existingHoliday
                    ? `Remove Leave of - ${value.toDateString()}`
                    : `Add Leave for - ${value.toDateString()}`
                }</h3>
                <p><i style={{ cursor: 'pointer' }} onClick={() => setAddRemoveLeave(false)} className="ri-close-fill"></i></p>
            </div>
            {existingHoliday && <h3 style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: '500', padding: '1em 0' }}>{ holidays.find(holiday => new Date(holiday.date).toDateString() === value.toDateString()).name}</h3>}

            {!existingHoliday &&
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.3em', margin: '1em 0' }}>
                        <input className={classes.addEventInput} type='text' id='name' name='name' value={newHoliday.name} onChange={(e)=> setNewHoliday({...newHoliday, name: e.target.value})} placeholder='Name' required />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.3em', margin: '1em 0' }}>
                        <input className={classes.addEventInput} type='text' id='description' value={newHoliday.description} name='description' onChange={(e)=> setNewHoliday({...newHoliday, description: e.target.value})} placeholder='Description' required />
                    </div>
                </div>

            }
            <div style={{ textAlign: 'end', marginTop: '0em' }}>
                <button style={{ padding: '0.5em 1em' }} type="submit">{existingHoliday ? 'Remove Holiday' : 'Add Holiday'}</button>
            </div>
        </div>
    );
}

export default AdminLeaveCom;