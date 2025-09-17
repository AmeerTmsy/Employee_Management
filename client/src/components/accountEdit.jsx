import React, { useState } from 'react';
import styles from './accountEdit.module.css'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AccountEdit({ setEdit }) {
    const { login, user } = useSelector((state) => state.login)
    const [profileUpdationData, setProfileUpdationData] = useState({
        name: '',
        email: '',
        workLocation: '',
        bank: '',
        accountNo: '',
        ifsc: '',
        branch: '',
        grossWage: 0,
        totalWorkingDays: 0,
        workingHours: 0,
        paymentSchedule: '',
        noticePeriod: '',
        // responsibilities: [],
        // conditionsOfEmployment: [],
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/employees/${user.userId}`;
                const response = await axios.get(url, { withCredentials: true });
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEmployee();
    }, [])



    const handleProfileChange = async (e) => {
        e.preventDefault()

        const payload = Object.fromEntries(
            Object.entries(profileUpdationData).filter(([_, value]) => {
                if (typeof value === "string") return value.trim() !== "";
                if (typeof value === "number") return value !== 0;
                return value !== null && value !== undefined;
            })
        );
        console.log("payload: ", payload);
        if (Object.keys(payload).length === 0) return;

        try {
            // console.log(user.userId)
            const url = `${import.meta.env.VITE_API_URL}/employees/${user.userId}`;
            const response = await axios.patch(url, payload, { withCredentials: true });

            console.log(response.data); // API response data
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
    return (
        <div>
            <div>
                <p style={{ margin: '1em', padding: '0.5em 0', fontSize: '0.8em', fontWeight: '700', borderBottom: '1px solid gray' }}
                ><span
                    onClick={() => setEdit(false)}
                    style={{ cursor: 'pointer', color: '#586bffff' }}
                >account</span> {'>'} edit</p>
            </div>
            <div>
                <form onSubmit={handleProfileChange} style={{ margin: '1em 2em', display: 'flex', flexDirection: 'column', gap: '0.4em' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: "100%", gap: '1em' }}>
                        <div>
                            {/* <label htmlFor="">name</label> */}
                            <input style={{ width: '100%' }} value={profileUpdationData.name} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, name: e.target.value })} type="text" placeholder='Name' />
                        </div>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.email} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, email: e.target.value })} type="text" placeholder='Email' />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: "100%", gap: '1em' }}>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.workLocation} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, workLocation: e.target.value })} type="text" placeholder='Work Location' />
                        </div>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.bank} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, bank: e.target.value })} type="text" placeholder='Banck' />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: "100%", gap: '1em' }}>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.accountNo} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, accountNo: e.target.value })} type="text" placeholder='Account no' />
                        </div>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.ifsc} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, ifsc: e.target.value })} type="text" placeholder='IFSC' />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: "100%", gap: '1em' }}>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.branch} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, branch: e.target.value })} type="text" placeholder='Branch' />
                        </div>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.grossWage} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, grossWage: e.target.value })} type="number" placeholder='Gross Wage' />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: "100%", gap: '1em' }}>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.totalWorkingDays} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, totalWorkingDays: e.target.value })} type="number" placeholder='Total Working Days' />
                        </div>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.workingHours} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, workingHours: e.target.value })} type="number" placeholder='Working Hours' />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: "100%", gap: '1em' }}>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.paymentSchedule} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, paymentSchedule: e.target.value })} type="text" placeholder='Payment Schedule' />
                        </div>
                        <div>
                            <input style={{ width: '100%' }} value={profileUpdationData.noticePeriod} onChange={(e) => setProfileUpdationData({ ...profileUpdationData, noticePeriod: e.target.value })} type="text" placeholder='Notice Period' />
                        </div>
                    </div>
                    {/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: "100%", gap: '1em' }}>
                        <div style={{position: 'relative'}}>
                            <input style={{ width: '100%' }} type="text" placeholder='Responsibilities' />
                            <i style={{position: 'absolute', top: '8px', right: '0', cursor: 'pointer'}} class="ri-add-line"></i>
                        </div>
                        <div style={{position: 'relative'}}>
                            <input style={{ width: '100%' }} type="text" placeholder='ConditionsOfEmployment' />
                            <i style={{position: 'absolute', top: '8px', right: '0', cursor: 'pointer'}} class="ri-add-line"></i>
                        </div>
                    </div> */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1em' }}>
                        <button style={{ padding: '0.5em 2em', backgroundColor: '#0d8affff', border: '1px solid gray', borderRadius: '3px' }} type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountEdit;