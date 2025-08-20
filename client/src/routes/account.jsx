import React from 'react';
import classes from './account.module.css'

function Account(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* <h1 style={{ marginTop: '5em', textAlign: 'center' }}>Account</h1> */}
            <div className={classes.home}>
                <div className={classes.profileImgP}>
                    <div style={{ border: '1px solid gray', borderRadius: '50%', padding: '0.3em' }}>
                        <div className={classes.profileImgDiv}>
                            <img className={classes.profileImg} src="https://images.icon-icons.com/2644/PNG/512/person_fill_icon_159457.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className={``}>
                    <div className={classes.profileDiscSub}>
                        <div className={classes.profileDiscSubDiv}>
                            <p>admin</p>
                            <div>
                                <p>email@gmail.com</p>
                            </div>
                        </div>
                        <p>Designation</p>
                        <p>Department</p>
                        <p>Date of joining</p>
                        <p>Salary</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;