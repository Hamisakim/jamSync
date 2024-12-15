'use client'
import React from 'react';
import { Play, Pause, RotateCcw, Video, Square, Upload, Undo } from 'lucide-react';

const VideoControls = ({
  mode = 'playback', // 'playback' or 'recording'
  isPlaying,
  isRecording,
  videoBlob,
  uploading,
  uploadProgress,
  onPlayPause,
  onReset,
  onStartRecording,
  onStopRecording,
  onResetRecording,
  onUpload,
}) => {
  if (mode === 'recording') {
    return (
      <div className="flex justify-center gap-2">
        {!videoBlob ? (
          !isRecording ? (
            <button
              onClick={onStartRecording}
              className="p-3 text-white bg-red-500 rounded-full hover:bg-red-600 disabled:opacity-50 transition-colors"
              disabled={uploading}
            >
              <Video className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onStopRecording}
              className="p-3 text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <Square className="w-5 h-5" />
            </button>
          )
        ) : (
          <>
            <button
              onClick={onResetRecording}
              className="p-3 text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
            >
              <Undo className="w-5 h-5" />
            </button>
            <button
              onClick={onUpload}
              className="p-3 text-white bg-green-500 rounded-full hover:bg-green-600 disabled:opacity-50 transition-colors"
              disabled={uploading}
            >
              {uploading ? (
                <div className="relative">
                  <Upload className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 text-xs bg-white text-green-500 rounded-full px-1">
                    {uploadProgress}%
                  </span>
                </div>
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={onPlayPause}
        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      <button
        onClick={onReset}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
};

export default VideoControls;