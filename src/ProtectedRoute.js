// src/components/ProtectedRoute.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from './context/authContext/index.js'; // Adjust the path as necessary

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

    return (
        <Routes>
            <Route
                {...rest}
                render={props => {
                    return currentUser ? <Layout><Component {...props} /></Layout> : <Navigate to="/login" />;
                }}
            ></Route>
        </Routes>

    );
};

export default ProtectedRoute;