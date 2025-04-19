'use client';

import Link from 'next/link';
import { PostMetadata } from '../lib/markdown';
import { FaCalendarAlt, FaTag, FaEye } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  const [views, setViews] = useState<number>(0);
  
  useEffect(() => {
    // 获取文章浏览量
    async function fetchViews() {
      try {
        const response = await fetch(`/api/views/${post.id}`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error('获取浏览量时出错:', error);
      }
    }
    
    fetchViews();
  }, [post.id]);

  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link href={`/posts/${post.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-gray-700 hover:border-gray-600">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-200 mb-3">
            {post.title || '无标题'}
          </h2>
          
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <div className="flex items-center mr-4">
              <FaCalendarAlt className="mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-1" />
              <span>{views} 次</span>
            </div>
          </div>
          
          <p className="text-gray-300 mb-4 line-clamp-3">
            {post.description || '无描述'}
          </p>
          
          <div className="flex flex-wrap items-center">
            <FaTag className="text-gray-500 mr-2" />
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 ? (
              post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-xs mr-2 mb-2">
                  {tag}
                </span>
              ))
            ) : (
              <span className="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-xs mr-2 mb-2">
                无标签
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 