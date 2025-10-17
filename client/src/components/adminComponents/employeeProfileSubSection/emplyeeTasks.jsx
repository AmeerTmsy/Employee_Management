import React, { useEffect, useState } from 'react';
import EmpTaskCard from './empTaskCard';
import myTask from '../../../data/myTask';
function EmplyeeTasks(props) {
    const date = new Date().toISOString().split('T')[0];
    const [dateOfTask, setDateOfTask] = useState(date)

    const [empTasks, setEmpTasks] = useState(myTask);


    useEffect(() => {
        console.log(dateOfTask);

    }, [dateOfTask])
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.9em' }}>
                    {dateOfTask && !isNaN(new Date(dateOfTask))
                        ? new Date(dateOfTask).toDateString()
                        : 'Invalid Date'}
                </h3>
                <input value={date} onChange={e => setDateOfTask(e.target.value)} style={{ width: '20px', display: 'flex', justifyContent: 'flex-end', paddingRight: '0.5em', backgroundColor: 'transparent' }} type="date" name="" id="" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '0.5em' }}>
                    <div style={{backgroundColor: '#6b6b6b33', padding: '0.5em 1em', fontSize: '0.9em', display: 'flex', justifyContent: 'space-between', fontWeight: '500'}}>
                        <p>Tasks</p>
                        <p>Status</p>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '0.1em 0', padding: '0.4em 0',backgroundColor: '#6b6b6b33' }}>
                    {empTasks.subtasks.map((task, ind) => (
                        <EmpTaskCard task={task} ind={ind} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EmplyeeTasks;