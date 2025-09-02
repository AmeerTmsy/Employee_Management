import React, { useState } from 'react';
import classes from './newProject.module.css'
const allMembers = [
    { member: "Employee 1", memberId: "66cf1a9e7d1f1b23c0a33333" },
    { member: "Employee 2", memberId: "66cf1a9e7d1f1b23c0a44444" },
    { member: "Employee 3", memberId: "66cf1a9e7d1f1b23c0a55555" },
];

function NewProject({ setAddNewModal }) {

    const [newPrject, setNewProject] = useState({
        name: "",
        description: "",
        manager: "66cf1a9e7d1f1b23c0a22222",
        members: [],
        tasks: [],
        deadline: "",
        status: "On Going",
    })

    const [addMemberToNewProject, setAddMemberToNewProject] = useState({ member: '', memberId: '' });

    const addMemeber = () => {
        if (!subTaskInput.trim()) return;
        setNewProject((prev) => ({
            ...prev,
            members: [...prev.members, addMemberToNewProject],
        }));
        setSubTaskInput('');
    }

    const removeMember = (index) => {
        setNewProject((prev) => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index),
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(newPrject);
        // setAddNewModal(false);
    }
    return (
        <div className={classes.addNewProject}>
            <span onClick={() => setAddNewModal(false)} style={{ position: 'absolute', right: '20px', cursor: 'pointer' }}>✕</span>
            <h3 style={{ borderBottom: '1px solid gray', paddingBottom: '0.5em', marginBottom: '1em' }}>New Project</h3>
            <div style={{}}>
                <form onSubmit={handleFormSubmit}>
                    <div className={classes.newProjectRow}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' name='name' />
                    </div>
                    <div className={classes.newProjectRow}>
                        <label htmlFor="description">Description</label>
                        <input type="text" id='description' name='description' />
                    </div>
                    <div className={classes.newProjectRow}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em' }}>
                            <div className={classes.newProjectRow}>
                                <label htmlFor="deadline">Select Members</label>
                                <select
                                    id="assignedTo"
                                // value={taskData.assignedTo}
                                // onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                                >
                                    <option value="" disabled>Assign To</option>
                                    <option value="employee1">Employee 1</option>
                                    <option value="employee2">Employee 2</option>
                                    <option value="employee3">Employee 3</option>
                                </select>
                            </div>
                            <div className={classes.newProjectRow}>
                                <label htmlFor="deadline">Deadline</label>
                                <input type="date" id='deadline' name='deadline' />
                            </div>
                        </div>
                    </div>
                    {newPrject.members.length > 0 &&
                        <div className={classes.newProjectRow}>
                            <div>
                                {newPrject.members.map((member, idx) => (
                                    member.member && (
                                        <span
                                            key={idx}
                                            style={{ padding: '0.5em 1em', margin: '0.3em', backgroundColor: 'white', border: '1px solid lightgray', borderRadius: '5px', display: 'inline-block', }}
                                        >{member.member}&nbsp;&nbsp;<span onClick={() => removeSubTask(idx)}>✕</span></span>
                                    )
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