'use client';

import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMusic } from 'react-icons/fa';
import useSound from 'use-sound';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  
  const [play, { stop, sound }] = useSound('/music/background-music.mp3', {
    volume: isMuted ? 0 : volume,
    loop: true,
  });

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      stop();
    }
    
    return () => {
      stop();
    };
  }, [isPlaying, play, stop]);

  useEffect(() => {
    if (sound) {
      sound.volume(isMuted ? 0 : volume);
    }
  }, [isMuted, volume, sound]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const togglePanel = () => {
    setIsPanelExpanded(!isPanelExpanded);
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 bg-gray-800 p-3 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center">
        {/* 音乐图标 - 可双击展开/收起面板 */}
        <div 
          className="flex items-center cursor-pointer" 
          onDoubleClick={togglePanel}
          title="双击展开/折叠音量控制"
        >
          <FaMusic className="text-blue-400" />
        </div>
        
        {/* 播放/暂停按钮 - 始终可见 */}
        <button 
          onClick={togglePlay} 
          className="text-white hover:text-blue-400 focus:outline-none transition-colors ml-3"
          aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        {/* 展开的控制面板 */}
        {isPanelExpanded && (
          <div className="flex items-center ml-3 space-x-3 animate-fadeIn">
            <button 
              onClick={toggleMute} 
              className="text-white hover:text-blue-400 focus:outline-none transition-colors"
              aria-label={isMuted ? '取消静音' : '静音'}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-blue-500"
              disabled={isMuted}
            />
          </div>
        )}
      </div>
    </div>
  );
} 