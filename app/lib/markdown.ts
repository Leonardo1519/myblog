import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const markdownsDirectory = path.join(process.cwd(), 'Markdowns');

export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Post extends PostMetadata {
  content: string;
}

export function getAllPostIds() {
  try {
    // 确保目录存在
    if (!fs.existsSync(markdownsDirectory)) {
      console.warn(`警告: Markdowns 目录不存在于 ${markdownsDirectory}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(markdownsDirectory);
    return fileNames.filter(fileName => fileName.endsWith('.md')).map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      };
    });
  } catch (error) {
    console.error('获取所有文章 ID 时出错:', error);
    return [];
  }
}

export function getSortedPostsData(): PostMetadata[] {
  try {
    // 确保目录存在
    if (!fs.existsSync(markdownsDirectory)) {
      console.warn(`警告: Markdowns 目录不存在于 ${markdownsDirectory}`);
      return [];
    }
    
    // 获取/Markdowns目录下的所有文件名
    const fileNames = fs.readdirSync(markdownsDirectory);
    
    // 过滤只保留 .md 文件
    const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));
    
    if (markdownFiles.length === 0) {
      console.warn('警告: Markdowns 目录中没有 .md 文件');
      return [];
    }
    
    const allPostsData = markdownFiles.map(fileName => {
      // 去掉.md后缀，得到id
      const id = fileName.replace(/\.md$/, '');

      try {
        // 将markdown文件作为字符串读取
        const fullPath = path.join(markdownsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // 使用gray-matter解析post的元数据部分
        const matterResult = matter(fileContents);
        const matterData = matterResult.data;

        // 确保所有必需的元数据字段都存在，如果不存在则提供默认值
        return {
          id,
          title: matterData.title || '无标题',
          date: matterData.date || new Date().toISOString().slice(0, 10),
          description: matterData.description || '无描述',
          tags: Array.isArray(matterData.tags) ? matterData.tags : []
        } as PostMetadata;
      } catch (error) {
        console.error(`处理文件 ${fileName} 时出错:`, error);
        // 返回带有默认值的对象
        return {
          id,
          title: `文件 ${fileName} 处理出错`,
          date: new Date().toISOString().slice(0, 10),
          description: '无法读取此文件的内容',
          tags: []
        } as PostMetadata;
      }
    });

    // 按日期排序
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('获取排序后的文章数据时出错:', error);
    return [];
  }
}

export async function getPostData(id: string): Promise<Post> {
  try {
    const fullPath = path.join(markdownsDirectory, `${id}.md`);
    
    // 检查文件是否存在
    if (!fs.existsSync(fullPath)) {
      console.error(`文件不存在: ${fullPath}`);
      return {
        id,
        title: '文章不存在',
        date: new Date().toISOString().slice(0, 10),
        description: '找不到请求的文章',
        tags: [],
        content: '<p>抱歉，找不到请求的文章。</p>'
      };
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用gray-matter解析post的元数据部分
    const matterResult = matter(fileContents);
    const matterData = matterResult.data;

    // 使用remark将markdown处理为HTML字符串
    const processedContent = await remark()
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // 将数据与id和contentHtml组合，确保提供默认值
    return {
      id,
      content: contentHtml,
      title: matterData.title || '无标题',
      date: matterData.date || new Date().toISOString().slice(0, 10),
      description: matterData.description || '无描述',
      tags: Array.isArray(matterData.tags) ? matterData.tags : []
    };
  } catch (error) {
    console.error(`获取文章 ${id} 数据时出错:`, error);
    return {
      id,
      title: '加载文章出错',
      date: new Date().toISOString().slice(0, 10),
      description: '加载此文章时发生错误',
      tags: [],
      content: '<p>抱歉，加载文章时发生错误。</p>'
    };
  }
} 