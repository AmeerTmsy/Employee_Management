import React, { useState } from 'react';
import classes from './leave.module.css';
import { useSelector } from 'react-redux';
import PublicLeaves from '../components/adminComponents/publicLeaves';
import EmployeeLeavePendingRequests from '../components/adminComponents/employeeLeaveRequests';

function Leave(props) {///////////////////////////////
    const { user } = useSelector((state) => state.login)
    const [showLeaveRequest, setShowLeaveRequest] = useState(true)
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.5em 2em' }}>
                <h2 style={{ fontSize: '1.3em', fontWeight: '700' }}>leaves</h2>
                {user.userType === 'admin' && // now it is the admin who can only be able to switch between PH and EL. Otherwise the component won't render.
                    <div onClick={() => setShowLeaveRequest(!showLeaveRequest)} className={classes.headingDiv}>
                        <p><span style={{ display: 'inline-block', paddingTop: '0px' }}>P H</span></p>
                        <p><span style={{ display: 'inline-block', paddingTop: '0px' }}>E L</span></p>
                        <span style={{
                            backgroundColor: `${showLeaveRequest ? '#379fe4ff' : '#ff5d44ff'}`,
                            ...(showLeaveRequest ? { left: 0, right: '36px' } : { right: 0, left: '36px' }),
                        }} className={classes.showLeaveRequestOrNot}><span style={{ display: 'inline-block', paddingTop: '1px' }}>{showLeaveRequest ? 'P H' : 'E L'}</span></span>
                    </div>
                }
            </div>
            {showLeaveRequest ?
                <PublicLeaves classes={classes} /> :
                <EmployeeLeavePendingRequests classes={classes} />
            }
        </div>
    );
}

export default Leave;