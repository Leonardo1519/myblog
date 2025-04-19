import { NextResponse } from 'next/server';
import { getPostData } from '../../../lib/markdown';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log(`API: 正在获取文章 ID [${id}]`);

  try {
    const post = await getPostData(id);
    console.log(`API: 文章获取成功，标题: ${post.title}`);
    return NextResponse.json(post);
  } catch (error) {
    console.error(`API: 获取文章 ${id} 数据时出错:`, error);
    return NextResponse.json(
      { error: `获取文章 ${id} 数据时出错: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 