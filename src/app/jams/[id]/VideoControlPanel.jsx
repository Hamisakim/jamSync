import React from 'react';
import { Play, Pause, RotateCcw, Video, Square, Upload, Undo } from 'lucide-react';

const VideoControlPanel = ({ 
  // Recording states
  isRecording = false,
  videoBlob = null,
  uploading = false,
  uploadProgress = 0,
  uploadComplete = false,
  // Playback states
  isPlaying = false,
  hasExistingVideos = false,
  // Mode indicator
  isRecordingMode = true,
  // Handlers
  onStartRecording,
  onStopRecording,
  onResetRecording,
  onUpload,
  onPlayPause,
  onReset
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-center gap-4">
          {/* Recording Controls */}
          <div className="flex items-center gap-2">
            {!videoBlob ? (
              <button
                onClick={onStartRecording}
                disabled={uploading || isPlaying || !isRecordingMode}
                className={`p-3 text-white rounded-full transition-colors ${
                  isRecordingMode 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gray-300 cursor-not-allowed'
                } disabled:opacity-50`}
                title={isRecordingMode ? "Start Recording" : "Switch to recording mode to record"}
              >
                {isRecording ? (
                  <Square className="w-5 h-5" onClick={onStopRecording} />
                ) : (
                  <Video className="w-5 h-5" />
                )}
              </button>
            ) : (
              <>
                <button
                  onClick={onResetRecording}
                  disabled={uploading}
                  className="p-3 text-white bg-gray-500 hover:bg-gray-600 rounded-full transition-colors disabled:opacity-50"
                  title="Reset Recording"
                >
                  <Undo className="w-5 h-5" />
                </button>
                <button
                  onClick={onUpload}
                  disabled={uploading || uploadComplete}
                  className="p-3 text-white bg-green-500 hover:bg-green-600 rounded-full transition-colors disabled:opacity-50"
                  title={uploadComplete ? "Upload Complete" : "Upload Recording"}
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

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200" />

          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPlayPause}
              disabled={isRecording || !hasExistingVideos}
              className="p-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors disabled:opacity-50"
              title={hasExistingVideos ? (isPlaying ? "Pause All" : "Play All") : "No videos to play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onReset}
              disabled={isRecording || !hasExistingVideos}
              className="p-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
              title={hasExistingVideos ? "Reset All" : "No videos to reset"}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControlPanel;