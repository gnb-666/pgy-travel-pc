// 旅游日记应用路由配置
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'tdesign-react/es/style/index.css';
import './assets/tailwindcss.css'
import './assets/index.css';
import ProtectedRoute from './ProtectedRoute'
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ManagePage from "./page/ManagePage";
import LoginPage from './page/LoginPage';
import PublicRoute from "./PublicRoute";
import DashboardPage from './page/DashboardPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            } />
            <Route path="/lng" element={
                <ProtectedRoute>
                    <App />
                </ProtectedRoute>
            }>
                <Route path="all" element={<DashboardPage />} />
                <Route path="trends" element={<ManagePage/>} />
            </Route>
        </Routes>
    </HashRouter>
);
