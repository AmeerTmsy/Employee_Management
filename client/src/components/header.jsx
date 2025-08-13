import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header({ login, userType }) {

    return (
        <div style={{ width: '100%', height: '4em', backgroundColor: 'lightblue' }}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2em' }}>
                <h2 style={{ fontWeight: '700' }}><Link to={'/'}>manage</Link></h2>
                <div>
                    <ul style={{ display: 'flex', alignItems: 'center' }}>
                        <li style={{ padding: '0 1em' }}>
                            <Link to={'/'} >Home</Link>
                        </li>
                        <li style={{ padding: '0 1em' }}>
                            <Link to={'/downloads'} >download</Link>
                        </li>
                        <li style={{ padding: '0 1em' }}>
                            <Link to={'/employees'} >employees</Link>
                        </li>
                        <li style={{ padding: '0 1em' }}>
                            <Link to={'/presence'} >Presence</Link>
                        </li>
                        {!login &&
                            <li style={{ padding: '0 1em' }}>
                                <Link to={'/login'} >Login</Link>
                            </li>
                        }
                        {login &&
                            <li style={{ padding: '0 1em', color: 'white' }}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '1em', borderRadius: '50px', height:'10px', width: '10px'}}>
                                    <Link to={''} >{userType === 'admin' ? 'A': 'E'}</Link>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;