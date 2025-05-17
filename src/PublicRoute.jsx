// 公开路由
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    // 使用旅游日记专用的用户数据存储键名
    const userData = localStorage.getItem('travelUserData');
    if (userData) {
        // 如果已登录，则重定向到 /lng 页面
        return <Navigate to="/lng" replace />;
    }
    return children;
};

export default PublicRoute;
