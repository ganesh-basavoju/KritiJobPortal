import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminAuthGuard = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div style={{padding: '50px', color: 'white', textAlign: 'center'}}>Loading...</div>;
    }

    // Role check: Admin role hardcoded as 'admin' or 'ADMIN'. Adjust based on backend.
    // if (!user || (user.role && user.role.toUpperCase() !== 'ADMIN')) {
    //     return <Navigate to="/dashboard" replace />;
    // }

    return <Outlet />;
};

export default AdminAuthGuard;
