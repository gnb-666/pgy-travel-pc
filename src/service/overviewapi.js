import request from './axios';

/**
 * 获取仪表盘统计数据
 * @returns {Promise} 统计数据，包含日记总数、用户数、待审核数、已审核数、拒绝数
 */
export const getDashboardStats = () => {
    return request({
        url: '/admin/getDashboardStats',
        method: 'get'
    });
};

/**
 * 获取最近发布的旅游日记
 * @returns {Promise} 最近发布的旅游日记列表
 */
export const getRecentNotes = () => {
    return request({
        url: '/admin/getRecentNotes',
        method: 'get'
    });
};
