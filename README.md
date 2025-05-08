# Typhoon-plus

# 台风路径可视化系统

这是一个基于Web的台风路径三维可视化系统。

## 功能特点

- 支持3D地球表面的台风路径显示
- 提供台风强度的多维度可视化展示
- 支持按台风名称搜索
- 可同时显示多个台风路径
- 提供两种不同的可视化方案切换：
  - 气压值展示(连续色带)  
  - 台风等级展示(分段色带)

## 技术栈

- **前端**:
  - ECharts/ECharts-GL - 3D可视化
  - jQuery - DOM操作和AJAX请求
  - Bootstrap - UI组件

- **后端**:
  - Flask - Web服务器框架
  - Python - 数据处理

## 项目结构

```
├── data_all.json        # 台风数据
├── server.py           # Flask后端服务器 
├── static/
│   └── main.js        # 前端JavaScript代码
├── templates/
│   └── index.html     # 主页面
└── transjson.py       # 数据转换脚本
```

## 运行方法

1. 确保安装了Python和所需依赖：
```sh
pip install flask
```

2. 启动Flask服务器：
```sh
python server.py
```

3. 在浏览器中访问 `http://127.0.0.1:5000`

## 数据格式

台风数据记录格式为：
```javascript
[经度, 纬度, 气压值, 强度等级, 台风名称, 日期, 风速, 气压]
```

## 主要功能

1. **台风搜索**: 支持按名称搜索台风
2. **多路径显示**: 可同时显示多个台风的路径
3. **数据可视化**: 
   - 支持气压值连续色带显示
   - 支持台风等级分段显示
4. **交互功能**:
   - 鼠标左键平移视角
   - 鼠标右键旋转视角
   - 支持路径清除
   - 侧边栏切换
  
  ![image](https://github.com/user-attachments/assets/84e93988-13a3-49be-b101-369bd53098d5)
  ![image](https://github.com/user-attachments/assets/3bfb46dc-6c2a-4af9-b7e1-91ab8e15b019)

  

Copyright © 2025 QuadtreeW

本代码仅供学术研究和学习使用。禁止任何形式的商业用途，包括但不限于将本代码用于商业项目、产品、服务或收费系统。 This code is provided for academic research and educational purposes only.
Any form of commercial use is strictly prohibited, including but not limited to use in commercial projects, products, services, or any system involving payment.
