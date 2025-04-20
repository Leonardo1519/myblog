import { NextRequest, NextResponse } from 'next/server';
import { getPostViews, incrementPostViews } from '@/app/lib/viewsCounter';

// GET: 获取文章浏览量
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(
  request: NextRequest,
  context: any
) {
  const id = context.params.id;
  
  try {
    const views = getPostViews(id);
    return NextResponse.json({ views });
  } catch (error) {
    console.error(`获取文章 ${id} 浏览量时出错:`, error);
    return NextResponse.json(
      { error: `获取浏览量数据时出错` },
      { status: 500 }
    );
  }
}

// POST: 增加文章浏览量
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(
  request: NextRequest,
  context: any
) {
  const id = context.params.id;
  
  try {
    const views = incrementPostViews(id);
    return NextResponse.json({ views });
  } catch (error) {
    console.error(`增加文章 ${id} 浏览量时出错:`, error);
    return NextResponse.json(
      { error: `增加浏览量数据时出错` },
      { status: 500 }
    );
  }
} 