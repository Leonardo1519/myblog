'use client';

import { useEffect, useState } from 'react';
import PostCard from './components/PostCard';
import ProfileCard from './components/ProfileCard';
import BackToTop from './components/BackToTop';
import type { PostMetadata } from './lib/markdown';

export default function Home() {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('获取文章列表失败');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('加载文章列表时出错:', err);
        setError('加载文章列表时出现错误，请稍后再试');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPosts();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧：个人资料 */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-4 lg:self-start">
          <ProfileCard />
        </div>
        
        {/* 右侧：最新文章 */}
        <div className="w-full lg:w-2/3">
          <div className="mb-8 flex items-center">
            <h2 className="text-2xl font-bold text-white">最新文章</h2>
            <div className="ml-3 h-px bg-gray-700 flex-grow"></div>
          </div>
          
          {isLoading ? (
            <div className="bg-gray-800 rounded-lg p-10 text-center">
              <p className="text-gray-400">加载中...</p>
            </div>
          ) : error ? (
            <div className="bg-gray-800 rounded-lg p-10 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-10 text-center">
              <p className="text-gray-400">暂无文章</p>
            </div>
          )}
        </div>
      </div>
      
      {/* 返回顶部按钮 */}
      <BackToTop />
    </div>
  );
}
