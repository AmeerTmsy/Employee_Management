import React, { useEffect, useState } from 'react';
import classes from './profile.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux';

function Profile({ setEdit }) {
    const { user } = useSelector((state) => state.login)
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        async function fetectProfile() {
            try {
                const url = `${import.meta.env.VITE_API_URL}/employees/${user.userId}`;
                const response = await axios.get(url);
                setEmployee(response.data.employee)
            } catch (err) {
                console.log("error retrieving employee, error:", err)
            }
            // console.log(response.data.employee);
        }
        fetectProfile()
    }, [])

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
                            <p>{employee.name ? employee.name : "Name"}</p>
                            <div>
                                <p>{employee.email ? employee.email : 'exampl@gamil.com'}</p>
                            </div>
                        </div>
                        <p>{employee?.designation ? employee.designation : 'Designation'}</p>
                        <p>{employee?.department ? employee.department : 'Department'}</p>
                        <p>{employee?.dateOfJoining ? employee.dateOfJoining : 'Date of joining'}</p>
                        <p>{employee?.netSalary ? employee.netSalary : 'Salary'}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2em' }}>
                        <button
                            style={{ width: '8em', height: '2em', backgroundColor: '#1528ffff', color: '#fff', border: '1px solid gray', borderRadius: '3px', fontSize: '1.1em' }}
                            onClick={()=> setEdit(true)}
                        >Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;