// 表格组件：包含审核、驳回、删除和恢复等操作
import React, { useState } from 'react';
import { Table, Tag, Button, Dialog, Input, MessagePlugin } from 'tdesign-react';
import { Modal } from 'antd';
import ImageGallery from 'react-image-gallery';
import { reviewTravelNote, deleteTravelNote, restoreTravelNote } from '../service/api';

const userData = JSON.parse(localStorage.getItem('travelUserData') || '{}');
const userRole = Number(userData.role); // 强制转为数字，防止类型不一致

const TravelNotesTable = ({ data = [], fetchData, loading }) => {
    // let JSONDATA = JSON.parse(localStorage.getItem('adminData'))
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [expandedRows, setExpandedRows] = useState(new Set()); // 新增：记录展开的行
    
    // 根据状态获取对应的标签颜色和文本
    const getStatusTag = (state) => {
        state = +state
        switch (state) {
            case 0: return { color: 'yellow', label: '待审核', theme: "primary" };
            case 1: return { color: 'green', label: '已通过', theme: "success" };
            case 2: return { color: 'red', label: '已驳回', theme: "danger" };
            default: return { color: 'gray', label: '未知', theme: "warning" };
        }
    };

    // 渲染图片列表的第一张图片，并允许点击查看大图
    const renderFirstImage = (imgList) => {
        if (imgList && imgList.length > 0) {
            const images = imgList.map(item => ({ thumbnail: item })); // 构造图片数据
            const handleClick = () => {
                // 打开模态框
                Modal.info({
                    width: '34%',
                    content: <ImageGallery items={images} />,
                    okText: '关闭',
                    okButtonProps: {
                        style: { backgroundColor: '#0052d9', color: 'white' } // 设置按钮样式
                    }
                });
            };

            return (
                <section className='flex overflow-auto' onClick={handleClick}>
                    {
                        imgList.map(item =>
                            <img
                                key={item}
                                src={item}
                                width={50}
                                alt=''
                                aria-label="View Image"
                            />
                        )
                    }
                </section>
            );
        }
        return '无图片';
    };

    // 审核按钮点击事件
    const showDialog = (row) => {
        setCurrentRow(row);
        setIsDialogVisible(true);
    };

    // 审核旅行笔记
    const handleReviewTravelNote = async (_id, state, rejectReason = '') => {
        try {
            setActionLoading(true);
            const result = await reviewTravelNote({ _id, state, rejectReason });
            
            if (result && result === "success") {
                MessagePlugin.success('操作成功');
                fetchData();  // 保持当前筛选条件和页码
            } else {
                MessagePlugin.error('操作失败');
            }
        } catch (error) {
            console.error('审核操作失败', error);
            MessagePlugin.error('操作失败');
        } finally {
            setActionLoading(false);
        }
    };

    // 处理审核操作
    const handleReview = (row, newState) => {
        if (newState === 2) { // 驳回时显示对话框输入驳回原因
            setCurrentRow(row);
            setIsDialogVisible(true);
        } else { // 通过审核，直接调用审核函数
            handleReviewTravelNote(row._id, newState);
        }
    };

    // 确认驳回操作并附带原因
    const confirmReject = () => {
        if (currentRow && rejectReason) {
            handleReviewTravelNote(currentRow._id, 2, rejectReason);
            setIsDialogVisible(false);
            setRejectReason('');
        }
    };

    // 处理删除操作
    const handleDelete = async (row) => {
        try {
            setActionLoading(true);
            const result = await deleteTravelNote({ _id: row._id });    
            if (result && result === "success") {
                MessagePlugin.success('删除成功');
                fetchData();  // 保持当前筛选条件
            } else {
                MessagePlugin.error('删除失败');
            }
        } catch (error) {
            console.error('删除操作失败', error);
            MessagePlugin.error('删除失败');
        } finally {
            setActionLoading(false);
        }
    };

    // 处理恢复操作
    const handleRestore = async (_id) => {
        try {
            setActionLoading(true);
            const result = await restoreTravelNote({ _id });
            
            if (result && result === "success") {
                MessagePlugin.success('恢复成功');
                fetchData();  // 保持当前筛选条件
            } else {
                MessagePlugin.error('恢复失败');
            }
        } catch (error) {
            console.error('恢复操作失败', error);
            MessagePlugin.error('恢复失败');
        } finally {
            setActionLoading(false);
        }
    };

    // 处理内容展开/收起
    const handleContentToggle = (rowId) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(rowId)) {
                newSet.delete(rowId);
            } else {
                newSet.add(rowId);
            }
            return newSet;
        });
    };

    // 渲染内容，限制行数
    const renderContent = (content, rowId) => {
        if (!content) return '-';
        
        const isExpanded = expandedRows.has(rowId);
        const lines = content.split('\n');
        const displayLines = isExpanded ? lines : lines.slice(0, 5);
        
        return (
            <div 
                style={{ 
                    cursor: 'pointer',
                    maxHeight: isExpanded ? 'none' : '100px',
                    overflow: 'hidden'
                }}
                onClick={() => handleContentToggle(rowId)}
            >
                {displayLines.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                {lines.length > 5 && (
                    <div style={{ color: '#0052d9', marginTop: '4px' }}>
                        {isExpanded ? '收起' : `展开(${lines.length - 5}行)`}
                    </div>
                )}
            </div>
        );
    };

    // 定义表格列
    const columns = [
        { colKey: 'title', title: '标题' },
        {
            colKey: 'userInfo2',
            title: '头像',
            cell: ({ row }) => {
                return <img style={{ width: '50px', height: '50px', objectFit: 'contain' }} src={row?.userInfo?.avatar || ''} alt="用户头像" />
            },
        },
        {
            colKey: 'userInfo',
            title: '用户',
            cell: ({ row }) => {
                return row?.userInfo?.username
            },
        },
        { 
            colKey: 'content', 
            title: '内容',
            cell: ({ row }) => renderContent(row.content, row._id)
        },
        {
            colKey: 'imgList',
            title: '图片',
            cell: ({ row }) => renderFirstImage(row.imgList),
        },
   

        {
            colKey: 'state',
            title: '状态',
            cell: ({ row }) => {
                const { label, theme } = getStatusTag(row.state);
                return <Tag theme={theme} >{label}</Tag>;
            },
        },
        {
            colKey: 'rejectReason',
            title: '驳回原因',
            cell: ({ row }) => row.rejectReason || '-',
        },
        {
            colKey: 'operation',
            title: '操作',
            cell: ({ row }) => {
                const { theme } = getStatusTag(row.state);
                return (
                    <div className="flex space-x-2">
                        {/* 根据状态显示不同的操作按钮 */}
                        {row.state === 0 && (
                            <>
                                <Button theme="success" size="small" onClick={() => handleReview(row, 1)}>通过</Button>
                                <Button theme="warning" size="small" onClick={() => handleReview(row, 2)}>驳回</Button>
                            </>
                        )}
                        {/* 只有管理员才显示删除/恢复按钮 */}
                        {userRole === 0 && (
                            row.isDeleted ? (
                                <Button theme="primary" size="small" onClick={() => handleRestore(row._id)}>恢复</Button>
                            ) : (
                                <Button theme="danger" size="small" onClick={() => handleDelete(row)}>删除</Button>
                            )
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <Table
                data={data}
                columns={columns}
                rowKey="_id"
                loading={loading || actionLoading}
                bordered
                stripe
            />
            {/* 驳回原因对话框 */}
            <Dialog
                visible={isDialogVisible}
                header="请输入驳回原因"
                onClose={() => setIsDialogVisible(false)}
                onConfirm={confirmReject}
                confirmBtn={{ content: '提交', loading: actionLoading }}
                cancelBtn="取消"
            >
                <Input value={rejectReason} onChange={setRejectReason} placeholder="请输入驳回原因" />
            </Dialog>
        </div>
    );
};

export default TravelNotesTable;
