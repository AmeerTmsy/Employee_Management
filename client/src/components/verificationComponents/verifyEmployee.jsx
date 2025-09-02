import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function VerifyEmployee(props) {
    const { login, user } = useSelector((state) => state.login)
    
    // Don't render anything if not authenticated or not employee
    if (!login || user?.userType !== "employee") {
        return null;
    }
    
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default VerifyEmployee;