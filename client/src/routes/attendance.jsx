
import { useSelector } from 'react-redux';
import AdminAttendance from '../components/adminComponents/adminAttendance';
import EmployeeAttendance from '../components/employeeComponents/employeeAttendance';

function Attendance(props) {
    const {user} = useSelector((state)=> state.login)
    return (
        <div className="presence-container">
            {user.userType === "admin" && <AdminAttendance />}
            {user.userType === "employee" && <EmployeeAttendance />}
        </div >
    );
}

export default Attendance;