import React, { useState } from 'react';

import classes from './newTaskModalForm.module.css'

function NewTaskModalForm({ setAddNewModal }) {

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: 'To Do',
        assignedTo: '',
        assignedBy: 'e51f6e51r65f165s15s5f5s5f5s',
        dueDate: '',
        subtasks: [],
        comments: [{ text: 'Test case comment', commentedBy: 'e51f6e51r65f165s15s5f5s5f5s' },]
    })

    const [subTaskInput, setSubTaskInput] = useState('');

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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Task Data:', taskData);
    }
    return (
        <div style={{ position: 'absolute', backgroundColor: '#ebebebff', width: '90%', left: '50%', top: '50%', transform: 'translate(-50%, -45%)' }}>
            <div className={classes.newTaskForm}>
                <span onClick={() => setAddNewModal(false)} style={{ position: 'absolute', right: '20px', cursor: 'pointer' }}>✕</span>
                <form onSubmit={handleSubmit}>
                    <h3 style={{ borderBottom: '2px solid gray', fontWeight: '500', fontSize: '1.3em', margin: '1em 0', paddingBottom: '0.3em' }}>New Task</h3>
                    <div className={classes.formRow}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' />
                    </div>
                    <div className={classes.formRow}>
                        <label htmlFor="description">Description</label>
                        <input type="text" id='description' />
                    </div>
                    <div className={classes.formRow}>
                        <div className={classes.assign_and_date}>
                            <select
                                id="assignedTo"
                                value={taskData.assignedTo}
                                onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                            >
                                <option value="" disabled>Assign To</option>
                                <option value="employee1">Employee 1</option>
                                <option value="employee2">Employee 2</option>
                                <option value="employee3">Employee 3</option>
                            </select>
                            <input type="date" />
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