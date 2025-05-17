import React, { useEffect, useState } from 'react';
import { Input, Button, Row, Col, MessagePlugin, Checkbox } from 'tdesign-react';
import { useNavigate } from "react-router-dom";
import { login } from "../service/api";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 页面加载时获取本地存储的用户信息
    useEffect(() => {
        const storedData = localStorage.getItem('travelUserDataRemember');
        if (storedData) {
            try {
                const userData = JSON.parse(storedData);             
                setRememberMe(true);
                setFormData({
                    username: userData.username || '',
                    password: userData.password || ''
                });
            } catch (error) {
                console.error('解析存储的用户数据失败', error);
            }
        }
    }, []);

    // 处理输入框内容变化
    const handleInputChange = (value, name) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 提交表单数据
    const submitForm = async () => {
        // 检查用户名和密码是否为空
        if (!formData.username.trim() || !formData.password.trim()) {
            MessagePlugin.warning('用户名和密码为必填项！');
            return;
        }
        
        setLoading(true);
        
        try {
            // 调用登录 API
            const result = await login(formData);
            console.log('result',result);
            
            // 处理登录成功
            MessagePlugin.success('登录成功');
            
            // 将数据存储到本地
            localStorage.setItem('travelUserData', JSON.stringify(result));
            
            // 根据记住我状态，是否保存信息到本地
            if (rememberMe) {
                localStorage.setItem('travelUserDataRemember', JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }));
            } else {
                localStorage.removeItem('travelUserDataRemember');
            }
            
            // 登录成功，跳转页面
            navigate('/lng');
            
        } catch (error) {
            // 登录失败的处理
            console.error('登录失败:', error);
            MessagePlugin.error(error?.response?.data?.message || '登录失败，请检查账号或者密码是否正确');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full flex justify-center items-center login'>
            <div style={{ backgroundColor: 'rgba(50, 50, 50, 0.8) ', padding: '80px 50px', minWidth: '450px' }}>
                <div style={{ 
                    color: 'white', 
                    fontSize: '1.875rem', 
                    marginBottom: '2.5rem', 
                    textAlign: 'center',
                    width: '100%'
                }}>
                    蒲公英-旅游日记审核管理平台
                </div>
                <Row gutter={[0, 26]}>
                    <Col span={12}>
                        <div className="flex items-center">
                            <span className="text-white mr-2 w-16 text-right">用户名：</span>
                            <Input
                                name="username"
                                value={formData.username}
                                onChange={(value) => handleInputChange(value, 'username')}
                                placeholder="请输入用户名"
                                style={{ flex: 1 }}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="flex items-center">
                            <span className="text-white mr-2 w-16 text-right">密码：</span>
                            <Input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={(value) => handleInputChange(value, 'password')}
                                placeholder="请输入密码"
                                style={{ flex: 1 }}
                            />
                        </div>
                    </Col>
                    <Col>
                        <Checkbox checked={rememberMe} onChange={setRememberMe} className='ml-10'>
                            <span className="text-white">记住我</span>
                        </Checkbox>
                    </Col>
                    <Col span={12}>
                        <Button 
                            onClick={submitForm} 
                            block 
                            theme="primary" 
                            size="large"
                            loading={loading}
                            style={{ borderRadius: '20px' }}
                        >
                            登录
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default LoginPage;