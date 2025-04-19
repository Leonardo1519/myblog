'use client';

import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMusic } from 'react-icons/fa';
import useSound from 'use-sound';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const songName = "I Will Succeed";
  
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

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-3 rounded-lg shadow-lg flex items-center space-x-3 z-50">
      <div className="flex items-center mr-2">
        <FaMusic className="text-blue-400 mr-2" />
        <span className="text-white text-sm hidden md:inline">{songName}</span>
      </div>
      
      <button 
        onClick={togglePlay} 
        className="text-white hover:text-blue-400 focus:outline-none transition-colors"
        aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      
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
  );
} 