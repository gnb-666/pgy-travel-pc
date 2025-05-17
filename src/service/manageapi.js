import request from './axios';

/**
 * 获取游记数据（分页）
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.size - 每页大小
 * @param {string} params.search - 搜索关键词
 * @returns {Promise} 游记数据和总数
 */
export const getTravelNotes = (params) => {
    return request({
        url: '/admin/getTravelNotes',
        method: 'post',
        data: params
    });
};

/**
 * 审核旅行笔记
 * @param {Object} params - 审核参数
 * @param {string} params._id - 笔记ID
 * @param {number} params.state - 状态(1通过，2驳回)
 * @param {string} params.rejectReason - 驳回原因(可选)
 * @returns {Promise} 审核结果
 */
export const reviewTravelNote = (params) => {
    return request({
        url: '/reviewTravelNote',
        method: 'post',
        data: params
    });
};

/**
 * 删除旅行笔记
 * @param {Object} params - 删除参数
 * @param {string} params._id - 笔记ID
 * @returns {Promise} 删除结果
 */
export const deleteTravelNote = (params) => {
    return request({
        url: '/deleteTravelNote',
        method: 'post',
        data: params
    });
};

/**
 * 恢复旅行笔记
 * @param {Object} params - 恢复参数
 * @param {string} params._id - 笔记ID
 * @returns {Promise} 恢复结果
 */
export const restoreTravelNote = (params) => {
    return request({
        url: '/restoreTravelNote',
        method: 'post',
        data: params
    });
};
