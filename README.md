# MyBlog - 个人博客项目代码解析 🚀

## 整体架构 🏗️

这是一个使用 Next.js 构建的个人博客网站，采用了现代的技术栈：

- **Next.js 15** - React框架，提供路由、服务端渲染等功能 🔄
- **React 19** - 用户界面库 💙
- **TypeScript** - 类型安全的JavaScript超集 🔒
- **Tailwind CSS** - 用于样式设计的工具类CSS框架 🎨
- **灰色物质(gray-matter)** - 解析markdown文件的前置元数据 📄

## 项目结构简介 📁

1. **app目录** - 主要应用代码
   - **components/** - UI组件
   - **lib/** - 工具函数
   - **api/** - API接口
   - **posts/** - 博客文章页面
   - **search/** - 搜索功能

2. **Markdowns/** - 存放所有博客内容的markdown文件 📝

## 主要逻辑流程 🌊

### 1. 首页展示 (app/page.tsx) 🏠

首页的主要功能是：
- 展示个人资料卡片 👤
- 显示最新博客文章列表 📰

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

### 2. 博客文章获取 (app/lib/markdown.ts) 📚

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

### 3. 文章详情页 (app/posts/[id]/page.tsx) 📄

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

### 4. 个性化组件 🧩

1. **个人资料卡片** (ProfileCard.tsx) 👤
   展示作者信息、社交媒体链接等

2. **文章卡片** (PostCard.tsx) 🃏
   展示文章摘要、发布日期、标签等

3. **音乐播放器** (MusicPlayer.tsx) 🎵
   页面还集成了音乐播放器功能

## 技术亮点 ✨

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

## 入门指南

本地开发服务器启动方法:

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

## 添加新文章

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
