import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Header() {
    const { login, user } = useSelector((state) => state.login)
    const { userType } = user || {}
    const location = useLocation()

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
            <div style={{ height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 2em' }}>
                <div>
                    <ul style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <li style={{ padding: '0 1em' }}>
                            <NavLink
                                to={`${userType}/downloads`}
                                className={({ isActive }) =>
                                    isActive ? "active-link" : "inactive-link"
                                }
                            >
                                Download
                            </NavLink>
                        </li> */}
                        {login &&
                            <button
                                onClick={handleLogout}
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
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;