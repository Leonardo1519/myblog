# 我的博客 - 个人博客网站 🚀

这是一个使用 [Next.js](https://nextjs.org) 构建的个人博客网站，集成了文章展示、搜索功能和音乐播放等特性。

## 📌 项目概述

这是一个使用 Next.js 框架构建的个人博客网站，支持文章展示、搜索功能和音乐播放功能。网站使用了现代的 React 技术和美观的 UI 设计。

## 🏗️ 整体架构

这个博客系统采用了现代的技术栈：

- **Next.js 15** - React框架，提供路由、服务端渲染等功能 🔄
- **React 19** - 用户界面库 💙
- **TypeScript** - 类型安全的JavaScript超集 🔒
- **Tailwind CSS** - 用于样式设计的工具类CSS框架 🎨
- **灰色物质(gray-matter)** - 解析markdown文件的前置元数据 📄

## 📂 文件结构

1. **app 目录** - Next.js 的主要应用目录
   - **components/** - 包含所有可复用组件
   - **lib/** - 包含工具函数
   - **api/** - 包含所有API路由
   - **posts/** - 文章页面
   - **search/** - 搜索页面

2. **Markdowns 目录** - 存放所有的博客文章内容（MD格式）

## 🔍 主要功能

### 1️⃣ 文章管理 📝
- 文章以 Markdown 格式存储在 `Markdowns` 目录中
- 使用 `gray-matter` 解析 Markdown 文件的元数据（标题、日期、标签等）
- 使用 `remark` 和相关插件将 Markdown 转换为 HTML 显示

### 2️⃣ 首页展示 🏠
- 展示个人资料卡片和最新文章列表
- 通过 API 获取所有文章的元数据
- 按日期排序展示文章列表

当用户访问首页时：
```
浏览器 -> 加载首页组件 -> 调用API获取文章列表 -> 渲染文章卡片
```

代码用`useEffect`钩子在页面加载后自动获取文章列表：
```javascript
useEffect(() => {
  async function fetchPosts() {
    // 从 /api/posts 获取文章列表
  }
  fetchPosts();
}, []);
```

### 3️⃣ 文章页面 📄
- 动态路由根据文章ID显示对应文章
- 显示文章标题、日期、标签和浏览量
- 支持返回首页的导航

当用户点击文章卡片时，会进入文章详情页：

1. **获取文章内容** 📥
   ```javascript
   const response = await fetch(`/api/posts/${id}`);
   ```

2. **更新浏览量** 👁️
   ```javascript
   const response = await fetch(`/api/views/${id}`, {
     method: 'POST',
   });
   ```

3. **显示文章内容** 📰
   ```javascript
   <div dangerouslySetInnerHTML={{ __html: post.content }} />
   ```

### 4️⃣ 搜索功能 🔎
- 支持通过关键词搜索文章
- 搜索结果以卡片形式展示
- 实时显示搜索结果数量

### 5️⃣ 音乐播放器 🎵
- 位于页面右下角的浮动音乐播放器
- 支持播放/暂停、音量调节和静音功能
- 双击音乐图标可以展开/收起更多控制选项

### 6️⃣ 响应式设计 📱
- 适配不同屏幕尺寸（手机、平板、电脑）
- 移动设备上有特殊的菜单显示方式
- 使用 Tailwind CSS 实现响应式布局

### 7️⃣ API 接口 🔌
- `/api/posts` - 获取所有文章列表
- `/api/posts/[id]` - 获取指定ID的文章内容
- `/api/search` - 搜索文章
- `/api/views/[id]` - 更新文章浏览量

## 🌊 主要逻辑流程

### 博客文章获取 (app/lib/markdown.ts) 📚

这是整个博客的核心功能！它负责：

1. **读取Markdown文件** 📖
   ```javascript
   const markdownsDirectory = path.join(process.cwd(), 'Markdowns');
   ```

2. **解析文章元数据** 🔍
   ```javascript
   const matterResult = matter(fileContents);
   ```
   > 这里使用了`gray-matter`库，它能从markdown文件开头提取YAML格式的元数据，比如标题、日期等

3. **转换Markdown为HTML** ✨
   ```javascript
   const processedContent = await remark()
     .use(remarkRehype)
     .use(rehypeRaw)
     .use(rehypeStringify)
     .process(matterResult.content);
   ```

所有文章排序后显示在首页，最新的文章排在最前面：
```javascript
return allPostsData.sort((a, b) => {
  if (a.date < b.date) {
    return 1;
  } else {
    return -1;
  }
});
```

### 个性化组件 🧩

1. **个人资料卡片** (ProfileCard.tsx) 👤
   展示作者信息、社交媒体链接等

2. **文章卡片** (PostCard.tsx) 🃏
   展示文章摘要、发布日期、标签等

3. **音乐播放器** (MusicPlayer.tsx) 🎵
   页面还集成了音乐播放器功能

## 🛠️ 技术栈
- **前端框架**: Next.js (React)
- **样式**: Tailwind CSS
- **图标**: React Icons
- **Markdown处理**: gray-matter, remark
- **音乐播放**: use-sound
- **类型系统**: TypeScript

## ✨ 技术亮点

1. **Next.js API Routes** 🔌
   - 使用Next.js的API路由功能创建自己的API端点
   - `/api/posts` - 获取所有文章
   - `/api/posts/[id]` - 获取单篇文章
   - `/api/views` - 管理文章浏览量

2. **动态路由** 🛣️
   - 使用`[id]`创建动态路由，可以根据文章ID显示不同内容

3. **TypeScript类型安全** 🛡️
   - 使用接口定义数据结构，如`PostMetadata`和`Post`接口

4. **响应式设计** 📱
   - 使用Tailwind CSS实现响应式布局，在不同设备上都能良好显示

5. **错误处理** ⚠️
   - 代码中包含完善的错误处理，当文件不存在或处理出错时提供友好的反馈

## 🌈 特色亮点
- 干净现代的UI设计 ✨
- 完善的错误处理 🛡️
- 良好的用户体验（加载状态、错误提示）🔄
- 音乐背景增强用户体验 🎧
- 响应式设计适配各种设备 📲

## 🚀 开始使用

首先，运行开发服务器:

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

你可以通过修改 `app/page.tsx` 来开始编辑页面。当你编辑文件时，页面会自动更新。

## 📝 添加新文章

如果你想添加新文章，只需在`Markdowns`目录添加新的`.md`文件，网站会自动加载并显示！🚀

文章格式示例:

```markdown
---
title: '文章标题'
date: '2023-01-01'
description: '这是文章的简短描述'
tags: ['标签1', '标签2']
---

这里是文章正文内容，支持Markdown格式...
```

## 📚 了解更多

要了解有关 Next.js 的更多信息，请查看以下资源:

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的功能和 API。
- [学习 Next.js](https://nextjs.org/learn) - 一个交互式的 Next.js 教程。

你可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js) - 欢迎你的反馈和贡献!

## 🌐 部署在 Vercel

部署 Next.js 应用程序的最简单方法是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

有关更多详细信息，请查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。
