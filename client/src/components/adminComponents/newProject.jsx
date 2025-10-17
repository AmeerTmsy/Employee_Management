import React, { useState } from 'react';
import classes from './newProject.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function NewProject({ setAllProjects, allProjects, setAddNewModal }) {
    const { login, user } = useSelector((state) => state.login)

    const [employees, setEmployees] = useState()
    useEffect(() => {
        const fetcthEmployees = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/employees`
                const res = await axios.get(url, { withCredentials: true })
                setEmployees(res.data.employees)
            } catch (err) {
                console.log(err)
            }
        }
        fetcthEmployees()
    }, [])

    // useEffect(() => {
    //     if (user) console.log('user: ', user.userId);
    // }, [user])
    useEffect(() => {
        if (employees) console.log('employees: ', employees);
    }, [employees])

    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        manager: user?.userId,
        members: [],
        deadline: "",
    })

    const removeMember = (index) => {
        setNewProject((prev) => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index),
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (newProject.name.trim() === "" && newProject.description.trim() === "") {
            alert("fileds should not be empty")
            return
        }
        try {
            const url = `${import.meta.env.VITE_API_URL}/project`
            const res = await axios.post(url, newProject, { withCredentials: true })
            console.log('res: ', res);
            setAllProjects([...allProjects, res.data.project])
        } catch (err) {
            console.log(err)
        }


        setAddNewModal(false);
    }

    // useEffect(()=>{
    //     console.log(newProject)
    // },[newProject])
    return (
        <div className={classes.addNewProject}>
            <span onClick={() => setAddNewModal(false)} style={{ position: 'absolute', right: '20px', cursor: 'pointer' }}>✕</span>
            <h3 style={{ borderBottom: '1px solid gray', paddingBottom: '0.5em', marginBottom: '1em' }}>New Project</h3>
            <div style={{}}>
                <form onSubmit={handleFormSubmit}>
                    <div className={classes.newProjectRow}>
                        <label htmlFor="name">Name</label>
                        <input maxLength={100} type="text" id='name' name='name' value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
                    </div>
                    <div className={classes.newProjectRow}>
                        <label htmlFor="description">Description</label>
                        <input maxLength={1000} type="text" id='description' name='description' value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                    </div>
                    <div className={classes.newProjectRow} style={{ paddingBottom: '0em !important' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em' }}>
                            <div className={classes.newProjectRow}>
                                <label htmlFor="assignedTo">Select Members</label>
                                <select
                                    id="assignedTo"
                                    // value={newProject.members}
                                    onChange={(e) => setNewProject({
                                        ...newProject,
                                        members: [...newProject.members, e.target.value]
                                    })}
                                >
                                    <option value="" defaultValue hidden>Assign To</option>
                                    {employees &&
                                        employees.map((employee, idx) => <option key={idx} value={employee._id}>{employee.name}</option>
                                        )}
                                </select>
                            </div>
                            <div className={classes.newProjectRow}>
                                <label htmlFor="deadline">Deadline</label>
                                <input type="date" id='deadline' name='deadline' value={newProject.deadline} onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    {newProject.members.length > 0 &&
                        <div className={classes.newProjectRow} style={{ paddingTop: '0em !important' }}>
                            <div>
                                {newProject.members.map((member, idx) => (
                                    employees.map(employee => employee._id === member &&
                                        <span
                                            key={idx}
                                            style={{ fontSize: '0.8em', padding: '0.3em 1em', margin: '0.3em', backgroundColor: 'white', border: '1px solid lightgray', borderRadius: '5px', display: 'inline-block', }}
                                        >{employee.name}&nbsp;&nbsp;<span onClick={() => removeMember(idx)}>✕</span></span>)
                                ))}
                            </div>
                        </div>
                    }
                    <div className={classes.newProjectRow}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <button type="submit" style={{ marginRight: '2.5em', padding: '0.7em 3em', backgroundColor: '#3d2db4ff', color: 'white', border: '1px solid lightgray', borderRadius: '3px' }}>submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewProject;