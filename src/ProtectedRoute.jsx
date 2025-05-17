// 保护路由
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 使用旅游日记专用的用户数据存储键名
  const userData = localStorage.getItem('travelUserData');

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
