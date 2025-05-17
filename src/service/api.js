// 统一导出API函数，便于管理和使用
import * as loginApi from './loginapi';
import * as manageApi from './manageapi';
import * as overviewApi from './overviewapi';

// 导出登录相关API
export const login = loginApi.login;
export const getUserInfo = loginApi.getUserInfo;
export const logout = loginApi.logout;
export const checkLogin = loginApi.checkLogin;

// 导出管理相关API
export const getTravelNotes = manageApi.getTravelNotes;
export const reviewTravelNote = manageApi.reviewTravelNote;
export const deleteTravelNote = manageApi.deleteTravelNote;
export const restoreTravelNote = manageApi.restoreTravelNote;

// 导出总览相关API
export const getDashboardStats = overviewApi.getDashboardStats;
export const getRecentNotes = overviewApi.getRecentNotes;

/**
 * 通用请求方法
 * @param {Object} config - axios 配置
 * @returns {Promise} 请求结果
 */
export const commonRequest = (config) => {
    return require('./axios').default(config);
};
