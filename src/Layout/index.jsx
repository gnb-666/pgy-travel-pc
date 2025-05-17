// 菜单栏、内容布局、底部版权信息
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'tdesign-react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { DashboardIcon, AppIcon } from 'tdesign-icons-react';
import { Icon } from 'tdesign-icons-react';
import { HashRouter, Route, Routes } from "react-router-dom";
const { Content, Footer, Aside } = Layout;
const { MenuItem } = Menu;


function BasicUsage(props) {
    // active菜单栏的当前选中值
    const [active, setActive] = useState('all');
    const nav = useNavigate()
    const location = useLocation();
    
    // 处理菜单变化
    const menuChange = (v) => {
        if (v === 'all') {
            nav('/lng/all');
        } else if (v === 'trends') {
            nav('/lng/trends');
        } else {
            nav(`/lng/${v}`);
        }
        setActive(v);
    };
    
    // 进入页面时同步URL和菜单选中状态
    useEffect(() => {
        // 如果直接访问/lng路径，自动导航到/lng/all
        if (location.pathname === '/lng') {
            nav('/lng/all');
            setActive('all');
        } 
        // 否则根据当前路径设置选中项
        else {
            const pathSegments = location.pathname.split('/');
            const currentPage = pathSegments[pathSegments.length - 1];
            if (currentPage) {
                setActive(currentPage);
            } else {
                setActive('all');  // 默认选中总览
            }
        }
    }, [location.pathname, nav]);
    
    return (
        <Menu
            value={active}
            onChange={menuChange}
            {...props}>
            <MenuItem icon={<DashboardIcon />} value={'all'}>旅游日记总览</MenuItem>
            <MenuItem icon={<AppIcon />} value={'trends'}>旅游日记审核管理</MenuItem>
            <section className='flex justify-center items-center space-x-2 mt-4 cursor-pointer' onClick={() => {
                nav('/')
                localStorage.removeItem('travelUserData');
            }} style={{
                color: 'var(--td-text-color-primary)',
                marginTop: 'var(--td-comp-margin-xl)'
            }}>
                <Icon name="rollback" />
                <span>
                    退出登录
                </span>
            </section>
        </Menu>
    );
}

export default function BasicDivider() {
    return (
        <>
            <Layout>
                <Aside>
                    <BasicUsage />
                </Aside>
                <Layout>
                    <Content>
                        <section className={'px-10 py-6'}>
                            <Outlet />
                            {/*   类似 vue 中 router-view */}
                        </section>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>蒲公英旅游日记审核管理平台</Footer>
                </Layout>
            </Layout>
        </>
    );
}
