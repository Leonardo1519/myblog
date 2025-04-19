'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PostCard from '../components/PostCard';
import { FaSearch } from 'react-icons/fa';

// 从markdown.ts导入PostMetadata类型，但不导入任何使用fs的函数
import type { PostMetadata } from '../lib/markdown';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<PostMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const query = searchParams.get('q') || '';

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('搜索请求失败');
        }
        
        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        console.error('搜索出错:', err);
        setError('搜索过程中出现错误，请稍后再试');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">搜索结果</h1>
        {query && (
          <p className="text-gray-400 flex items-center gap-2">
            <FaSearch />
            <span>
              关键词: <span className="text-blue-400">"{query}"</span>
              {searchResults && searchResults.length > 0 && (
                <span className="ml-2">找到 {searchResults.length} 篇文章</span>
              )}
            </span>
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">正在搜索...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-xl text-red-400 mb-4">{error}</p>
        </div>
      ) : query ? (
        searchResults && searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 mb-4">没有找到匹配的文章</p>
            <p className="text-gray-500">尝试使用其他关键词搜索</p>
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400 mb-4">请输入搜索关键词</p>
          <p className="text-gray-500">在顶部搜索框中输入关键词以搜索文章</p>
        </div>
      )}
    </div>
  );
} 