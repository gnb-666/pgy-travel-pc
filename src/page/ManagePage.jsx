// 展示游记数据、搜索功能、分页功能
import React, { useState, useEffect } from 'react';
import { Pagination, Card, Input, MessagePlugin, Table, Tag, Button, Dialog, Textarea, Select } from 'tdesign-react';
import TablePage from "./TablePage";
import { SearchIcon } from "tdesign-icons-react";
import { getTravelNotes } from '../service/api';

const TravelNotesTable = () => {
    const [data, setData] = useState([]); // 存储游记数据
    const [total, setTotal] = useState(0); // 总数据量
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const [pageSize, setPageSize] = useState(5); // 每页显示条目数
    const [value, setValue] = useState(''); // 搜索框的值
    const [loading, setLoading] = useState(false); // 加载状态
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [stateValue, setStateValue] = useState(null); // 状态筛选的值

    // 状态选项
    const stateOptions = [
        { label: '全部', value: null },
        { label: '待审核', value: 0 },
        { label: '已通过', value: 1 },
        { label: '已驳回', value: 2 }
    ];

    // 从后端获取数据
    const fetchData = async (p = currentPage, ps = pageSize, searchText = value, statusValue = stateValue) => {
        try {
            setLoading(true);
            const params = { page: p, size: ps, search: searchText };
            
            // 如果状态不是null，则添加到params
            if (statusValue !== null) {
                params.status = statusValue;
            }
            
            const result = await getTravelNotes(params);
            // console.log('11',result);
            
            setData(result.result);
            setTotal(result.total);
        } catch (error) {
            console.error('获取游记数据失败:', error);
            MessagePlugin.error('获取游记数据失败');
        } finally {
            setLoading(false);
        }
    };

    // 当currentPage或pageSize或value或stateValue变化时，重新获取数据
    useEffect(() => {
        fetchData(currentPage, pageSize, value, stateValue);
    }, [currentPage, pageSize, value, stateValue]);

    const confirmReject = async () => {
        try {
            setActionLoading(true);
            // 这里需要实现确认驳回的逻辑
        } catch (error) {
            console.error('确认驳回失败:', error);
            MessagePlugin.error('确认驳回失败');
        } finally {
            setIsDialogVisible(false);
            setActionLoading(false);
        }
    };

    return (
        <Card>
            <p className={'text-2xl font-bold my-4'}>旅游日记审核管理</p>
            <Input
                className={'my-4'}
                prefixIcon={<SearchIcon />}
                placeholder="请输入搜索内容"
                value={value}
                onChange={(value) => {
                    setValue(value);
                }}
                size="large"
            />
            <Select
                className={'my-4 w-60'}
                value={stateValue}
                onChange={(value) => setStateValue(value)}
                options={stateOptions}
                placeholder="请选择状态"
                clearable
            />
            <TablePage data={data || []} fetchData={fetchData} loading={loading} />
            <section className='my-4'>
                <Pagination
                    total={total}
                    current={currentPage}
                    pageSize={pageSize}
                    onCurrentChange={(page) => setCurrentPage(page)}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setCurrentPage(1); // 修改每页条目数时，返回第一页
                    }}
                />
            </section>
            <Dialog
                visible={isDialogVisible}
                header="请输入驳回原因"
                onClose={() => setIsDialogVisible(false)}
                onConfirm={confirmReject}
                confirmBtn={{ content: '提交', loading: actionLoading }}
                cancelBtn="取消"
            >
                <Textarea value={rejectReason} onChange={setRejectReason} placeholder="请输入驳回原因" />
            </Dialog>
        </Card>
    );
};

export default TravelNotesTable;
