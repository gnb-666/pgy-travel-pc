import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, MessagePlugin } from 'tdesign-react';
import { getDashboardStats, getRecentNotes } from '../service/api';

const DashboardPage = () => {
    // 统计数据
    const [statistics, setStatistics] = useState({
        totalNotes: 0,
        totalUsers: 0,
        pendingNotes: 0,
        approvedNotes: 0,
        rejectedNotes: 0
    });

    // 最近发布的日记列表
    const [recentNotes, setRecentNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    // 获取统计数据
    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const result = await getDashboardStats();
            if (result) {
                setStatistics(result);
            }
        } catch (error) {
            console.error('获取统计数据失败:', error);
            MessagePlugin.error('获取统计数据失败');
        } finally {
            setLoading(false);
        }
    };

    // 获取最近发布的日记
    const fetchRecentNotes = async () => {
        try {
            setLoading(true);
            const result = await getRecentNotes();
            console.log('获取到的最近日记数据:', result); // 添加日志查看返回的数据结构
            // 直接使用返回结果，不需要.data属性
            if (result) {
                setRecentNotes(result);
            }
        } catch (error) {
            console.error('获取最近日记失败:', error);
            MessagePlugin.error('获取最近发布的旅游日记失败');
        } finally {
            setLoading(false);
        }
    };

    // 页面加载时获取数据
    useEffect(() => {
        fetchStatistics();
        fetchRecentNotes();
    }, []);

    // 根据状态获取对应的标签颜色和文本
    const getStatusTag = (state) => {
        state = +state;
        switch (state) {
            case 0: return { theme: "warning", label: '待审核' };
            case 1: return { theme: "success", label: '已通过' };
            case 2: return { theme: "danger", label: '已驳回' };
            default: return { theme: "default", label: '未知' };
        }
    };

    // 定义表格列
    const columns = [
        { colKey: 'title', title: '标题', width: 200 },
        { 
            colKey: 'username', 
            title: '发布者',
            cell: ({ row }) => row.userInfo?.username || '未知用户'
        },
        { 
            colKey: 'publishTime', 
            title: '发布日期',
            cell: ({ row }) => {
                // 尝试使用publishTime或createdAt，确保日期显示正确
                const date = row.publishTime || row.createdAt;
                return date ? new Date(date).toLocaleString() : '-';
            }
        },
        {
            colKey: 'state',
            title: '状态',
            cell: ({ row }) => {
                const { label, theme } = getStatusTag(row.state);
                return <Tag theme={theme}>{label}</Tag>;
            },
        }
    ];

    return (
        <div className="dashboard-container">
            <Card title={<div className="text-2xl font-bold my-4">旅游日记总览</div>}>
                <Row gutter={[16, 16]}>
                    <Col span={4} xs={12} sm={6} md={4}>
                        <Statistic title="日记总数" value={statistics.totalNotes} trend="up" />
                    </Col>
                    <Col span={4} xs={12} sm={6} md={4}>
                        <Statistic title="用户数" value={statistics.totalUsers} trend="up" />
                    </Col>
                    <Col span={4} xs={12} sm={6} md={4}>
                        <Statistic title="待审核数" value={statistics.pendingNotes} trend="up" />
                    </Col>
                    <Col span={4} xs={12} sm={6} md={4}>
                        <Statistic title="已审核数" value={statistics.approvedNotes} trend="up" />
                    </Col>
                    <Col span={4} xs={12} sm={6} md={4}>
                        <Statistic title="拒绝数" value={statistics.rejectedNotes} trend="up" />
                    </Col>
                </Row>
            </Card>
            
            <Card title={<div className="text-2xl font-bold my-4">最近发布的旅游日记</div>}>
                <Table
                    data={recentNotes}
                    columns={columns}
                    rowKey="_id"
                    pagination={false}
                    stripe
                    bordered
                    loading={loading}
                />
            </Card>
        </div>
    );
};

export default DashboardPage;