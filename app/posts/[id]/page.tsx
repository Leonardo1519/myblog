'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaTag, FaEye } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import BackToTop from '../../components/BackToTop';
import type { Post } from '../../lib/markdown';

export default function PostPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [post, setPost] = useState<Post | null>(null);
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPostData() {
      setIsLoading(true);
      setError('');

      try {
        console.log("正在获取文章:", id);
        const response = await fetch(`/api/posts/${id}`);
        
        if (!response.ok) {
          throw new Error(`获取文章内容失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("文章数据:", data);
        setPost(data);
      } catch (err) {
        console.error('加载文章时出错:', err);
        setError(`加载文章内容时出现错误: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchPostData();
    }
  }, [id]);

  useEffect(() => {
    if (!id || isLoading) return;

    async function fetchAndIncrementViews() {
      try {
        const response = await fetch(`/api/views/${id}`, {
          method: 'POST',
        });
        
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error('更新浏览量时出错:', error);
      }
    }

    fetchAndIncrementViews();
  }, [id, isLoading]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-xl text-gray-400">正在加载文章...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-xl text-red-400 mb-4">{error}</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          返回首页
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-xl text-gray-400 mb-4">文章不存在</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          返回首页
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 mb-4"
        >
          <FaArrowLeft size={14} />
          <span>返回首页</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center text-gray-400 text-sm mb-6">
          <div className="flex items-center mr-6 mb-2">
            <FaCalendarAlt className="mr-2" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          
          <div className="flex items-center mr-6 mb-2">
            <FaEye className="mr-2" />
            <span>{views} 次浏览</span>
          </div>
          
          <div className="flex flex-wrap items-center mb-2">
            <FaTag className="mr-2" />
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 ? (
              post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-800 rounded-full px-3 py-1 text-xs mr-2">
                  {tag}
                </span>
              ))
            ) : (
              <span className="bg-gray-800 rounded-full px-3 py-1 text-xs mr-2">无标签</span>
            )}
          </div>
        </div>
      </div>
      
      <div 
        className="prose prose-lg prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <BackToTop />
    </article>
  );
} 