# 🌟 个人博客项目 🌟

这是一个使用Next.js框架搭建的个人博客网站，主要用于分享技术和生活内容。✨

## 🏗️ 项目结构

1. **框架基础** 📚
   - 使用Next.js 15框架(React 19)
   - 使用TypeScript编写，提供更好的类型安全
   - 使用TailwindCSS进行样式设计，界面美观现代

2. **内容管理** 📝
   - 博客文章使用Markdown文件存储在`Markdowns`目录
   - 每篇文章包含标题、日期、描述、标签等元数据
   - 使用`gray-matter`库解析Markdown文件的元数据

3. **主要功能** 🛠️
   - 文章列表显示(首页)
   - 文章详情页
   - 文章浏览量统计
   - 搜索功能
   - 返回顶部按钮
   - 背景音乐播放器

## 🔄 数据流程

1. **文章获取过程** 🔍
   - 首页加载时，通过API(`/api/posts`)获取所有文章元数据
   - 点击文章后，通过API(`/api/posts/[id]`)获取单篇文章完整内容
   - Markdown文件被解析成HTML后在浏览器中显示

2. **页面路由** 🧭
   - 首页：`/` (显示所有文章列表)
   - 文章详情页：`/posts/[id]` (显示单篇文章)
   - API端点：`/api/posts`和`/api/posts/[id]`

## 🎨 前端组件

1. **页面组件** 💻
   - `app/page.tsx`: 首页，展示个人资料和文章列表
   - `app/posts/[id]/page.tsx`: 文章详情页
   - `app/layout.tsx`: 全站布局，包含页眉、页脚和音乐播放器

2. **功能性组件** 🧩
   - `ProfileCard`: 显示博主个人信息
   - `PostCard`: 显示文章预览卡片
   - `BackToTop`: 返回页面顶部按钮
   - `MusicPlayer`: 背景音乐播放器

## 🔧 后端功能

1. **文章处理** 📄
   - `app/lib/markdown.ts`: 处理Markdown文件的核心功能
   - `getSortedPostsData()`: 获取并排序所有文章
   - `getPostData()`: 获取单篇文章内容并转为HTML

2. **API路由** 🌐
   - `/api/posts`: 返回所有文章元数据
   - `/api/posts/[id]`: 返回单篇文章完整内容
   - `/api/views/[id]`: 处理文章阅读计数

## ⚙️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📝 添加新文章

1. 在`Markdowns`目录创建新的`.md`文件
2. 文件顶部添加元数据（标题、日期、描述、标签）
3. 编写Markdown内容
4. 保存后，文章会自动显示在博客中

示例文章格式：
```md
---
title: '文章标题'
date: '2023-05-01'
description: '这篇文章是关于...'
tags: ['技术', 'Next.js', '博客']
---

这里是文章内容，支持Markdown格式...
``` 