import React, { useState } from 'react';
import styles from './employeePerformance.module.css'
import projects from '../../../data/projects';

function EmployeePerformance(props) {

    const [task, setTask] = useState({
        complete: 50, pending: 30, incomplete: 20,
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0.1em', gap: '0.2em' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5em', /*border: '1px solid gray', */borderRadius: '5px', margin: '1em 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '0.3em' }}>
                    <p><span>Tasks Completion</span></p>
                    <p style={{ width: '50%', backgroundColor: 'bray', textAlign: 'center', display: 'flex', gap: '0.1em' }}>
                        <span style={{ backgroundColor: '#4ad40aff', width: `${task.complete}%`, height: '5px', display: 'inline-block', borderRadius: '10px 0 0 10px' }}></span>
                        <span style={{ backgroundColor: 'blue', width: `${task.pending}%`, height: '5px', display: 'inline-block' }}></span>
                        <span style={{ backgroundColor: 'red', width: `${task.incomplete}%`, height: '5px', display: 'inline-block', borderRadius: '0 10px 10px 0' }}></span>
                    </p>
                    <p style={{ width: '50%', backgroundColor: 'bray', textAlign: 'center', display: 'flex', gap: '0.1em', fontSize: '0.7em' }}>
                        <span style={{ width: '50%', height: '5px', display: 'inline-block', borderRadius: '10px 0 0 10px' }}>Completed {`${task.complete}%`}</span>
                        <span style={{ width: '30%', height: '5px', display: 'inline-block' }}>Pending {`${task.pending}%`}</span>
                        <span style={{ width: '20%', height: '5px', display: 'inline-block', borderRadius: '0 10px 10px 0' }}>Incomplete {`${task.incomplete}%`}</span>
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '0.2em', width: '100%' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: '', alignItems: 'start', gap: '0.5em', padding: '1em 1em', border: '1px solid gray', borderRadius: '5px', }}>
                    <h4><span style={{fontWeight: '500'}}>Projects</span></h4>
                    {/* {projects.map(project => (console.log(project)))} */}
                    {projects.map(project => (
                        <p style={{display: 'flex', justifyContent: 'start', alignItems: 'center' , gap: '0.2em', fontSize: '0.8em'}}>
                            <span className={`${project.status === 'Completed' && styles.blinking_dot_active} ${styles.blinking_dot}`}></span>
                            <span style={{display: 'inline-block'}}>&nbsp;&nbsp;{project.name}</span>
                        </p>
                        ))}
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',padding: '0 1em', height: '5em', border: '1px solid gray', borderRadius: '5px' }}>
                    <h3><span>Attendence %</span></h3>
                    <p><span>90/100</span></p>
                </div>
            </div>

        </div>
    );
}

export default EmployeePerformance;