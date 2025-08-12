import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Employees(props) {

    const [EMP, setEMP] = useState();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const url = `http://localhost:3000/employees`;
                const response = await axios.get(url);
                setEMP(response.data.employees);
                // console.log(response.data.employees); // API response data
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100%' }}>
            <div style={{ marginTop: '4em', display: 'flex', justifyContent: 'space-between', width: "100%", padding: '2em 0' }}>
                <h2 style={{ marginLeft: '2em', fontSize: "1.5em", fontWeight: '500' }}>Employees</h2>
                <Link to={'/addInfo'}><button style={{ marginRight: '2em', padding: '0.5em 3em' }}>Add +</button></Link>
            </div>
            <div className='employeeTable'>
                <div className='tableHeader'>
                    <h5>Employee ID</h5>
                    <h5>Name</h5>
                    <h5>Department</h5>
                    <h5>Role</h5>
                    <h5>Salary</h5>
                    <h5>Joining Date</h5>
                </div>
                {
                    EMP ?
                        EMP.map((employee, idx) => (
                            <div key={idx} className='tableData'>
                                <h6>{employee?.employeeId}</h6>
                                <h6>{employee?.name}</h6>
                                <h6>{employee?.department}</h6>
                                <h6>{employee?.designation}</h6>
                                <h6>{employee?.netSalary}</h6>
                                <h6>{employee?.dateOfJoining}</h6>
                            </div>
                        ))
                        :
                        <p style={{ height: '20vh', paddingTop: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loding...</p>
                }
            </div>
            {/* <div>
                1,2,3, next
            </div> */}
        </div>
    );
}

export default Employees;