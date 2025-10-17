const React = require('react');
const ReactPDF = require('@react-pdf/renderer');
const { Document, Page, Text, View, StyleSheet, Image } = ReactPDF;

const inrLogo = './assets/inrLogo.png';

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 20,
    },
    section: {
        display: 'flex',
        gap: 10,
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

function SalarySlipPDF() {
    return React.createElement(
        Document,
        null,
        React.createElement(
            Page,
            { size: "A4", style: styles.page },
            React.createElement(
                View,
                { style: styles.head },
                React.createElement(Text, { style: { fontWeight: 700, paddingTop: 20, paddingBottom: 20, backgroundColor: 'red' } }, "Pay Slip for February 2025")
            ),
            React.createElement(
                View,
                { style: styles.head },
                React.createElement(
                    View,
                    { style: styles.headings },
                    React.createElement(
                        View,
                        { style: styles.section },
                        React.createElement(Text, null, "Employee ID"),
                        React.createElement(Text, null, "Name"),
                        React.createElement(Text, null, "Designation"),
                        React.createElement(Text, null, "Department"),
                        React.createElement(Text, null, "Date of Joining")
                    ),
                    React.createElement(
                        View,
                        { style: styles.section },
                        React.createElement(Text, null, "EMP0002"),
                        React.createElement(Text, null, "Unni Kuttan"),
                        React.createElement(Text, null, "app developer"),
                        React.createElement(Text, null, "development"),
                        React.createElement(Text, null, "4/8/2024")
                    )
                ),
                React.createElement(
                    View,
                    { style: styles.headings },
                    React.createElement(
                        View,
                        { style: styles.section },
                        React.createElement(Text, null, "Bank"),
                        React.createElement(Text, null, "Account No"),
                        React.createElement(Text, null, "IFSC"),
                        React.createElement(Text, null, "Branch")
                    ),
                    React.createElement(
                        View,
                        { style: styles.section },
                        React.createElement(Text, null, "Punjab National Banck"),
                        React.createElement(Text, null, "1234567891236547"),
                        React.createElement(Text, null, "PUNB0430900"),
                        React.createElement(Text, null, "Malappuram")
                    )
                )
            ),
            React.createElement(
                View,
                { style: styles.boxOne },
                React.createElement(
                    View,
                    { style: { display: 'flex', flexDirection: 'row' } },
                    React.createElement(
                        View,
                        { style: styles.boxOneRow },
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "Gross Wages")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "Total Working Days")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "LOP Days"))
                    ),
                    React.createElement(
                        View,
                        { style: styles.boxOneRow },
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, React.createElement(Image, { style: styles.logoImage, src: inrLogo }), "10,000.00")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "30")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "1"))
                    ),
                    React.createElement(
                        View,
                        { style: styles.boxOneRow },
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "0")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "Leavs")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "Paid days"))
                    ),
                    React.createElement(
                        View,
                        { style: styles.boxOneRow },
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "0")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "2")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "29"))
                    )
                )
            ),
            React.createElement(
                View,
                { style: styles.boxOne },
                React.createElement(
                    View,
                    { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement(
                        View,
                        { style: { display: 'flex', flexDirection: 'row' } },
                        React.createElement(View, { style: { width: 240, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 } }, React.createElement(Text, null, "Ernings")),
                        React.createElement(View, { style: { width: 240, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 } }, React.createElement(Text, null, "Dedusctons"))
                    ),
                    React.createElement(
                        View,
                        { style: { display: 'flex', flexDirection: 'row' } },
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "Basic")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, React.createElement(Image, { style: styles.logoImage, src: inrLogo }), "10000.00")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "LOP (loss of pay/leave)")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, React.createElement(Image, { style: styles.logoImage, src: inrLogo }), "500"))
                    ),
                    React.createElement(
                        View,
                        { style: { display: 'flex', flexDirection: 'row' } },
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "_")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, React.createElement(Image, { style: styles.logoImage, src: inrLogo }), "0")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "_")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, React.createElement(Image, { style: styles.logoImage, src: inrLogo }), "0"))
                    ),
                    React.createElement(
                        View,
                        { style: { display: 'flex', flexDirection: 'row' } },
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "Total Earnings")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, React.createElement(Image, { style: styles.logoImage, src: inrLogo }), "10,000.00")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, "Total Deductions")),
                        React.createElement(View, { style: styles.boxCell }, React.createElement(Text, null, React.createElement(Image, { style: styles.logoImage, src: inrLogo }), "500"))
                    ),
                    React.createElement(
                        View,
                        { style: { display: 'flex', flexDirection: 'row' } },
                        React.createElement(View, { style: { width: 360, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 } }, React.createElement(Text, null, "Net Salary")),
                        React.createElement(View, { style: { width: 120, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 } }, React.createElement(Text, null, React.createElement(Image, { style: styles.logoImage, src: inrLogo }), "10,000.00"))
                    )
                )
            ),
            React.createElement(
                View,
                { style: { fontSize: 13, margin: 40 } },
                React.createElement(Text, null, "ABHINAV K"),
                React.createElement(Text, null, "HR MANAGER"),
                React.createElement(Text, null, "EUPHORICODERS PVT LTD")
            )
        )
    );
}

const generateSalarySlipPDF = async () => {
    const pdfBuffer = await ReactPDF.renderToBuffer(React.createElement(SalarySlipPDF));
    return pdfBuffer;
};

module.exports = generateSalarySlipPDF;


//////////////////////////////////////////////////////////////////////////////////
// const React = require('react') 
// const ReactPDF = require('@react-pdf/renderer')
// const { Document, Page, Text, View, StyleSheet, Image } = ReactPDF

