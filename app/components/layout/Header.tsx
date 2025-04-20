'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from '../SearchBar';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200">
            我的博客
          </Link>

          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`flex items-center space-x-1 text-sm font-medium ${
                pathname === '/' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              <FaHome />
              <span>首页</span>
            </Link>
            <div className="w-64">
              <SearchBar />
            </div>
          </nav>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`flex items-center space-x-1 text-sm font-medium ${
                  pathname === '/' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome />
                <span>首页</span>
              </Link>
              <div className="pt-2">
                <SearchBar />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 