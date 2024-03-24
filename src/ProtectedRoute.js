// src/components/ProtectedRoute.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './layout/Layout.js';

import { useAuth } from './context/authContext/index.js'; // Adjust the path as necessary

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return (
            <Layout><Component /></Layout>
        );
    }
    return (<Navigate to="/login" />);
};

export default ProtectedRoute;