import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Employees(props) {

    const [EMP, setEMP] = useState();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/employees`;
                const response = await axios.get(
                    url,
                    {
                        withCredentials: true,
                        headers: {
                            "ngrok-skip-browser-warning": "true"
                        }
                    }
                );
                setEMP(response.data.employees);
                console.log(response.data.employees); // API response data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchEmployees();
    }, [])

    useEffect(() => {
        // console.log(EMP);
    }, [EMP])

    return (
        <div style={{padding: '0 1.5em'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: "100%", padding: '1.5em 0 1.1em 0' }}>
                    <h2 style={{ fontSize: "1.3em", fontWeight: '700', marginLeft: '0.5em' }}>employees</h2>
                    <Link to={'/admin/addInfo'}><button style={{ marginRight: '2em', padding: '0.5em 3em' }}>Add +</button></Link>
                </div>
                <div className='employeeTable'>
                    <div className='tableHeader'>
                        <h5>Employee ID</h5>
                        <h5>Name</h5>
                        <h5>Department</h5>
                        <h5>Role</h5>
                        <h5 style={{textAlign: 'center'}}>Salary</h5>
                        <h5 style={{textAlign: 'end'}}>Joining Date</h5>
                    </div>
                    {
                        EMP ?
                            EMP.map((employee, idx) => (
                                <Link to={employee?._id} key={idx} className='tableData'>
                                    <p style={{overflow: 'hidden'}}>{employee?.employeeId}</p>
                                    <p style={{overflow: 'hidden'}}>{employee?.name}</p>
                                    <p style={{overflow: 'hidden'}}>{employee?.department}</p>
                                    <p style={{overflow: 'hidden'}}>{employee?.designation}</p>
                                    <p style={{overflow: 'hidden', textAlign: 'center'}}>{employee?.netSalary}</p>
                                    <p style={{overflow: 'hidden', textAlign: 'end'}}>{employee?.dateOfJoining}</p>
                                </Link>
                            ))
                            :
                            <p style={{ height: '20vh', paddingTop: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loding...</p>
                    }
                </div>
                {/* <div>
                1,2,3, next
            </div> */}
            </div>
        </div>
    );
}

export default Employees;