// const inrLogo = "../assets/inrLogo.png"

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: "column",
//         backgroundColor: "#fff",
//         padding: 20,
//     },
//     section: {
//         display: 'flex',
//         gap: 10,
//         // margin: 10,
//         padding: 10,
//         fontSize: 14,
//     },
//     title: {
//         fontSize: 20,
//         marginBottom: 10,
//     },
//     headings: {
//         display: 'flex',
//         flexDirection: 'row',
//         marginBottom: 30
//     },
//     head: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-evenly'
//     },
//     boxOne: {
//         // backgroundColor: 'red'
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         paddingBottom: 15
//     },
//     boxTwo: {
//         backgroundColor: 'blue'
//     },
//     boxOneRow: {
//         display: 'flex'
//     },
//     boxCell: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: 30,
//         width: 120,
//         border: '1px solid black',
//         fontSize: 12
//     },
//     logoImage: {
//         height: 10,
//         width: 10,
//     },
// });


// function SalarySlipPDF(props) {
//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <View style={styles.head}>
//                     <Text style={{ fontWeight: 700, paddingTop: 20, paddingBottom: 20 }}>Pay Slip for February 2025</Text>
//                 </View>
//                 <View style={styles.head}>
//                     <View style={styles.headings}>
//                         <View style={styles.section}>
//                             <Text>Employee ID</Text>
//                             <Text>Name</Text>
//                             <Text>Designation</Text>
//                             <Text>Department</Text>
//                             <Text>Date of Joining</Text>
//                         </View>
//                         <View style={styles.section}>
//                             <Text>EMP0002</Text>
//                             <Text>Unni Kuttan</Text>
//                             <Text>app developer</Text>
//                             <Text>development</Text>
//                             <Text>4/8/2024</Text>
//                         </View>
//                     </View>
//                     <View style={styles.headings}>
//                         <View style={styles.section}>
//                             <Text>Bank</Text>
//                             <Text>Account No</Text>
//                             <Text>IFSC</Text>
//                             <Text>Branch</Text>
//                         </View>
//                         <View style={styles.section}>
//                             <Text>Punjab National Banck</Text>
//                             <Text>1234567891236547</Text>
//                             <Text>PUNB0430900</Text>
//                             <Text>Malappuram</Text>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={styles.boxOne}>
//                     <View style={{ display: 'flex', flexDirection: 'row' }}>
//                         <View style={styles.boxOneRow}>
//                             <View style={styles.boxCell}><Text>Gross Wages</Text></View>
//                             <View style={styles.boxCell}><Text>Total Working Days</Text></View>
//                             <View style={styles.boxCell}><Text>LOP Days</Text></View>
//                         </View>
//                         <View style={styles.boxOneRow}>
//                             <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />10,000.00</Text></View>
//                             <View style={styles.boxCell}><Text>30</Text></View>
//                             <View style={styles.boxCell}><Text>1</Text></View>
//                         </View>
//                         {/* </View>
//                                         <View style={{display: 'flex', flexDirection: 'row'}}> */}
//                         <View style={styles.boxOneRow}>
//                             <View style={styles.boxCell}><Text>0</Text></View>
//                             <View style={styles.boxCell}><Text>Leavs</Text></View>
//                             <View style={styles.boxCell}><Text>Paid days</Text></View>
//                         </View>
//                         <View style={styles.boxOneRow}>
//                             <View style={styles.boxCell}><Text>0</Text></View>
//                             <View style={styles.boxCell}><Text>2</Text></View>
//                             <View style={styles.boxCell}><Text>29</Text></View>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={styles.boxOne}>
//                     <View style={{ display: 'flex', flexDirection: 'column', }}>
//                         <View style={{ display: 'flex', flexDirection: 'row' }}>
//                             <View style={{ width: 240, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 }}><Text>Ernings</Text></View>
//                             <View style={{ width: 240, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 }}><Text>Dedusctons</Text></View>
//                         </View>
//                         <View style={{ display: 'flex', flexDirection: 'row' }}>
//                             <View style={styles.boxCell}><Text>Basic</Text></View>
//                             <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />10000.00</Text></View>
//                             <View style={styles.boxCell}><Text>LOP (loss of pay/leave)</Text></View>
//                             <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />500</Text></View>
//                         </View>
//                         <View style={{ display: 'flex', flexDirection: 'row' }}>
//                             <View style={styles.boxCell}><Text>_</Text></View>
//                             <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />0</Text></View>
//                             <View style={styles.boxCell}><Text>_</Text></View>
//                             <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />0</Text></View>
//                         </View>
//                         <View style={{ display: 'flex', flexDirection: 'row' }}>
//                             <View style={styles.boxCell}><Text>Total Earnings</Text></View>
//                             <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />10,000.00</Text></View>
//                             <View style={styles.boxCell}><Text>Total Deductions</Text></View>
//                             <View style={styles.boxCell}><Text><Image style={styles.logoImage} src={inrLogo} />500</Text></View>
//                         </View>
//                         <View style={{ display: 'flex', flexDirection: 'row' }}>
//                             <View style={{ width: 360, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 }}><Text>Net Salary</Text></View>
//                             <View style={{ width: 120, fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', height: 30 }}><Text><Image style={styles.logoImage} src={inrLogo} />10,000.00</Text></View>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={{ fontSize: 13, margin: 40 }}>
//                     <Text>ABHINAV K</Text>
//                     <Text>HR MANAGER</Text>
//                     <Text>EUPHORICODERS PVT LTD</Text>
//                 </View>
//             </Page>
//         </Document>
//     );
// }

// const generateSalarySlipPDF = async () => {
//   const pdfBuffer = await ReactPDF.renderToBuffer(<SalarySlipPDF />);
//   return pdfBuffer;
// };

// export default generateSalarySlipPDF;