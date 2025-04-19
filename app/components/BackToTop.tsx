'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpToLine } from 'lucide-react'

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件，显示/隐藏按钮
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // 返回顶部功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 bg-gray-800 dark:bg-gray-700 text-white w-12 h-12 flex items-center justify-center rounded-md shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all z-50"
          aria-label="返回顶部"
        >
          <ArrowUpToLine size={24} />
        </button>
      )}
    </>
  )
}

export default BackToTop 