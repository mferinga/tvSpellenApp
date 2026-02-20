import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { authCheck } from '../auth/auth.check';

type Props = { children : React.ReactNode };

const ProtectedRoute = ({children}: Props) => {
    const location= useLocation();
    //functie authCheck nog schrijven deze moet naar de auth me gaan
    const { isLoggedIn } = authCheck();
    return isLoggedIn() ? (
        <>{children}</> 
        ) : (
            <Navigate to="/login" state={{from : location}} replace />
    );
}

export default ProtectedRoute;