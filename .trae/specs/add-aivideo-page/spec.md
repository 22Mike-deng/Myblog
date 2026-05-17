# AI Video 页面功能规格

## Why
用户需要一个新的页面来展示 AI 生成的视频内容，与现有的 AIGC 图片页面类似，但专门针对视频内容。

## What Changes
- 创建 `data/aivideo.json` 数据文件
- 完善 `aivideo.html` 页面结构
- 在 `app.js` 中添加视频页面的渲染逻辑
- 在 `style.css` 中添加视频卡片样式
- 更新导航菜单（所有页面添加 AIVideo 入口）

## Impact
- 新增页面类型：AIVideo 视频展示
- 复用现有的筛选、搜索、标签云功能
- 保持与 AIGC 页面一致的交互体验

## ADDED Requirements

### Requirement: 视频数据格式
The system SHALL provide a JSON data format for AI video entries with the following fields:
- `id`: 唯一标识符
- `title`: 视频标题
- `videoUrl`: 视频链接（内嵌 iframe 或视频播放器）
- `prompt`: 提示词文本（可复制）
- `heat`: 热度值（数字）
- `date`: 发布日期
- `category`: 分类
- `tags`: 标签数组
- `aspectRatio`: 视频比例（16:9, 9:16 等）

#### Scenario: 数据加载
- **WHEN** 用户访问 aivideo.html 页面
- **THEN** 系统从 `data/aivideo.json` 加载视频数据
- **AND** 按日期从新到旧排序显示

### Requirement: 视频卡片渲染
The system SHALL render video cards with the following elements:
- 视频播放器/嵌入区域（根据比例显示）
- 标题
- 分类标签
- 热度值显示
- 日期
- 提示词文本（带复制按钮）
- 标签云

#### Scenario: 视频播放
- **WHEN** 用户看到视频卡片
- **THEN** 视频以内嵌方式显示（iframe 或 video 标签）
- **AND** 支持常见的视频比例（16:9, 9:16）

#### Scenario: 提示词复制
- **WHEN** 用户点击"复制提示词"按钮
- **THEN** 提示词文本复制到剪贴板
- **AND** 按钮显示"已复制"反馈

### Requirement: 筛选功能
The system SHALL support filtering videos by:
- 分类（category）
- 标签（tags）
- 比例（aspectRatio）
- 搜索（标题、提示词、标签）

#### Scenario: 组合筛选
- **WHEN** 用户选择分类和标签
- **THEN** 显示同时满足两个条件的视频
- **AND** 标题栏显示当前筛选状态

### Requirement: 页面布局
The system SHALL use a consistent layout:
- 左侧边栏：头像、导航、搜索、筛选、关于
- 右侧主内容区：视频卡片网格/列表
- 响应式设计：移动端适配

## MODIFIED Requirements

### Requirement: 导航菜单更新
所有页面（index.html, aigc.html, bookmarks.html, aivideo.html）的导航菜单需要更新，添加 AIVideo 入口。

### Requirement: app.js 页面检测
更新 `loadArticles`, `renderArticles`, `updateContentTitle` 等函数，添加对 aivideo.html 的页面类型检测。
