import React, { useState } from 'react';

import classes from './newTaskModalForm.module.css'
import { useEffect } from 'react';
import axios from 'axios';

function NewTaskModalForm({ setAddNewModal, user, setTasks, tasks }) {

    const [taskData, setTaskData] = useState({
        title: '', 
        projectId: '', description: '',
        status: 'To Do', assignedTo: '',
        assignedBy: user.userId, dueDate: '', subtasks: [],
        comments: [{ text: 'Test case comment', commentedBy: user.userId },]
    });
    const [subTaskInput, setSubTaskInput] = useState('');
    const [employees, setEmployees] = useState();
    const [projects, setProjects] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = import.meta.env.VITE_API_URL;
                const [employeesResponse, projectsResponse] = await Promise.all([
                    axios.get(`${url}/employees`, { withCredentials: true }),
                    axios.get(`${url}/project`, { withCredentials: true }),
                ]);
                console.log(projectsResponse)
                setEmployees(employeesResponse?.data?.employees);
                setProjects(projectsResponse?.data?.projects);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    const addNewSubTask = () => {
        if (!subTaskInput.trim()) return;
        setTaskData((prev) => ({
            ...prev,
            subtasks: [...prev.subtasks, { title: subTaskInput, isCompleted: false }],
        }));
        setSubTaskInput('');
    }

    const removeSubTask = (index) => {
        setTaskData((prev) => ({
            ...prev,
            subtasks: prev.subtasks.filter((_, i) => i !== index),
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted Task Data:', taskData);
        try {
            const url = `${import.meta.env.VITE_API_URL}/task`
            const response = await axios.post(url, taskData, { withCredentials: true })
            console.log(response)
            setTasks([...tasks, response.data.newTask[0]])
            setAddNewModal(false)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div style={{ position: 'absolute', backgroundColor: '#ebebebff', width: '90%', left: '50%', top: '50%', transform: 'translate(-50%, -60%)', zIndex: '1' }}>
            <div className={classes.newTaskForm}>
                <span onClick={() => setAddNewModal(false)} style={{ position: 'absolute', right: '20px', cursor: 'pointer' }}>✕</span>
                <form onSubmit={handleSubmit}>
                    <h3 style={{ borderBottom: '2px solid gray', fontWeight: '500', fontSize: '1.3em', margin: '1em 0', paddingBottom: '0.3em' }}>New Task</h3>
                    <div className={classes.formRow}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' value={taskData.title} onChange={e => setTaskData({ ...taskData, title: e.target.value })} />
                    </div>
                    <div className={classes.formRow}>
                        <label htmlFor="description">Description</label>
                        <input type="text" id='description' value={taskData.description} onChange={e => setTaskData({ ...taskData, description: e.target.value })} />
                    </div>
                    <div className={classes.formRow}>
                        <div className={classes.assign_and_date}>
                            <select
                                id="assignedTo"
                                // value={taskData.assignedTo}
                                onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                            >
                                {employees &&
                                    employees.map((employee, idx) => <option style={{ backgroundColor: '#e8e8e8ff', borderBottom: '1px solid lightgray' }} key={idx} value={employee._id}>{employee.name}</option>)
                                }
                            </select>
                            <select
                                id="assignedTo"
                                className={classes.selectProject}
                                onChange={(e) => setTaskData({ ...taskData, projectId: e.target.value })}
                            >
                                <option value="">Project</option>
                                {projects &&
                                    projects.map((project, idx) => <option style={{ backgroundColor: '#e8e8e8ff', borderBottom: '1px solid lightgray' }} key={idx} value={project._id}>
                                        <div>
                                            <p>{project.name}</p>
                                            <p> - {project.status}</p>
                                        </div>
                                    </option>)
                                }
                            </select>
                            <input type="date" value={taskData.dueDate} onChange={e => setTaskData({ ...taskData, dueDate: e.target.value })} />
                        </div>
                    </div>

                    <div className={classes.formRow}>
                        <label htmlFor="addSubTasks">Sub Tasks</label>
                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '0.2em 0.5em', borderRadius: '5px', border: '1px solid lightgray', flex: '1 1 auto', position: 'relative' }}>
                            <input
                                type="text"
                                id='addSubTasks'
                                style={{ width: '100%' }}
                                value={subTaskInput}
                                onChange={(e) => setSubTaskInput(e.target.value)}
                            />
                            <div style={{ position: 'absolute', right: '5px', padding: '0.4em 1em', backgroundColor: 'white' }}>
                                <div onClick={addNewSubTask} style={{ padding: '0.5em 0.7em', backgroundColor: '#3d2db4ff', color: 'white', cursor: 'pointer', borderRadius: '50%', }}>+</div>
                            </div>
                        </div>
                    </div>
                    {taskData.subtasks.length > 0 && (
                        <div className={classes.formRow}>
                            <div>
                                {taskData.subtasks.map((st, idx) => (
                                    st.title && (
                                        <span
                                            key={idx}
                                            style={{ padding: '0.5em 1em', margin: '0.3em', backgroundColor: 'white', border: '1px solid lightgray', borderRadius: '5px', display: 'inline-block', }}
                                        >{st.title}&nbsp;&nbsp;<span onClick={() => removeSubTask(idx)}>✕</span></span>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={classes.formRow}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <button type="submit" style={{ marginRight: '2.5em', padding: '0.7em 3em', backgroundColor: '#3d2db4ff', color: 'white', border: '1px solid lightgray', borderRadius: '3px' }}>submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewTaskModalForm;