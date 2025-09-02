import React, { useState } from 'react';
import classes from './project.module.css'
import projects from '../data/projects';
import NewProject from '../components/adminComponents/newProject';
import ProjcetCard from '../components/projcetCard';

function Project(props) {


    const [addNewModal, setAddNewModal] = useState(true);

    return (
        <div className={classes.home}>
            {addNewModal && <NewProject setAddNewModal={setAddNewModal} />}
            <div style={{  padding: '1em 0 0 2em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5em', fontWeight: '700' }}>projects</h1>
                    {/* <h1 style={{ fontSize: '1em', fontWeight: '500' }}>{todayDayName}, {fullDate}</h1> */}
                </div>
                <button style={{ marginRight: '2.5em', padding: '0.5em 3em' }} onClick={() => setAddNewModal(true)}>Add +</button>
            </div>
            <div className={classes.projectsList}>
                < div className={`${classes.projectRow, classes.projectTitle}`}>
                    <h4>Project</h4>
                    <h4 className={classes.taskCrew}>Status</h4>
                    <h4>Deadline</h4>
                </div>
                {projects.length ?
                    projects.map((project, idx) =>
                        // <TaskRowCard
                        //     task={task}
                        //     key={idx}
                        //     idx={idx}
                        //     expanded={expandedRow === idx}
                        //     onExpand={() =>
                        //         setExpandedRow(expandedRow === idx ? null : idx)
                        //     }
                        // />
                        <ProjcetCard project={project} idx={idx} />
                    )
                    :
                    <h6 style={{ textAlign: 'center', paddingTop: '3em' }}>loading.....</h6>
                }
                <div style={{ padding: '0.31em 0' }}></div>
            </div>

        </div>
    );
}

export default Project;