'use client';
import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

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
    <div className="relative group">
      <video
        ref={videoRef}
        src={url}
        className="w-full rounded-lg aspect-video object-cover"
        playsInline
        loop
      />
      <button
        onClick={handleMuteToggle}
        className="absolute bottom-2 right-2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
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

const MultiVideoPlayer = ({ videos = [], controls }) => {
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <VideoPlayer key={index} url={video} />
        ))}
      </div>

      {controls && (
        <div className="flex justify-center gap-4 p-4">
          <button
            onClick={isPlaying ? handlePauseAll : handlePlayAll}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={handleResetAll}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiVideoPlayer;