'use client';

import Image from 'next/image';
import { FaGithub, FaTwitter, FaEnvelope, FaLinkedin } from 'react-icons/fa';

export default function ProfileCard() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full">
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
        {/* 这里可以放背景图 */}
      </div>
      
      <div className="relative -mt-14 px-6 flex justify-center">
        <div className="bg-gray-700 rounded-full p-1">
          <div className="bg-gray-900 rounded-full w-24 h-24 overflow-hidden border-4 border-gray-700">
            <Image
              src="/Capybara.jpg"
              alt="水豚头像"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 text-center">
        <h2 className="text-xl font-bold text-white mb-1">IT民工卡皮巴拉</h2>
        <p className="text-gray-400 text-sm mb-4">开发者 & 博主</p>
        
        <div className="flex justify-center space-x-5 mb-5">
          <a href="https://github.com/" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} />
          </a>
          <a href="https://twitter.com/" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} />
          </a>
          <a href="mailto:your-email@example.com" className="text-gray-400 hover:text-white">
            <FaEnvelope size={20} />
          </a>
          <a href="https://linkedin.com/" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} />
          </a>
        </div>
        
        <div className="text-gray-300 mb-5 text-sm">
          热爱技术、写作和分享的全栈开发者。在这个博客上，我将分享我的技术见解、项目经验和生活感悟。
        </div>
        
        <div className="flex flex-wrap justify-center">
          <span className="bg-blue-900 text-blue-300 rounded-full px-3 py-1 text-xs mr-2 mb-2">React</span>
          <span className="bg-green-900 text-green-300 rounded-full px-3 py-1 text-xs mr-2 mb-2">Next.js</span>
          <span className="bg-yellow-900 text-yellow-300 rounded-full px-3 py-1 text-xs mr-2 mb-2">TypeScript</span>
          <span className="bg-red-900 text-red-300 rounded-full px-3 py-1 text-xs mr-2 mb-2">Node.js</span>
        </div>
      </div>
    </div>
  );
} 