import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import OfferLetterPDF from '../components/OfferLetterPDF';
import candidates from '../data/employees';

function Download(props) {
    const [currentEmployee, setCurrentEmployee] = useState(candidates[0]);

    const handleChange = (e) => {
        const selectedId = e.target.value;
        const selectedEmployee = candidates.find(emp => emp.employeeId === selectedId);
        if (selectedEmployee) {
            setCurrentEmployee(selectedEmployee);
        }
    };
    return (
        <div style={{ position: 'relative' , paddingTop: '5em'}}>

            {/* Dropdown and Download Button in one row */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    padding: '0.5em 2em',
                }}
            >
                <h2>Offer Letter Preview</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label htmlFor="employeeSelect"></label>
                    <select
                        id="employeeSelect"
                        value={currentEmployee.employeeId}
                        onChange={handleChange}
                        style={{
                            padding: '0.5em 1em',
                            fontSize: '1rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            minWidth: '200px',
                        }}
                    >
                        {candidates.map((candidate) => (
                            <option key={candidate.employeeId} value={candidate.employeeId}>
                                {candidate.name}
                            </option>
                        ))}
                    </select>
                </div>

                <PDFDownloadLink
                    document={<OfferLetterPDF employee={currentEmployee} />}
                    fileName={`Offer_Letter_${currentEmployee.name}.pdf`}
                >
                    {({ loading }) => (
                        <button
                            style={{
                                padding: '0.8em 1.5em',
                                backgroundColor: '#7130A0',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {loading ? 'Generating PDF...' : `Download Offer Letter`}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>

            {/* PDF Preview */}
            <div style={{
                // margin: '10rem',
            }}>

                <PDFViewer style={{ width: '100%', height: '90vh', border: '1px solid #ccc' }}>
                    <OfferLetterPDF employee={currentEmployee} />
                </PDFViewer>
            </div>
        </div>
    );
}

export default Download;