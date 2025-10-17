// App.jsx
import React, { useEffect, useState } from "react";
import { Document, Image, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
// import SalarySlip from "./SalarySlip";
import inrLogo from '../../../assets/inrLogo.png'
import classes from './salarySlip.module.css'
import axios from "axios";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 20,
    },
    section: {
        display: 'flex',
        gap: 10,
        // margin: 10,
        padding: 10,
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    headings: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    boxOne: {
        // backgroundColor: 'red'
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 15
    },
    boxTwo: {
        backgroundColor: 'blue'
    },
    boxOneRow: {
        display: 'flex'
    },
    boxCell: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 120,
        border: '1px solid black',
        fontSize: 12
    },
    logoImage: {
        height: 10,
        width: 10,
    },
});

function SalarySlip({ employee }) {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(()=>{
        console.log(pdfUrl);
    },[pdfUrl])

    async function sendSalarySlipMail() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/salary-slip/${employee._id}`;
            const response = await axios.get(url);
            console.log(response);
            // const { success, pdfBuffer } = response.data;

            // if (success && pdfBuffer) {
            //     const uint8Array = new Uint8Array(pdfBuffer.data);
            //     console.log('uint8Array: ', uint8Array)
            //     const blob = new Blob([uint8Array], { type: 'application/pdf' });
            //     console.log('blob: ', blob)
            //     const url = window.URL.createObjectURL(blob);
            //     console.log('url: ', url)
                
            //     setPdfUrl(url);
            // }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '0.3em 0' }}>
            <div style={{ width: '60%', borderRadius: '3px' }}>
                {/* {pdfUrl && (
                    <div>
                        <h3>PDF Preview</h3> */}
                        {/* Use embed or iframe to display the PDF */}
                        {/* <embed
                            src={pdfUrl}
                            type="application/pdf"
                            width="100%"
                            height="600px"
                        /> */}
                        {/* Alternatively, you can use an iframe */}
                        {/* <iframe src={pdfUrl} width="100%" height="600px" title="PDF Preview" />
                    </div>
                )} */}
                <PDFViewer width="100%" height="600">
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.head}>
                                <Text style={{ fontWeight: 700, paddingTop: 20, paddingBottom: 20 }}>Pay Slip for February 2025</Text>
                            </View>
                            <View style={styles.head}>
                                <View style={styles.headings}>
                                    <View style={styles.section}>
                                        <Text>Employee ID</Text>
                                        <Text>Name</Text>
                                        <Text>Designation</Text>
                                        <Text>Department</Text>
                                        <Text>Date of Joining</Text>
                                    </View>
                                    <View style={styles.section}>
                                        <Text>EMP0002</Text>
                                        <Text>Unni Kuttan</Text>
                                        <Text>app developer</Text>
                                        <Text>development</Text>
                                        <Text>4/8/2024</Text>
                                    </View>
                                </View>
                                <View style={styles.headings}>
                                    <View style={styles.section}>
                                        <Text>Bank</Text>
                                        <Text>Account No</Text>
                                        <Text>IFSC</Text>
                                        <Text>Branch</Text>
                                    </View>
                                    <View style={styles.section}>
                                        <Text>Punjab National Banck</Text>
                                        <Text>1234567891236547</Text>
                                        <Text>PUNB0430900</Text>
                                        <Text>Malappuram</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.boxOne}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View style={styles.boxOneRow}>
                                        <View style={styles.boxCell}><Text>Gross Wages</Text></View>
                                        <View style={styles.boxCell}><Text>Total Working Days</Text></View>
                                        <View style={styles.boxCell}><Text>LOP Days</Text></View>
                                    </View>
                                    <View style={styles.boxOneRow}>
                                        <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />10,000.00</Text></View>
                                        <View style={styles.boxCell}><Text>30</Text></View>
                                        <View style={styles.boxCell}><Text>1</Text></View>
                                    </View>
                                    <View style={styles.boxOneRow}>
                                        <View style={styles.boxCell}><Text>0</Text></View>
                                        <View style={styles.boxCell}><Text>Leaves</Text></View>
                                        <View style={styles.boxCell}><Text>Paid days</Text></View>
                                    </View>
                                    <View style={styles.boxOneRow}>
                                        <View style={styles.boxCell}><Text>0</Text></View>
                                        <View style={styles.boxCell}><Text>2</Text></View>
                                        <View style={styles.boxCell}><Text>29</Text></View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.boxOne}>
                                <View style={{ display: 'flex', flexDirection: 'column', }}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View style={{ width: 240, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 }}><Text>Earnings</Text></View>
                                        <View style={{ width: 240, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 }}><Text>Deductions</Text></View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View style={styles.boxCell}><Text>Basic</Text></View>
                                        <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />10000.00</Text></View>
                                        <View style={styles.boxCell}><Text>LOP (loss of pay/leave)</Text></View>
                                        <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />500</Text></View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View style={styles.boxCell}><Text>_</Text></View>
                                        <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />0</Text></View>
                                        <View style={styles.boxCell}><Text>_</Text></View>
                                        <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />0</Text></View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View style={styles.boxCell}><Text>Total Earnings</Text></View>
                                        <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />10,000.00</Text></View>
                                        <View style={styles.boxCell}><Text>Total Deductions</Text></View>
                                        <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />500</Text></View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View style={{ width: 360, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 }}><Text>Net Salary</Text></View>
                                        <View style={{ width: 120, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 }}><Text><Image style={styles.logoImage} src={inrLogo} />10,000.00</Text></View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ fontSize: 13, margin: 40 }}>
                                <Text>ABHINAV K</Text>
                                <Text>HR MANAGER</Text>
                                <Text>EUPHORICODERS PVT LTD</Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
            <div style={{ width: '40%', backgroundColor: 'white', height: '93vh', margin: '0em 0.5em', textAlign: 'center', border: '1px solid gray', borderRadius: '3px' }}>
                <button onClick={sendSalarySlipMail} style={{ width: '13em', textAlign: 'center', padding: '1em 0', margin: '2em' }}><i class="ri-mail-send-line"></i> &nbsp; Send Mail</button>
            </div>
        </div>
    );
}

export default SalarySlip;