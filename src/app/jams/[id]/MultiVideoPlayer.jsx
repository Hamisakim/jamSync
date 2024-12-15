'use client'
// MultiVideoPlayer.jsx
import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import VideoControls from './VideoControls';

const VideoPlayer = ({ url }) => {
  const videoRef = React.useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative group w-full">
      <video
        ref={videoRef}
        src={url}
        className="w-full rounded-md aspect-video object-cover bg-gray-100"
        playsInline
        loop
      />
      <button
        onClick={handleMuteToggle}
        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

const MultiVideoPlayer = ({ videos = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videos || videos.length === 0) {
    return <div className="text-center p-4">No videos available</div>;
  }

  const handlePlayAll = () => {
    const players = document.querySelectorAll('video');
    players.forEach((player) => {
      player.play();
    });
    setIsPlaying(true);
  };

  const handlePauseAll = () => {
    const players = document.querySelectorAll('video');
    players.forEach((player) => {
      player.pause();
    });
    setIsPlaying(false);
  };

  const handleResetAll = () => {
    const players = document.querySelectorAll('video');
    players.forEach((player) => {
      player.currentTime = 0;
      player.pause();
    });
    setIsPlaying(false);
  };

  const getGridCols = (count) => {
    if (count === 1) return 'grid-cols-1 max-w-2xl';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-4xl';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl';
  };

  return (
    <div className="space-y-2 w-full mx-auto px-2">
      <div className={`grid ${getGridCols(videos.length)} gap-2 place-items-center mx-auto`}>
        {videos.map((video, index) => (
          <VideoPlayer key={index} url={video} />
        ))}
      </div>

      <VideoControls
        mode="playback"
        isPlaying={isPlaying}
        onPlayPause={isPlaying ? handlePauseAll : handlePlayAll}
        onReset={handleResetAll}
      />
    </div>
  );
};

export default MultiVideoPlayer;