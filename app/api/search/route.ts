import { NextResponse } from 'next/server';
import { getSortedPostsData } from '../../lib/markdown';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    // 获取所有文章数据
    const allPosts = getSortedPostsData();
    
    // 如果没有搜索查询，返回所有文章
    if (!query) {
      return NextResponse.json(allPosts);
    }
    
    // 执行搜索
    const searchQuery = query.toLowerCase();
    const results = allPosts.filter(post => {
      return (
        post.title.toLowerCase().includes(searchQuery) ||
        post.description.toLowerCase().includes(searchQuery) ||
        (post.tags && Array.isArray(post.tags) && post.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery)
        ))
      );
    });
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('搜索出错:', error);
    return NextResponse.json(
      { error: '搜索处理过程中出错' },
      { status: 500 }
    );
  }
} 