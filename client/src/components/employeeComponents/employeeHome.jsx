import React, { useEffect, useState } from 'react';
import classes from "./employeeHome.module.css"
import axios from 'axios';
import { getDistance } from 'geolib';
function EmployeeHome({ todayDayName, fullDate }) {
    const [punchin, setPunchin] = useState(false);
    const [allowedIPA, setAllowedIPA] = useState(false);
    const [isInLocation, setIsInLocation] = useState(false);

    // useEffect(() => {
    //     const API_URL = import.meta.env.VITE_API_URL;
    //     axios.get(`${API_URL}/api/check`, {
    //         headers: {
    //             "ngrok-skip-browser-warning": "true",
    //         },
    //         withCredentials: true,
    //     })
    //         .then((res) => setAllowedIPA(res.data.allowed))
    //         .catch((err) => {
    //             if (err.response) console.error("Server responded with error:", err.response.status, err.response.data);
    //             else console.error("Network/Other error:", err.message);
    //         });
    // }, []);

    useEffect(() => {
        console.log("ipAddress: ", allowedIPA);
    }, [allowedIPA]);

    useEffect(() => {
        const officeCoords = { latitude: 10.988326, longitude: 76.225535 };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("latitude: ", position.coords.latitude, "\nlongitude: ", position.coords.longitude,);
                    var dis = getDistance(
                        officeCoords,
                        { latitude: position.coords.latitude, longitude: position.coords.longitude },
                    );
                    console.log(`Distance: `, dis, ` meters`);
                    if(dis< 10){
                        console.log(dis)
                         setIsInLocation(true)
                         console.log(isInLocation)
                    }
                    else setIsInLocation(false)
                },
                (err) => {
                    console.log(err.message)
                }
            )
        } else {
            console.log("Geolocation is not supported by your browser.");
        }
    }, [])


    const hangelAttendance = () => {
        setPunchin(pre => !pre)
    }
    return (
        <div className='home1'>
            <div to={'/'} className={`${classes.employeePunch} ${punchin ? classes.punchOn : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1em', position: 'relative' }}>
                    <p>{punchin ?
                        <i className={`ri-emotion-happy-line ${classes.punchIcon} ${classes.punchIconSmile}`}></i>
                        :
                        <i className={`ri-emotion-normal-line ${classes.punchIcon}`}></i>
                    }</p>
                    <p >{todayDayName}, {fullDate}</p>
                </div>
                <div>
                    <button disabled={!isInLocation} className={`${classes.punchBtn} ${punchin ? classes.punchBtnOn : ""}`} onClick={hangelAttendance}>{punchin ? 'Off' : 'On'}</button>
                </div>
                {isInLocation === false && <span style={{ fontSize: '0.8em', position: 'absolute', bottom: '2px', left: '50%', color: 'red', transform: 'translate(-50%)' }}>You are not in the right connection to mark you attendance</span>}
            </div>

        </div>
    );
}


export default EmployeeHome;