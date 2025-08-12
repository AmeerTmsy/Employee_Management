import React from 'react';
import { Link } from 'react-router-dom';

function Header({ login }) {
    return (
        <div style={{ width: '100%', height: '4em', backgroundColor: 'lightblue' }}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2em' }}>
                <h2 style={{ fontWeight: '700' }}><Link to={'/'}>manage</Link></h2>
                <div>
                    <ul style={{ display: 'flex' }}>
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
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;