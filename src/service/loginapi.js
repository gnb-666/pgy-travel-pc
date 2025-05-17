import request from './axios';
import { md5 } from 'js-md5';

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 登录结果
 */
export const login = (data) => {
    // 对密码进行 md5 加密
    const params = {
        ...data,
        password: md5(data.password)
    };
    
    return request({
        url: '/admin/login',
        method: 'post',
        data: params
    });
};

/**
 * 获取用户信息
 * @returns {Promise} 用户信息
 */
export const getUserInfo = () => {
    return request({
        url: '/travel/user/info',
        method: 'get'
    });
};

/**
 * 退出登录
 * @returns {Promise} 退出结果
 */
export const logout = () => {
    return request({
        url: '/travel/logout',
        method: 'post'
    });
};

/**
 * 校验用户是否登录
 * @returns {Promise} 校验结果
 */
export const checkLogin = () => {
    return request({
        url: '/travel/checkLogin',
        method: 'get'
    });
};
