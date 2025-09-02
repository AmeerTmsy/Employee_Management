import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function VerifyAdmin(props) {
    const { login, user } = useSelector((state) => state.login)
    
    // Don't render anything if not authenticated or not admin
    if (!login || user?.userType !== "admin") {
        return null;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default VerifyAdmin;