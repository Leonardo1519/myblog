import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-4">我的博客</h3>
            <p className="text-gray-400 max-w-md">
              分享我的技术见解、项目经验和生活感悟。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">快速链接</h4>
            <div className="flex flex-wrap space-x-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200 mb-2">
                首页
              </Link>
              <Link href="/search" className="text-gray-400 hover:text-white transition-colors duration-200 mb-2">
                搜索
              </Link>
              <Link href="/posts/technology-trends" className="text-gray-400 hover:text-white transition-colors duration-200 mb-2">
                科技趋势
              </Link>
              <Link href="/posts/huang" className="text-gray-400 hover:text-white transition-colors duration-200 mb-2">
                黄庭坚
              </Link>
              <Link href="/posts/su" className="text-gray-400 hover:text-white transition-colors duration-200 mb-2">
                苏轼
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} 我的博客. 保留所有权利.
          </p>
          
          <p className="text-gray-500 text-sm flex items-center">
            使用 <span className="mx-1 text-red-500"><FaHeart /></span> 和 Next.js 制作
          </p>
        </div>
      </div>
    </footer>
  );
} 