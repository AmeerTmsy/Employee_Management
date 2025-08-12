import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/logo.png';
import stamp from '../assets/stamp.png';
import craig from '../assets/craig.png';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
    color: '#000',
    paddingTop: 20,
    paddingBottom: 60,
  },
  sub: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerStripe: {
    backgroundColor: '#7130A0',
    height: 10,
    width: '100%',
    marginBottom: 10
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15
  },
  logo: {
    width: 300,
    height: 60
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#7130A0'
  },
  textBold: {
    fontWeight: 'bold'
  },
  bulletItem: {
    marginLeft: 10,
    marginBottom: 3
  },
  subBulletItem: {
    marginLeft: 20,
    marginBottom: 3
  },
  acceptanceText: {
    marginBottom: 5
  },
  stampRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  stamp: {
    width: 120
  },
  footer: {
    marginTop: 30,
    borderTop: '1 solid #ccc',
    paddingTop: 10,
    fontSize: 10,
    textAlign: 'center'
  },
  textPadding: {
    paddingLeft: 10,
  },
  pageHeader: {
    color: 'white',
    textAlign: 'center', 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  pageFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#7130A0',
    paddingTop: 50,
    paddingBottom: 4,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    fontSize: 9,
  },
  footerLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    height: 50,
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    color: 'black',
    width: '65%',
    lineHeight: 0.7,
  },
  footerRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '35%',
    alignItems: 'flex-end',
  },
  boldText: {
    fontWeight: 'bold',
  },
  image: {
    width: 150, // adjust as needed
    height: 50,
  },
  contentWrapper: {
    margin:40,
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 30,
    fontSize: 12,
  },
  viewone: {
    width: 100,
    height: 100,
    backgroundColor: '#b182d3ff',
  },
  headerTopBar: {
    backgroundColor: '#7130A0',
    height: 50,
    width: '100%',
  },
  headerRowContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  headerCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  logoImage: {
    height: 60,
    width: 250,
  },
  headerColTriangleWrapper: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    paddingRight: 0,
    borderTop: '0 solid #7130A0',
    borderRight: '0 solid #7130A0'
  },
  triangleShape: {
    marginTop:0,
    width: 0,
    height: 0,
    borderBottom: '50 solid #fff',
    borderRight: '50 solid #7130A0',
  },
  headerColPurple: {
    marginTop:0,
    flex: 1,
    backgroundColor: '#7130A0',
  },
  tempbr:{
    paddingBottom: 6,
  }
});

const Header = () => (
  <View style={styles.pageHeader}>
    <View style={styles.headerTopBar} />

    {/* Row with Logo, Triangle, Purple Block */}
    <View style={styles.headerRowContainer}>
      {/* Left: Logo */}
      <View style={styles.headerCol}>
        <Image style={styles.logoImage} src={logo} />
      </View>

      {/* Center: Simulated Triangle */}
      <View style={styles.headerColTriangleWrapper}>
        <View style={styles.triangleShape} />
      </View>

      {/* Right: Purple Block */}
      <View style={styles.headerColPurple} />
    </View>
  </View>
);
const Footer = () => (
  <View style={styles.pageFooter}>
    <View style={styles.footerLeft}>
      <Text>
        29, Mahalakshmi Chamber M G Road, Near Trinity Metro Station{'\n'}
        Bangalore, Karnataka{'\n'}
        <Text style={styles.boldText}>Ph: +91 79070 05500, www.euphoricoders.com</Text>
      </Text>
    </View>
    <View style={styles.footerRight}>
      <Image style={styles.image} src={craig} />
    </View>
  </View>
);

const OfferLetterPDF = ({ employee }) => {
  const {
    name,
    designation,
    department,
    dateOfJoining,
    workLocation,
    workingHours,
    paymentSchedule,
    noticePeriod,
    benefits,
    netSalary,
    responsibilities,
    conditionsOfEmployment
  } = employee;
  const salaryLPA = ((netSalary * 12) / 100000).toFixed(2);


  return (
    <Document>
      <Page size="A4">
        {/* Header Stripe and Logo */}
        <Header />
        <View style={styles.contentWrapper}>
          <View style={styles.headerRow}>
            {/* <Image style={styles.logo} src={logo} /> */}
            <Text>May 2, 2025</Text>
          </View>
          {/* Greeting */}
          <View style={styles.section}>
            <Text>Dear {name},</Text>
            <View style={styles.tempbr}></View>
            <Text>
              &nbsp;&nbsp;&nbsp;&nbsp;We are delighted to extend an offer for the <Text style={styles.textBold}>{designation}</Text> position at <Text style={styles.textBold}>Euphoricoders Pvt Ltd</Text>. After reviewing your qualifications and experience, we believe you would be a valuable addition to our team.
            </Text>
          </View>
          {/* Position Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Position Details</Text>
            <Text style={styles.bulletItem}>• Job Title: {designation}</Text>
            <Text style={styles.bulletItem}>• Department: {department}</Text>
            <Text style={styles.bulletItem}>• Start Date: {dateOfJoining}</Text>
            <Text style={styles.bulletItem}>• Work Location: Euphoricoders Pvt Ltd, {workLocation}, or other assigned project locations.</Text>
            <Text style={styles.bulletItem}>• Reporting To: Abhinav K</Text>
            <Text style={styles.bulletItem}>• Working Days: Monday to Saturday</Text>
            <Text style={styles.bulletItem}>• Working Hours: {workingHours}</Text>
          </View>
          {/* Compensation and Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compensation and Benefits</Text>
            <Text style={styles.bulletItem}>• Salary: ₹{salaryLPA} LPA</Text>
            <Text style={styles.bulletItem}>• Payment Schedule: {paymentSchedule}</Text>
            <Text style={styles.bulletItem}>• Notice Period: {noticePeriod}</Text>
            <Text style={styles.bulletItem}>• Benefits:</Text>
            <Text style={styles.subBulletItem}>• {benefits.casualLeave} days of casual leave per year</Text>
            <Text style={styles.subBulletItem}>• {benefits.sickLeave} sick leaves per year</Text>
          </View>
          {/* Responsibilities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsibilities</Text>
            <Text>Your primary responsibilities will include:</Text>
            {responsibilities.map((res, idx) => (
              <Text key={idx} style={styles.bulletItem}>• {res}</Text>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conditions of Employment</Text>
            <Text>This offer is contingent upon:</Text>
            {conditionsOfEmployment.map((item, idx) => (
              <Text key={idx} style={styles.bulletItem}>• {item}</Text>
            ))}
          </View>
        </View>
        {/* Footer */}
        <Footer />
      </Page>
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.contentWrapper}>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acceptance of Offer</Text>
            <Text style={styles.acceptanceText}>
              Please confirm your acceptance of this offer by signing and returning a copy of this letter by <Text style={styles.textBold}>{dateOfJoining}</Text>.
            </Text>
            <Text>If you have any questions, feel free to reach us at <Text style={styles.textBold}>hr@euphoricoders.com</Text>.</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acknowledgment & Acceptance</Text>
            <Text>I, {name}, accept the offer and agree to the abovementioned terms.</Text>
            <Text>Signature: __________________</Text>
            <Text>Date: __________________</Text>
          </View>
          <View style={styles.stampRow}>
            <Image style={styles.stamp} src={stamp} />
            <View>
              <Text style={styles.textBold}>Warm regards,</Text>
              <Text>Abhinav K</Text>
              <Text>HR/Operations Head</Text>
              <Text>Euphoricoders Pvt Ltd</Text>
              <Text>7907005500 | info@euphoricoders.com</Text>
            </View>
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

export default OfferLetterPDF;
