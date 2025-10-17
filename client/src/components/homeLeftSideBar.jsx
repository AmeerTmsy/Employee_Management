import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

function HomeLeftSideBar({ setSideBarGrow, sideBarGrow }) {

    const { login, user } = useSelector((state) => state.login)
    const { userType } = user;
    return (
        <div style={{ height: '100vh', padding: '1.2vh', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', height: '94vh', backgroundColor: '#fff', flexDirection: 'column', padding: '1.5em 0 0 0em', gap: '2em', borderRadius: '7px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', transition: 'all 200ms ease-in-out' }}>
                    {sideBarGrow && <h2 style={{ fontWeight: '700', marginLeft: '2em' }}><Link to={'/'}>EM Software</Link></h2>}
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
                                        {sideBarGrow && <span>Dashboard</span>}
                                        <i className="ri-dashboard-line"></i>
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
                                        {sideBarGrow && <span>Employees</span>}
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
                                        {sideBarGrow && <span>{userType === 'employee' ? 'My Task' : 'Tasks'}</span>}
                                        <i className="ri-checkbox-circle-line"></i>
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
                        {/* <NavLink
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
                        </NavLink> */}
                    </ul>
                    {login &&
                        <Logout sideBarGrow={sideBarGrow} />
                    }
                </div>
            </div>
        </div>
    );
}

export default HomeLeftSideBar;



function Logout({ sideBarGrow }) {
    const { login, user } = useSelector((state) => state.login)
    const handleLogout = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/logout`
            await axios.get(url, { withCredentials: true })
                .then(res => console.log(res))
            setTimeout(() => { window.location.reload() }, 200)
        } catch (error) {
            console.error('Error during Logout: ', error)
        }
    }
    return (
        <div
            onClick={handleLogout}
            className={"inactive-link"}
        >
            <div style={{ listStyle: "none" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5em' }}>
                    {sideBarGrow && <span>Logout</span>}
                    <i className="ri-shut-down-line"></i>
                </div>
            </div>
        </div>
    );
}