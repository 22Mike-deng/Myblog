# 静态个人博客网站

一个纯静态的个人博客网站，采用复古像素风格设计，支持文章展示、AIGC内容管理、AI视频展示、网页书签导航和实用工具集合。

## 功能特性

### 1. 文章页面 (index.html)
- 文章列表展示
- 标签云筛选
- 全文搜索
- 文章详情阅读（侧滑面板）
- 角色档案弹窗（点击头像）
- 留言板入口

### 2. AIGC 页面 (aigc.html)
- 图文卡片展示
- 支持 4 种图片比例：1:1、3:4、9:16、16:9
- 比例筛选
- 标签筛选
- 提示词复制功能
- 热度排序
- 第一期AIGC绘画创作投票活动入口

### 3. AIVideo 页面 (aivideo.html)
- AI生成视频展示
- 视频卡片列表
- 分类筛选
- 比例筛选（16:9、9:16）
- 标签筛选
- 提示词复制功能
- 热度排序
- 支持外部视频链接播放

### 4. 书签页面 (bookmarks.html)
- 网格布局展示书签
- 分类筛选
- 标签筛选
- 全文搜索
- 点击跳转
- 使用程度热度标识

### 5. 工具箱页面 (tools.html)
- 工具卡片网格展示
- 7个实用在线工具：
  - **图片分割器** (image-splitter.html)：将图片分割成多个小图块，支持批量处理和自定义命名规则
  - **JSON 格式化** (json-formatter.html)：格式化、压缩、验证 JSON 数据，支持语法高亮和复制功能
  - **图片压缩器** (image-compressor.html)：压缩图片文件大小，支持质量调整和实时预览对比
  - **密码生成器** (password-generator.html)：生成高强度随机密码，支持自定义长度和字符类型
  - **倒计时器** (countdown-timer.html)：多功能倒计时工具，支持预设时间和时间到提醒
  - **图片格式转换** (image-converter.html)：PNG、JPG、WebP 格式互转，支持批量转换
  - **图片水印** (image-watermark.html)：为图片添加文字或图片水印，支持自定义位置和透明度

## 项目结构

```
.
├── index.html              # 文章首页
├── aigc.html               # AIGC 内容页
├── aivideo.html            # AI视频展示页
├── bookmarks.html          # 书签导航页
├── tools.html              # 工具箱首页
├── image-splitter.html     # 图片分割器工具
├── json-formatter.html     # JSON格式化工具
├── image-compressor.html   # 图片压缩器工具
├── password-generator.html # 密码生成器工具
├── countdown-timer.html    # 倒计时器工具
├── image-converter.html    # 图片格式转换工具
├── image-watermark.html    # 图片水印工具
├── css/
│   └── style.css           # 样式文件
├── js/
│   └── app.js              # 核心脚本
├── data/
│   ├── index.json          # 文章索引
│   ├── articles/           # 文章详情
│   │   ├── article-1.json
│   │   ├── article-2.json
│   │   ├── article-3.json
│   │   ├── article-4.json
│   │   └── article-5.json
│   ├── aigc.json           # AIGC 数据
│   ├── aivideo.json        # AIVideo 数据
│   ├── bookmarks.json      # 书签数据
│   └── tools.json          # 工具列表数据
└── images/                 # 图片资源
    ├── avatar.png          # 头像
    └── aigc/               # AIGC图片
        ├── 001.jpg
        ├── cyberpunk-city.jpg
        ├── ink-landscape.jpg
        ├── mecha-girl.jpg
        └── tiramisu.jpg
```

## 技术栈

- 纯 HTML5/CSS3/JavaScript
- 无后端依赖
- 本地 JSON 数据存储
- 响应式设计
- Google Fonts 字体

## 本地预览

直接在浏览器中打开 `index.html` 即可。

推荐使用本地服务器预览（避免跨域问题）：

```bash
# Python 3
python -m http.server 8000

# Node.js (需安装 http-server)
npx http-server

# VS Code Live Server 插件
```

然后访问 `http://localhost:8000`

## 数据格式

### 文章索引 (data/index.json)
```json
{
  "articles": [
    {
      "id": "article-1",
      "title": "文章标题",
      "summary": "文章摘要",
      "tags": ["标签1", "标签2"],
      "date": "2026-01-15",
      "cover": "封面图片路径"
    }
  ]
}
```

### 文章详情 (data/articles/article-*.json)
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
      "summary": "简介",
      "heat": 8750
    }
  ]
}
```

### AIVideo 数据 (data/aivideo.json)
```json
{
  "items": [
    {
      "id": "video-1",
      "title": "视频标题",
      "videoUrl": "视频链接",
      "prompt": "提示词",
      "heat": 9280,
      "date": "2026-05-10",
      "category": "概念艺术",
      "tags": ["国漫", "科幻"],
      "aspectRatio": "16:9"
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
      "date": "2026-05-01",
      "heat": 980
    }
  ]
}
```

### 工具数据 (data/tools.json)
```json
{
  "tools": [
    {
      "id": "image-splitter",
      "name": "图片分割器",
      "icon": "✂️",
      "description": "工具描述",
      "tags": ["图片处理", "批量处理"],
      "url": "image-splitter.html"
    }
  ]
}
```

## 主题配色

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| 主背景 | `#2d1b4e` | 页面背景 |
| 卡片背景 | `#3d2b5e` | 卡片、侧边栏 |
| 强调色 | `#ff6b9d` | 按钮、高亮 |
| 次要色 | `#4ecdc4` | 链接、标签 |
| 金色 | `#ffd700` | 标题、装饰 |
| 文字主色 | `#f5f5f5` | 正文 |
| 文字次色 | `#b8b8d1` | 描述、辅助文字 |

## 导航结构

所有页面共享统一的侧边栏导航：
- 📝 文章 (index.html)
- 🎨 AIGC (aigc.html)
- 📹 AIVideo (aivideo.html)
- 🔖 书签 (bookmarks.html)
- 🛠️ 工具箱 (tools.html)

## 使用说明

### 添加新文章
1. 在 `data/articles/` 目录下创建新的 JSON 文件
2. 在 `data/index.json` 中添加文章索引

### 添加 AIGC 内容
1. 将图片放入 `images/aigc/` 目录
2. 在 `data/aigc.json` 中添加内容项

### 添加 AIVideo 内容
1. 准备视频链接（支持外部平台）
2. 在 `data/aivideo.json` 中添加视频项

### 添加书签
在 `data/bookmarks.json` 中添加书签项

### 添加工具
1. 创建工具页面 HTML 文件
2. 在 `data/tools.json` 中添加工具信息

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 注意事项

1. 由于使用 ES6 模块和 Fetch API，建议使用现代浏览器访问
2. 本地直接打开 HTML 文件时，部分浏览器可能限制 Fetch API 加载本地 JSON，建议使用本地服务器
3. 图片资源建议使用相对路径
4. 头像图片路径为 `images/avatar.png`

## 作者

Sparta-Silence

---

*最后更新：2026-05-23*
