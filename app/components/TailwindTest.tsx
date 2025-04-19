import React from 'react';

export default function TailwindTest() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6 bg-gray-100 border-2 border-blue-500">
      <h1 className="text-2xl font-bold text-red-500">Tailwind CSS 测试</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 测试自定义颜色 */}
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow">
          蓝色背景
        </div>
        <div className="p-4 bg-yellow-400 text-black rounded-lg shadow">
          黄色背景
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow">
          红色背景
        </div>
      </div>
      
      {/* 测试常规Tailwind功能 */}
      <div className="p-4 bg-white rounded-lg shadow-lg">
        阴影效果
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          按钮
        </button>
      </div>
    </div>
  );
} 