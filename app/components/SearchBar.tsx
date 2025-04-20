'use client';

import { useState, useEffect, Suspense } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

// 搜索表单组件
function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="搜索文章..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      />
      <button 
        type="submit" 
        className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-200"
        aria-label="搜索"
      >
        <FaSearch />
      </button>
    </form>
  );
}

// 搜索栏加载中状态
function SearchBarFallback() {
  return (
    <div className="relative w-full max-w-md">
      <div className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-md text-gray-500">
        加载中...
      </div>
    </div>
  );
}

// 主搜索栏组件
export default function SearchBar() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <SearchForm />
    </Suspense>
  );
} 