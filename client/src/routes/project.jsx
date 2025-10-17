import React, { useEffect, useState } from 'react';
import classes from './project.module.css'
import NewProject from '../components/adminComponents/newProject';
import ProjcetCard from '../components/projcetCard';
import axios from 'axios';

function Project(props) {

    const [allProjects, setAllProjects] = useState([]);
    const [addNewModal, setAddNewModal] = useState(false);

    useEffect(()=> {
        const fetchProjects = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/project`;
                const res = await axios.get(url, { withCridentials: true})
                console.log('res: ', res)
                setAllProjects(res.data.projects)
            } catch (err) {
                console.log(err)
            }
        }
        fetchProjects();
    },[])

    return (
        <div className={classes.home}>
            {addNewModal && <NewProject  setAllProjects={setAllProjects} allProjects={allProjects} setAddNewModal={setAddNewModal} />}
            <div style={{  padding: '1.2em 0 0 2em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.3em', fontWeight: '700' }}>projects</h1>
                    {/* <h1 style={{ fontSize: '1em', fontWeight: '500' }}>{todayDayName}, {fullDate}</h1> */}
                </div>
                <button style={{ marginRight: '2.5em', padding: '0.5em 3em' }} onClick={() => setAddNewModal(true)}>Add +</button>
            </div>
            <div className={classes.projectsList}>
                < div className={`${classes.projectRow, classes.projectTitle}`}>
                    <h4>Project</h4>
                    <h4>Deadline</h4>
                    <h4 className={classes.taskCrew}>Status</h4>
                </div>
                {allProjects.length ?
                    allProjects.map((project, idx) =>
                        <ProjcetCard key={idx} project={project} idx={idx} />
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