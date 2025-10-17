import React, { useEffect, useState } from 'react';
import projects from '../../../data/projects'
import EmpProjectCard from './empProjectCard';

function EmployeeProject(props) {
    const [employeeProjects, setEmployeeProjects] = useState(projects)
    useEffect(() => {
        console.log(employeeProjects)
    }, [employeeProjects])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '0.5em' }}>
                <div style={{ backgroundColor: '#6b6b6b33', padding: '0.5em 1em', fontSize: '0.9em', display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
                    <p>Project</p>
                    <p>Status</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '0.1em 0', padding: '0.4em 0', backgroundColor: '#6b6b6b33' }}>
                {employeeProjects.map((project, ind) => (
                    <EmpProjectCard project={project} ind={ind} />
                ))}
            </div>
        </div>
    );
}

export default EmployeeProject;