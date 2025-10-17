import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './header.module.css'
import { Link, NavLink, useLocation } from 'react-router-dom';

function Header() {
    const { login, user } = useSelector((state) => state.login)
    const { userType } = user || {}
    const location = useLocation()
    const [newTaskModal, setNewTaskModal] = useState(true)

    const handleLogout = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/logout`
            const axios_headers = {
                withCredentials: true, headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            }
            await axios.get(url, axios_headers)
                .then(res => console.log(res))

            setTimeout(() => { window.location.reload() }, 200)
        } catch (error) {
            console.error('Error during Logout: ', error)
        }
    }
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ height: '80%', backgroundColor: '#fff', margin: '8.5px 8.5px 8.5px 0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 1em', borderRadius: '7px' }}>
                <div >
                    <ul style={{ display: 'flex', alignItems: 'center', gap: '2em' }}>
                        {/* {login &&
                            <button
                                
                                style={{
                                    backgroundColor: "tomato",
                                    color: "white",
                                    border: "none",
                                    padding: "0.7em 1.2em",
                                    borderRadius: "50px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "red")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "tomato")}
                            >
                                logout
                            </button>
                        } */}
                        <div onClick={() => setNewTaskModal(true)} className={styles.taskAddBtn}><button><span><i className="ri-add-line"></i> New Task</span></button></div>
                        <Link to={`${user.userType}/account`}><div className={styles.profileIcon}><i style={{ transform: 'translate(0px, -1px)' }} className="ri-user-2-line"></i></div></Link>
                    </ul>
                </div>
            </div>
            {
                newTaskModal && <div style={{ position: 'absolute', top: '0vh', left: '0vh', backgroundColor: '#1b1b1933', padding: '1em', width: '100%', height: '95vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '1.5em', borderRadius: '1em', width: '400px', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5em' }}>
                            <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
                                <i className="ri-file-check-line"></i>
                                <span style={{ fontSize: '1.1em', fontWeight: '500' }}>New Task</span>
                            </div>
                            <div style={{ cursor: 'pointer' }} onClick={() => setNewTaskModal(false)}>
                                <i className="ri-close-line"></i>
                            </div>
                        </div>
                        <div>
                            <form>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', fontSize: '0.8em' }}>
                                    <input
                                        type="text"
                                        placeholder="Name of task"
                                        style={{
                                            padding: '0.8em',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '6px',
                                            // width: '100%'
                                        }}
                                    />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                                            <div>
                                                <p style={{ padding: '0.6em 0em' }}>
                                                    <i className="ri-calendar-line"></i>
                                                    <span style={{ paddingLeft: '1em' }}>Day</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p style={{ padding: '0.6em 0em' }}>
                                                    <i className="ri-notification-line"></i>
                                                    <span style={{ paddingLeft: '1em' }}>Set Reminder</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p style={{ padding: '0.6em 0em' }}>
                                                    <i class="ri-flag-line"></i>
                                                    <span style={{ paddingLeft: '1em' }}>Priority</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p style={{ padding: '0.6em 0em' }}>
                                                    <i class="ri-price-tag-3-line"></i>
                                                    <span style={{ paddingLeft: '1em' }}>Tages</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p style={{ padding: '0.6em 0em' }}>
                                                    <i class="ri-user-line"></i>
                                                    <span style={{ paddingLeft: '1em' }}>Assign</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8em' }}>
                                            <div style={{ display: 'flex', gap: '0.4em' }}>
                                                <div>
                                                    <button type="button" style={{
                                                        padding: '0.5em 1em',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}>Today</button>
                                                </div>
                                                <div>
                                                    <button type="button" style={{
                                                        padding: '0.5em 1em',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}>Tomorrow</button>
                                                </div>
                                                <div>
                                                    <button style={{
                                                        padding: '0.5em 1em',
                                                        border: 'none',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}><i class="ri-add-line"></i></button>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.4em' }}>
                                                <div>
                                                    <button type="button" style={{
                                                        padding: '0.5em 1em',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}>in 1 hour</button>

                                                </div>
                                                <div>
                                                    <button style={{
                                                        padding: '0.5em 1em',
                                                        border: 'none',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}><i class="ri-add-line"></i></button>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.4em' }}>
                                                <div>
                                                    <button type="button" style={{
                                                        padding: '0.5em 0.3em',
                                                        border: 'none',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}><i style={{paddingRight: '0.5em'}} class="ri-add-line"></i> set</button>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.4em' }}>
                                                <div>
                                                    <button type="button" style={{
                                                        padding: '0.6em 0.3em',
                                                        border: 'none',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}><i style={{paddingRight: '0.5em'}} class="ri-add-line"></i> add</button>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.4em' }}>
                                                <div>
                                                    <button type="button" style={{
                                                        padding: '0.6em 0.3em',
                                                        border: 'none',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}><i style={{paddingRight: '0.5em'}} class="ri-add-line"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div style={{ display: 'flex', alignItems: 'center', gap: '1em', }}>
                                        <i className="ri-calendar-line"></i>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                                            <p>
                                                Day
                                            </p>
                                            <button type="button" style={{
                                                padding: '0.5em 1em',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '20px',
                                                backgroundColor: '#fff'
                                            }}>Today</button>
                                            <button type="button" style={{
                                                padding: '0.5em 1em',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '20px',
                                                backgroundColor: '#fff'
                                            }}>Tomorrow</button>
                                            <button style={{
                                                padding: '0.5em 1em',
                                                border: 'none',
                                                borderRadius: '20px',
                                                backgroundColor: '#fff'
                                            }}><i class="ri-add-line"></i></button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                                        <i className="ri-notification-line"></i>
                                        <p>
                                            Set Reminder
                                        </p>
                                        <button type="button" style={{
                                            padding: '0.5em 1em',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '20px',
                                            backgroundColor: '#fff'
                                        }}>in 1 hour</button>
                                        <button style={{
                                            padding: '0.5em 1em',
                                            border: 'none',
                                            borderRadius: '20px',
                                            backgroundColor: '#fff'
                                        }}><i class="ri-add-line"></i></button>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                                        <i className="ri-flag-line"></i>

                                        <button type="button" style={{
                                            padding: '0.5em 1em',
                                            border: 'none',
                                            borderRadius: '20px',
                                            backgroundColor: '#fff'
                                        }}><i class="ri-add-line"></i> Set Priority</button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                                        <i className="ri-flag-line"></i>

                                        <button type="button" style={{
                                            padding: '0.5em 1em',
                                            border: 'none',
                                            borderRadius: '20px',
                                            backgroundColor: '#fff'
                                        }}><i class="ri-add-line"></i> Tags</button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                                        <i className="ri-flag-line"></i>

                                        <button type="button" style={{
                                            padding: '0.5em 1em',
                                            border: 'none',
                                            borderRadius: '20px',
                                            backgroundColor: '#fff'
                                        }}><i class="ri-add-line"></i> Assign</button>
                                    </div> */}

                                    <textarea
                                        placeholder="Description"
                                        style={{
                                            padding: '0.8em',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '6px',
                                            // width: '100%',
                                            minHeight: '100px',
                                            resize: 'vertical'
                                        }}
                                    />

                                    <button type="submit" style={{
                                        padding: '0.8em',
                                        backgroundColor: '#ffd700',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}>
                                        Create task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Header;