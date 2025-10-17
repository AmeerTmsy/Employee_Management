import React, { useState } from 'react';
import { useCurrentMonthDays } from '../../customHooks/dates';
import classes from './adminTaskes.module.css'
import TaskRowCard from '../taskRowCard';
import NewTaskModalForm from './newTaskModalForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AdminTask(props) {
    const today = new Date().toISOString().split("T")[0];
    const [year, month] = [new Date().getFullYear(), new Date().getMonth()];
    const { fullDate, todayDayName } = useCurrentMonthDays(month, year);

    const { login, user } = useSelector((state) => state.login)
    const [expandedRow, setExpandedRow] = useState(null);
    const [addNewModal, setAddNewModal] = useState(true);
    const [tasks, setTasks] = useState();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/task`
                const response = await axios.get(url, { withCredentials: true })
                console.log(response.data.tasks)
                setTasks(response.data.tasks)
            } catch (err) {
                console.log(err)
            }
        }
        fetchTasks();
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {addNewModal &&
                <NewTaskModalForm setAddNewModal={setAddNewModal} user={user} setTasks={setTasks} tasks={tasks} />
            }
            <div style={{ marginTop: '0.2em', padding: '1em 0 0 2em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5em', fontWeight: '700' }}>tasks</h1>
                    <h1 style={{ fontSize: '1em', fontWeight: '500' }}>{todayDayName}, {fullDate}</h1>
                </div>
                <button style={{ marginRight: '2.5em', padding: '0.5em 3em' }} onClick={() => setAddNewModal(true)}>Add +</button>
            </div>
            <div className={classes.taskHome}>
                < div className={`${classes.taskRow, classes.taskTitle}`}>
                    <h4>Task</h4>
                    <h4 className={classes.taskCrew}>Assigned To</h4>
                    <h4>Task Status</h4>
                </div>
                {tasks ?
                    tasks?.map((task, idx) =>
                        <TaskRowCard
                            task={task}
                            key={idx}
                            idx={idx}
                            expanded={expandedRow === idx}
                            onExpand={() =>
                                setExpandedRow(expandedRow === idx ? null : idx)
                            }
                        />)
                    :
                    <h6 style={{ textAlign: 'center', paddingTop: '3em' }}>loading.....</h6>
                }
                <div style={{ padding: '0.31em 0' }}></div>
            </div>

        </div >
    );
}

export default AdminTask;