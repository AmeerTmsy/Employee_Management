import React from 'react';

function AdminLeaveCom({ existingLeave, value, setAddRemoveLeave, leavesData}) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2em', gap: '1em' }} >
                <h3 style={{ textAlign: 'center' }}>{existingLeave
                    ? `Remove Leave of - ${value.toDateString()}`
                    : `Add Leave for - ${value.toDateString()}`
                }</h3>
                <p><i style={{ cursor: 'pointer' }} onClick={() => setAddRemoveLeave(false)} className="ri-close-fill"></i></p>
            </div>
            {existingLeave && <h3 style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: '500' }}>{leavesData.leaves.find(r => new Date(r.date).toDateString() === value.toDateString()).event}</h3>}

            {!existingLeave && <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.3em', marginTop: '1em' }}>
                <input className={classes.addEventInput} type='text' id='event' name='event' placeholder='Describe Event' required />
            </div>}
            <div style={{ textAlign: 'center', marginTop: '1em' }}>
                <button style={{ padding: '0.5em 1em' }} type="submit">{existingLeave ? 'Remove Leave' : 'Add Leave'}</button>
            </div>
        </div>
    );
}

export default AdminLeaveCom;