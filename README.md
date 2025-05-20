# 蒲公英旅游日记平台PC审核管理端开发

## 软件架构
- React
- JavaScript

## 安装教程
```bash
npm install
```

## 使用说明
```bash
npm run start
```

## 角色权限说明
| 角色   | 账号      | 密码        | 权限描述                 |
| ------ | --------- | ----------- | ------------------------ |
| 管理员 | admin     | admin123    | 通过、驳回、删除、恢复   |
| 审核员 | auditor   | auditor123  | 通过、驳回               |

## 项目整体文件说明

- **node_modules**  项目依赖的第三方模块
- **public**        React 应用的入口文件
- **src**           前端源码目录
  - **assets**      登录页面的样式
  - **Layout**      审核管理页面布局模块
  - **page**        页面组件目录
    - **ManagePage.jsx**  布局组件：包含展示游记数据、搜索功能和分页功能
    - **LoginPage.jsx**      登录页面组件
    - **TablePage.js**     表格组件：展示游记数据，包含审核、驳回、删除、恢复等操作
    - **DashboardPage.js**     仪表盘：包括日记总数、用户数，待审核数、已审核数、拒绝数、近十条审核数
  - **Admin.js**    将布局和内容渲染挂载到 Layout 组件
  - **index.js**    路由配置
  - **ProtectedRoute.jsx**  保护路由
  - **PublicRoute.jsx**     公开路由
- **.gitignore**    git配置文件
- **package-lock.json**  上线锁定版本信息
- **package.json**  项目配置文件
- **README.md**     项目介绍文档

## 其他说明
- 启动前请确保后端服务已启动，默认API地址为：http://localhost:3001
- 如需修改API地址，请编辑`src/service/axios.js`文件中的baseURL
