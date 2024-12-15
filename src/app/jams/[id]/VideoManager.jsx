'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Video,
  Square,
  Upload,
  Undo,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { storage } from '@/utils/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const MAX_RECORDING_TIME = 10000; // 10 seconds

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
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

const VideoControlPanel = ({
  isRecording,
  videoBlob,
  uploading,
  uploadProgress,
  uploadComplete,
  isPlaying,
  hasExistingVideos,
  isRecordingMode = true,
  onStartRecording,
  onStopRecording,
  onResetRecording,
  onUpload,
  onPlayPause,
  onReset,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-center gap-4">
          {/* Recording Controls */}
          <div className="flex items-center gap-2">
            {!videoBlob ? (
              <button
                onClick={!isRecording ? onStartRecording : onStopRecording}
                disabled={uploading || isPlaying || !isRecordingMode}
                className={`p-3 text-white rounded-full transition-colors ${
                  isRecordingMode
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gray-300 cursor-not-allowed'
                } disabled:opacity-50`}
                title={
                  isRecordingMode
                    ? 'Start Recording'
                    : 'Switch to recording mode to record'
                }
              >
                {isRecording ? (
                  <Square className="w-5 h-5" />
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
                  title={
                    uploadComplete ? 'Upload Complete' : 'Upload Recording'
                  }
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
              title={
                hasExistingVideos
                  ? isPlaying
                    ? 'Pause All'
                    : 'Play All'
                  : 'No videos to play'
              }
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
              title={hasExistingVideos ? 'Reset All' : 'No videos to reset'}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoManager = ({ jamId, existingVideos = [] }) => {
  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recordingTimeoutRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        if (!videoBlob) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
    };
  }, [videoBlob]);

  useEffect(() => {
    if (videoRef.current && videoBlob) {
      videoRef.current.srcObject = null;
      videoRef.current.src = videoBlob;
      videoRef.current.load();
      videoRef.current.play().catch((err) => setError(err.message));
    }
  }, [videoBlob]);

  const startRecording = () => {
    try {
      setIsRecording(true);
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoBlob(url);
      };

      mediaRecorder.start(1000);

      recordingTimeoutRef.current = setTimeout(() => {
        if (isRecording) {
          stopRecording();
        }
      }, MAX_RECORDING_TIME);
    } catch (err) {
      setError('Failed to start recording: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
    }
  };

  const resetRecording = () => {
    if (videoBlob) {
      URL.revokeObjectURL(videoBlob);
    }
    setVideoBlob(null);
    setIsRecording(false);
    setUploadComplete(false);
    setError(null);
  };

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

  const handleUpload = async () => {
    if (!videoBlob) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      const response = await fetch(videoBlob);
      const blobData = await response.blob();

      const fileName = `${jamId}/${Date.now()}.webm`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, blobData);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          setError('Upload failed: ' + error.message);
          setUploading(false);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            setUploadProgress(100);
            setUploadComplete(true);
          } catch (err) {
            setError('Failed to get download URL: ' + err.message);
            setUploading(false);
          }
        }
      );
    } catch (err) {
      setError('Upload failed: ' + err.message);
      setUploading(false);
    }
  };

  const getGridCols = (count) => {
    if (count === 1) return 'grid-cols-1 max-w-2xl';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-4xl';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex items-center">
      <div className="w-full">
        {error && (
          <div className="p-3 mx-auto max-w-6xl mb-4 text-sm text-red-500 bg-red-50 rounded">
            {error}
          </div>
        )}

        <div className="w-full max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-3 gap-4 auto-rows-fr">
            {/* Row 1: First 3 videos */}
            {existingVideos.slice(0, 3).map((video, index) => (
              <div key={`top-${index}`} className="w-full">
                <VideoPlayer url={video} />
              </div>
            ))}

            {/* Row 2: 2 videos + camera in middle */}
            {existingVideos.slice(3, 4).map((video, index) => (
              <div key={`mid-left-${index}`} className="w-full">
                <VideoPlayer url={video} />
              </div>
            ))}

            {/* Camera Preview */}
            <div className="w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={!videoBlob}
                loop={!!videoBlob}
                className="w-full aspect-video bg-black rounded-lg shadow-lg"
                controls={!!videoBlob}
              />
            </div>

            {existingVideos.slice(4, 5).map((video, index) => (
              <div key={`mid-right-${index}`} className="w-full">
                <VideoPlayer url={video} />
              </div>
            ))}

            {/* Row 3: Last 3 videos */}
            {existingVideos.slice(5, 8).map((video, index) => (
              <div key={`bottom-${index}`} className="w-full">
                <VideoPlayer url={video} />
              </div>
            ))}
          </div>
        </div>

        <VideoControlPanel
          isRecording={isRecording}
          videoBlob={videoBlob}
          uploading={uploading}
          uploadProgress={uploadProgress}
          uploadComplete={uploadComplete}
          isPlaying={isPlaying}
          hasExistingVideos={existingVideos.length > 0}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onResetRecording={resetRecording}
          onUpload={handleUpload}
          onPlayPause={isPlaying ? handlePauseAll : handlePlayAll}
          onReset={handleResetAll}
        />
      </div>
    </div>
  );
};

export default VideoManager;
