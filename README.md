# 静态个人博客网站

一个纯静态的个人博客网站，采用复古像素风格设计，支持文章展示、AIGC内容管理和网页书签导航。

## 功能特性

### 1. 文章页面 (index.html)
- 文章列表展示
- 标签云筛选
- 全文搜索
- 文章详情阅读

### 2. AIGC 页面 (aigc.html)
- 图文卡片展示
- 支持 4 种图片比例：1:1、3:4、9:16、16:9
- 比例筛选
- 标签筛选
- 提示词复制功能

### 3. 书签页面 (bookmarks.html)
- 3列网格布局展示书签
- 分类筛选
- 标签筛选
- 点击跳转

## 项目结构

```
.
├── index.html          # 文章首页
├── aigc.html           # AIGC 内容页
├── bookmarks.html      # 书签导航页
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── app.js          # 核心脚本
├── data/
│   ├── index.json      # 文章索引
│   ├── articles/       # 文章详情
│   ├── aigc.json       # AIGC 数据
│   └── bookmarks.json  # 书签数据
└── images/             # 图片资源
```

## 技术栈

- 纯 HTML/CSS/JavaScript
- 无后端依赖
- 本地 JSON 数据存储
- 响应式设计

## 本地预览

直接在浏览器中打开 `index.html` 即可。

## 数据格式

### 文章数据 (data/articles/article-*.json)
```json
{
  "id": "article-1",
  "title": "文章标题",
  "date": "2026-01-15",
  "tags": ["标签1", "标签2"],
  "summary": "文章摘要",
  "content": "HTML内容"
}
```

### AIGC 数据 (data/aigc.json)
```json
{
  "items": [
    {
      "id": "aigc-1",
      "title": "标题",
      "image": "图片路径",
      "category": "类别",
      "prompt": "提示词",
      "aspectRatio": "16:9",
      "date": "2026-05-01",
      "tags": ["标签"],
      "summary": "简介"
    }
  ]
}
```

### 书签数据 (data/bookmarks.json)
```json
{
  "items": [
    {
      "id": "bm-1",
      "title": "网站名称",
      "url": "https://example.com",
      "description": "描述",
      "category": "分类",
      "icon": "图标URL",
      "tags": ["标签"],
      "date": "2026-05-01"
    }
  ]
}
```

## 主题配色

- 主背景：#2d1b4e（深紫）
- 卡片背景：#3d2b5e（紫色）
- 强调色：#ff6b9d（粉色）
- 次要色：#4ecdc4（青色）
- 金色：#ffd700

## 作者

Sparta-Silence
