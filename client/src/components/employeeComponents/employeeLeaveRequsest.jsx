import React from 'react';

function EmployeeLeaveRequsest({ existingHoliday, value, setAddRemoveLeave, existingLeave, employeeLeaveRequests, holidays }) {

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    console.log(new Date(value) >= yesterday)
    return (
        <div>
            {existingHoliday ?
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2em', gap: '1em' }} >
                        <h3 style={{ textAlign: 'center' }}>{`${value.toDateString()}`}</h3>
                        <p><i style={{ cursor: 'pointer' }} onClick={() => setAddRemoveLeave(false)} className="ri-close-fill"></i></p>
                    </div>
                    <h3 style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: '500', paddingTop: '0.5em' }}>{
                        holidays.find(r => new Date(r.date).toDateString() === value?.toDateString()).name
                    }</h3>
                </div>
                :
                existingLeave ?
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.2em', gap: '1em', color: '#737373ff' }} >
                            <h3 style={{ textAlign: 'center', fontWeight: '500' }}>{`${value.toDateString()}`}</h3>
                            <p style={{paddingLeft: '1em', fontSize: '1.5em', fontWeight: '200', color: '#484848ff'}}><i style={{ cursor: 'pointer' }} onClick={() => setAddRemoveLeave(false)} className={`ri-close-fill`}></i></p>
                        </div>
                        <h3 style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: '500', paddingTop: '0.5em' }}>{
                            employeeLeaveRequests.leaves.find(r => new Date(r.date).toDateString() === value?.toDateString()).leaveType
                        }</h3>
                    </div> :
                    new Date(value) >= yesterday ? // if the selected date is a past day or not to show the modal to request for the leave
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1em', fontSize: '0.8em', padding: '0.3em 0.3em' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em', borderRadius: '5px', boxShadow: '0px 1px 6px #cbcbcbff, 1px -1px 6px #cbcbcbff', width: '33%', padding: '0.3em 0.8em', cursor: 'pointer' }}>
                                    <input style={{ width: '0.9em', cursor: 'pointer' }} type="radio" name="leaveType" id="sick" value={'Sick'} />
                                    <label style={{ cursor: 'pointer' }} htmlFor="sick">Sick</label> <br />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em', borderRadius: '5px', boxShadow: '0px 1px 6px #cbcbcbff, 1px -1px 6px #cbcbcbff', width: '33%', padding: '0.3em 0.8em', cursor: 'pointer' }}>
                                    <input style={{ width: '0.9em', cursor: 'pointer' }} type="radio" name="leaveType" id="casual" value={'Casual'} />
                                    <label style={{ cursor: 'pointer' }} htmlFor="casual">Casual</label> <br />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em', borderRadius: '5px', boxShadow: '0px 1px 6px #cbcbcbff, 1px -1px 6px #cbcbcbff', width: '33%', padding: '0.3em 0.8em', cursor: 'pointer' }}>
                                    <input style={{ width: '0.9em', cursor: 'pointer' }} type="radio" name="leaveType" id="Other" value={'Other'} />
                                    <label style={{ cursor: 'pointer' }} htmlFor="Other">Other</label> <br />
                                </div>
                            </div >
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1em' }}>
                                <textarea style={{ padding: '0.4em 0.6em', border: '1px solid gray' }} name='description' id='description' rows={5} placeholder='Description...' required></textarea>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '1em' }}>
                                <div onClick={() => setAddRemoveLeave(false)} style={{ padding: '0.4em 1.8em', border: '1px solid gray', borderRadius: '3px', cursor: 'pointer' }} type="submit">Cancel</div>
                                <button style={{ padding: '0.5em 1em', backgroundColor: '#378deeff', border: '1px solid gray', borderRadius: '3px', color: '#fff', cursor: 'pointer' }} type="submit">Request Leave</button>
                            </div>
                        </div > :
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1em', fontSize: '0.8em', padding: '0.3em 0.3em' }}>
                                <p>You can't request leave for a past date!</p>
                            </div >
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '1em' }}>
                                <div onClick={() => setAddRemoveLeave(false)} style={{ padding: '0.4em 1.8em', border: '1px solid gray', borderRadius: '3px', cursor: 'pointer' }} type="submit">Cancel</div>
                            </div>
                        </div >
            }
        </div >
    );
}

export default EmployeeLeaveRequsest;