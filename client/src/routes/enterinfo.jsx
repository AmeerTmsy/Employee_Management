import React, { useEffect, useState } from 'react';
import designations from '../data/designations ';
import departments from '../data/departments';
import candidates from '../data/employees';
import monthNames from '../data/monthNames';
import axios from 'axios';

function Enterinfo(props) {
    const currentDate = new Date();
    const currentMonth = monthNames[currentDate.getMonth()];
    
    const [info, setInfo] = useState({
        // 1. Basic Info
        employeeId: '',
        name: '',
        email: '',
        designation: '',
        department: '',

        // 2. Job & Work Details
        workLocation: '',
        workingHours: '',
        paymentSchedule: '',
        noticePeriod: '',

        // 3. Banking & Payment Info
        bank: '',
        accountNo: '',
        ifsc: '',
        branch: '',

        // 4. Leaves & Attendance
        totalWorkingDays: 0,
        benefits: {
            casualLeave: 0,
            sickLeave: 0,
        },
        leaves: 0,
        lopDays: 0,
        paidDays: 0,

        // 5. Salary Breakdown
        grossWages: 0,
        earnings: {
            basic: 0,
            totalEarnings: 0,
        },
        deductions: {
            lop: 0,
            totalDeductions: 0,
        },
        netSalary: 0,

        // 6. Responsibilities & Policies
        responsibilities: [],
        conditionsOfEmployment: [],

        // 7. Dates
        dateOfJoining: '',
        // allowedLeaves: {
        //     Jan: 6,
        //     Feb: 5,
        //     Mar: 5,
        //     Apr: 5,
        //     May: 6,
        //     Jun: 5,
        //     Jul: 5,
        //     Aug: 7,
        //     Sep: 5,
        //     Oct: 5,
        //     Nov: 6,
        //     Dec: 6,
        // },
        offerAcceptanceDate: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        designation: '',
        department: '',
        netSalary: '',
        dateOfJoining: '',
        bank: '',
        accountNo: '',
        ifsc: '',
        branch: '',
    });

    const formValidate = () => {
        let valid = true;
        let newErrors = {
            name: '',
            email: '',
            designation: '',
            department: '',
            netSalary: '',
            dateOfJoining: '',
            bank: '',
            accountNo: '',
            ifsc: '',
            branch: '',
        }

        if (!info.name) {
            newErrors.name = 'Name is required';
            valid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!info.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!emailRegex.test(info.email)) {
            newErrors.email = 'Please enter a valid email';
            valid = false;
        }
        if (!info.designation) {
            newErrors.designation = 'Designation is required';
            valid = false;
        }
        if (!info.department) {
            newErrors.department = 'Department is required';
            valid = false;
        }
        if (!info.netSalary) {
            newErrors.netSalary = 'NetSalary is required';
            valid = false;
        }
        if (!info.dateOfJoining) {
            newErrors.dateOfJoining = 'DateOfJoining is required';
            valid = false;
        }
        if (!info.bank) {
            newErrors.bank = 'Bank is required';
            valid = false;
        }
        if (!info.accountNo) {
            newErrors.accountNo = 'AccountNo is required';
            valid = false;
        }
        if (!info.ifsc) {
            newErrors.ifsc = 'IFSC is required';
            valid = false;
        }
        if (!info.branch) {
            newErrors.branch = 'Branch is required';
            valid = false;
        }

        setErrors({ ...errors, ...newErrors });
        return valid
    }

    // useEffect(() => {
    //     console.log("info: ", info, "\nerrors: ", errors);
    // }, [info, errors])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValidate()) return;

        console.log("info: ", info)
        try {
            const url = `http://localhost:3000/employees`
            const response = await axios.post(url, info);
            console.log('response.data:', response.data); // API response data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // candidates.push(info)
    }
    return (
        <div style={{ paddingTop: '', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{
                border: 1,
                width: '95%',
                height: '80%',
                marginTop: '2em',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <form onSubmit={handleSubmit}>
                    <div style={{
                        padding: '2em',
                        borderRadius: '5px',
                        boxShadow: '-3px 0px 10px #c4c4c4, 1px -3px 10px #c4c4c4'
                    }}>
                        <div className="basicData">
                            <div>
                                <input style={{ padding: "0.7em 1em", fontSize: '1em', border: '1px solid #6f6f6fff' }}
                                    type="text"
                                    id='name'
                                    name='name'
                                    placeholder='name'
                                    value={info.name}
                                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                                />
                                {errors.name && <p className="error">{errors.name}</p>}
                            </div>
                            <div>
                                <input style={{ padding: "0.7em 1em", fontSize: '1em', border: '1px solid #6f6f6fff' }}
                                    type="text"
                                    id='email'
                                    name='email'
                                    placeholder='email'
                                    value={info.email}
                                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div>
                                <select
                                    style={{
                                        padding: "0.7em 1em",
                                        fontSize: '1em',
                                        border: '1px solid #6f6f6fff',
                                        fontFamily: '"Montserrat", sans-serif',
                                        color: info.designation ? '#000' : '#6f6f6f',
                                        width: '96%'
                                    }}
                                    id='designation'
                                    name='designation'
                                    value={info.designation}
                                    onChange={(e) => setInfo({ ...info, designation: e.target.value })}
                                >
                                    <option value="">Select designation</option>
                                    {designations.map((role, index) => (
                                        <option key={index} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                                {errors.designation && <p className="error">{errors.designation}</p>}
                            </div>
                            <div>
                                <select
                                    style={{
                                        padding: "0.7em 1em",
                                        fontSize: '1em',
                                        border: '1px solid #6f6f6fff',
                                        color: info.department ? '#000' : '#6f6f6f', // placeholder-like color
                                        fontFamily: '"Montserrat", sans-serif',
                                        width: '95%'
                                    }}
                                    id='department'
                                    name='department'
                                    value={info.department}
                                    onChange={(e) => setInfo({ ...info, department: e.target.value })}
                                >
                                    <option value="" disabled hidden>Select department</option>
                                    {departments.map((dept, index) => (
                                        <option key={index} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                                {errors.department && <p className="error">{errors.department}</p>}
                            </div>
                            <div>
                                <input style={{ padding: "0.7em 1em", fontSize: '1em', border: '1px solid #6f6f6fff' }}
                                    type="number"
                                    id='netSalary'
                                    name='netSalary'
                                    placeholder='Net Salary in ₹'
                                    value={info.netSalary}
                                    onChange={(e) => setInfo({ ...info, netSalary: e.target.value })}
                                />
                                {errors.netSalary && <p className="error">{errors.netSalary}</p>}
                            </div>
                            <div>
                                <input style={{ padding: "0.7em 1em", fontSize: '1em', border: '1px solid #6f6f6fff', width: '83.5%', height: '51%' }}
                                    type="date"
                                    id='dateOfJoining'
                                    name='dateOfJoining'
                                    placeholder='dateOfJoining'
                                    value={info.dateOfJoining}
                                    onChange={(e) => setInfo({ ...info, dateOfJoining: e.target.value })}
                                />
                                {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}
                            </div>
                        </div>


                        <div className='bankData'>
                            <div>
                                <input style={{ padding: "0.7em 1em", fontSize: '1em', border: '1px solid #6f6f6fff' }}
                                    type="text"
                                    id='bank'
                                    name='bank'
                                    placeholder='bank'
                                    value={info.bank}
                                    onChange={(e) => setInfo({ ...info, bank: e.target.value })}
                                />
                                {errors.bank && <p className="error">{errors.bank}</p>}
                            </div>
                            <div>
                                <input style={{ padding: "0.7em 1em", fontSize: '1em', border: '1px solid #6f6f6fff' }}
                                    type="text"
                                    id='accountNo'
                                    name='accountNo'
                                    placeholder='accountNo'
                                    value={info.accountNo}
                                    onChange={(e) => setInfo({ ...info, accountNo: e.target.value })}
                                />
                                {errors.accountNo && <p className="error">{errors.accountNo}</p>}
                            </div>
                            <div>
                                <input style={{ padding: "0.7em 1em", fontSize: '1em', border: '1px solid #6f6f6fff' }}
                                    type="text"
                                    id='ifsc'
                                    name='ifsc'
                                    placeholder='ifsc'
                                    value={info.ifsc}
                                    onChange={(e) => setInfo({ ...info, ifsc: e.target.value })}
                                />
                                {errors.ifsc && <p className="error">{errors.ifsc}</p>}
                            </div>
                            <div>
                                <input style={{ padding: "0.7em 1em", fontSize: '1em', border: '1px solid #6f6f6fff' }}
                                    type="text"
                                    id='branch'
                                    name='branch'
                                    placeholder='branch'
                                    value={info.branch}
                                    onChange={(e) => setInfo({ ...info, branch: e.target.value })}
                                />
                                {errors.branch && <p className="error">{errors.branch}</p>}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
                            <button
                                type='submit'
                                style={{ width: '10em', height: '2.5em', backgroundColor: '#c0c0c0ff', border: '1px solid #8f8f8fff', borderRadius: '3px' }}
                            >Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Enterinfo;