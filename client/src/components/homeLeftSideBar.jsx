import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function HomeLeftSideBar({ setSideBarGrow, sideBarGrow }) {

    const { login, user } = useSelector((state) => state.login)
    const { userType } = user;
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '1.5em 0 0 0em', gap: '2em', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', transition: 'all 200ms ease-in-out' }}>
                {sideBarGrow && <h2 style={{ fontWeight: '700', marginLeft: '2em' }}><Link to={'/'}>manage</Link></h2>}
                {sideBarGrow ?
                    <i onClick={() => setSideBarGrow(false)} style={{ margin: '0 1em', fontSize: '1.5em', cursor: 'pointer' }} className="ri-sidebar-fold-line"></i>
                    :
                    <i onClick={() => setSideBarGrow(true)} style={{ margin: '0 1em', fontSize: '1.5em', cursor: 'pointer' }} className="ri-sidebar-unfold-line"></i>
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '92%' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', justifyContent: sideBarGrow ? 'center' : 'space-between', marginTop: "0.9em", }}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
                    >
                        {({ isActive }) => (
                            <li style={{ listStyle: "none" }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {sideBarGrow && <span>Home</span>}
                                    <i className="ri-home-line"></i>
                                </div>
                            </li>
                        )}
                    </NavLink>
                    {userType === 'admin' && <NavLink
                        to={`${userType}/employees`}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "inactive-link"
                        }
                    >
                        {({ isActive }) => (
                            <li style={{ listStyle: "none" }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {sideBarGrow && <span>Employee</span>}
                                    <i className="ri-team-line"></i>
                                </div>
                            </li>
                        )}
                    </NavLink>}
                    {userType === 'admin' && <NavLink
                        to={`${userType}/projects`}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "inactive-link"
                        }
                    >
                        {({ isActive }) => (
                            <li style={{ listStyle: "none" }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {sideBarGrow && <span>Projects</span>}
                                    <i className="ri-folder-chart-line"></i>
                                </div>
                            </li>
                        )}
                    </NavLink>}
                    <NavLink
                        to={`${userType}/taskes`}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "inactive-link"
                        }
                    >
                        {({ isActive }) => (
                            <li style={{ listStyle: "none" }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {sideBarGrow && <span>Taskes</span>}
                                    <i className="ri-list-check-3"></i>
                                </div>
                            </li>
                        )}
                    </NavLink>
                    <NavLink
                        to={`${userType}/attendance`}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "inactive-link"
                        }
                    >
                        {({ isActive }) => (
                            <li style={{ listStyle: "none" }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {sideBarGrow && <span>Attendance</span>}
                                    <i className="ri-calendar-schedule-line"></i>
                                </div>
                            </li>
                        )}
                    </NavLink>
                    <NavLink
                        to={`${userType}/leave`}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "inactive-link"
                        }
                    >
                        {({ isActive }) => (
                            <li style={{ listStyle: "none" }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {sideBarGrow && <span>Leave</span>}
                                    <i className="ri-calendar-close-line"></i>
                                </div>
                            </li>
                        )}
                    </NavLink>
                    <NavLink
                        to={`${userType}/google-caleldar`}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "inactive-link"
                        }
                    >
                        {({ isActive }) => (
                            <li style={{ listStyle: "none" }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {sideBarGrow && <span>Google Calendar</span>}
                                    <i className="ri-calendar-line"></i>
                                </div>
                            </li>
                        )}
                    </NavLink>
                </ul>
                {login &&
                    <NavLink
                        to={`${userType}/account`}
                        style={{ padding: '0.9em 1em 0.9em 0.8em' }}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "inactive-link"
                        }
                    >
                        {({ isActive }) => (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '1em', borderRadius: '50px', height: '10px', width: '10px' }}>
                                <li style={{ listStyle: "none", color: 'gray' }}>{userType === 'admin' ? 'A' : 'E'}</li>
                            </div>
                        )}
                    </NavLink>
                }
            </div>
        </div>
    );
}

export default HomeLeftSideBar;