# Tasks

- [x] Task 1: 创建视频数据文件
  - [x] SubTask 1.1: 创建 `data/aivideo.json` 文件
  - [x] SubTask 1.2: 添加示例视频数据（3条）

- [x] Task 2: 完善 aivideo.html 页面结构
  - [x] SubTask 2.1: 添加侧边栏（搜索、分类筛选、比例筛选、标签云、关于）
  - [x] SubTask 2.2: 添加主内容区（标题、视频列表容器）
  - [x] SubTask 2.3: 添加角色档案弹窗

- [x] Task 3: 更新 app.js 添加视频页面支持
  - [x] SubTask 3.1: 在 `loadArticles` 中添加 aivideo.json 加载逻辑
  - [x] SubTask 3.2: 在 `renderArticles` 中添加视频卡片渲染分支
  - [x] SubTask 3.3: 创建 `renderVideoCards` 函数
  - [x] SubTask 3.4: 更新 `updateContentTitle` 支持视频页面
  - [x] SubTask 3.5: 更新页面检测逻辑（所有相关函数）

- [x] Task 4: 添加视频卡片样式
  - [x] SubTask 4.1: 创建 `.video-card` 样式
  - [x] SubTask 4.2: 创建视频播放器容器样式（支持比例）
  - [x] SubTask 4.3: 创建热度值显示样式
  - [x] SubTask 4.4: 创建提示词区域和复制按钮样式

- [x] Task 5: 更新所有页面的导航菜单
  - [x] SubTask 5.1: 更新 `index.html` 导航
  - [x] SubTask 5.2: 更新 `aigc.html` 导航
  - [x] SubTask 5.3: 更新 `bookmarks.html` 导航

# Task Dependencies
- Task 3 depends on Task 1（需要先有数据文件）
- Task 4 可以与 Task 2、Task 3 并行
- Task 5 需要在 Task 2 完成后执行
