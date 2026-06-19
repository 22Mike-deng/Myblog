# 工具箱扩展规格

## Why
用户希望扩展工具箱页面，添加更多实用的小工具，提升博客的实用性和用户体验。

## What Changes
- 创建 `tools.json` 数据文件管理工具列表
- 创建 4 个新工具页面：
  1. JSON 格式化工具 (json-formatter.html)
  2. 图片压缩器 (image-compressor.html)
  3. 密码生成器 (password-generator.html)
  4. 倒计时器 (countdown-timer.html)
- 更新 `tools.html` 使用数据驱动渲染
- 更新导航菜单样式

## Impact
- 新增 4 个工具页面
- 工具箱页面改为数据驱动
- 统一工具卡片样式

## ADDED Requirements

### Requirement: JSON 格式化工具
The system SHALL provide a JSON formatter tool with:
- 输入区域粘贴 JSON 文本
- 格式化按钮美化 JSON 格式
- 压缩按钮移除多余空格
- 验证按钮检查 JSON 合法性
- 复制结果功能
- 错误提示（非法 JSON 时）

#### Scenario: 格式化 JSON
- **WHEN** 用户粘贴 JSON 并点击"格式化"
- **THEN** 显示缩进格式化的 JSON
- **AND** 语法高亮显示

### Requirement: 图片压缩器
The system SHALL provide an image compressor with:
- 拖拽或点击上传图片
- 显示原图信息和预览
- 滑动条调整压缩质量（1-100%）
- 实时预览压缩后效果
- 显示压缩前后文件大小对比
- 下载压缩后图片

#### Scenario: 压缩图片
- **WHEN** 用户上传图片并调整质量
- **THEN** 实时显示压缩效果
- **AND** 可下载压缩后的图片

### Requirement: 密码生成器
The system SHALL provide a password generator with:
- 密码长度设置（4-64 位）
- 字符类型选择：大写、小写、数字、特殊符号
- 一键生成密码
- 显示密码强度
- 复制密码功能
- 生成历史记录

#### Scenario: 生成密码
- **WHEN** 用户选择参数并点击生成
- **THEN** 生成符合要求的随机密码
- **AND** 显示密码强度等级

### Requirement: 倒计时器
The system SHALL provide a countdown timer with:
- 设置目标时间（日期+时间）
- 或选择预设：1分钟、5分钟、10分钟、30分钟、1小时
- 显示剩余时间（天时分秒）
- 开始/暂停/重置控制
- 时间到提醒（声音+视觉）
- 全屏模式

#### Scenario: 倒计时
- **WHEN** 用户设置时间并点击开始
- **THEN** 开始倒计时
- **AND** 时间到时播放提示音

### Requirement: 工具数据管理
The system SHALL manage tools via `data/tools.json`:
- `id`: 工具唯一标识
- `name`: 工具名称
- `icon`: 图标 emoji
- `description`: 工具描述
- `tags`: 功能标签
- `url`: 页面链接

#### Scenario: 工具列表渲染
- **WHEN** 用户访问 tools.html
- **THEN** 从 JSON 加载工具列表
- **AND** 渲染工具卡片网格
