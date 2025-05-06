# 旅游日记管理系统

这是一个用于管理旅游日记的PC端管理系统，提供了日记审核、用户管理等功能。

## 功能特点

- 旅游日记审核管理（通过/驳回）
- 用户数据管理
- 数据统计和概览
- 多级权限控制

## 安装指南

确保你的系统已安装Node.js环境，然后执行以下命令安装依赖：

```bash
npm install
```

## 运行项目

安装完依赖后，执行以下命令启动开发服务器：

```bash
npm run dev
```

启动成功后，在浏览器中访问：`http://localhost:3000` 即可打开管理系统。

## 账户信息

系统预设了两个账户，分别具有不同的权限：

1. **管理员账户**
   - 用户名：admin
   - 密码：admin123
   - 权限：所有功能的完整访问权限

2. **审核员账户**
   - 用户名：auditor
   - 密码：auditor123
   - 权限：仅限于日记审核功能

## 系统要求

- Node.js 14.0+
- 现代浏览器（Chrome、Firefox、Safari、Edge等）

## 技术栈

- 前端：React、TDesign-React组件库
- 后端：Express、MongoDB
- 构建工具：Vite

## 注意事项

- 首次使用请确保后端服务已启动
- 后端API默认地址为：http://localhost:3001
- 如需修改API地址，请编辑`src/service/axios.js`文件中的baseURL
