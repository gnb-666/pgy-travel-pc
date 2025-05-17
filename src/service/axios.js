import axios from 'axios';
import { MessagePlugin } from 'tdesign-react';

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://localhost:3001', // API 基础URL
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 从本地存储获取 token
        const token = localStorage.getItem('travelUserData');
        if (token) {
            try {
                const userData = JSON.parse(token);
                if (userData.token) {
                    // 为请求头添加 token
                    config.headers['Authorization'] = `Bearer ${userData.token}`;
                }
            } catch (e) {
                console.error('获取token失败', e);
            }
        }
        return config;
    },
    error => {
        console.error('请求错误', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        // 假设成功的状态码是 200
        if (response.status !== 200) {
            MessagePlugin.error(res.message || '请求失败');
            
            // 401: 未授权 - token 失效或未登录
            if (response.status === 401) {
                // 清除用户数据并重定向到登录页
                localStorage.removeItem('travelUserData');
                localStorage.removeItem('travelUserDataRemember');
                window.location.href = '/';
            }
            
            return Promise.reject(new Error(res.message || '请求失败'));
        } else {
            return res;
        }
    },
    error => {
        console.error('响应错误', error);
        
        // 处理网络错误
        let errorMessage = '网络错误，请稍后重试';
        if (error.response) {
            // 服务器返回错误状态码
            switch (error.response.status) {
                case 401:
                    errorMessage = '未授权，请重新登录';
                    // 清除用户数据并重定向到登录页
                    localStorage.removeItem('travelUserData');
                    localStorage.removeItem('travelUserDataRemember');
                    window.location.href = '/';
                    break;
                case 403:
                    errorMessage = '拒绝访问';
                    break;
                case 404:
                    errorMessage = '请求的资源不存在';
                    break;
                case 500:
                    errorMessage = '服务器错误';
                    break;
                default:
                    errorMessage = error.response.data.message || `请求失败(${error.response.status})`;
            }
        } else if (error.request) {
            // 请求发出但没有收到响应
            errorMessage = '服务器无响应，请稍后重试';
        }
        
        MessagePlugin.error(errorMessage);
        return Promise.reject(error);
    }
);

export default service;
