import { NextResponse } from 'next/server';
import { getSortedPostsData } from '../../lib/markdown';

export async function GET() {
  try {
    const posts = getSortedPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('获取文章列表时出错:', error);
    return NextResponse.json(
      { error: '获取文章列表时出错' },
      { status: 500 }
    );
  }
} 