'use client';
import { useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  Video,
  Square,
  Upload,
  Camera,
  CameraIcon,
  Redo,
  Undo,
} from 'lucide-react';

const WebcamRecorder = ({ jamId }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

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
      setRecording(true);
      chunksRef.current = [];

      const options = { mimeType: 'video/webm' };
      const mediaRecorder = new MediaRecorder(streamRef.current, options);
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
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start(1000);
    } catch (err) {
      setError('Failed to start recording: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const resetRecording = () => {
    if (videoBlob) {
      URL.revokeObjectURL(videoBlob);
    }
    setVideoBlob(null);
    setRecording(false);
  };

  const uploadVideoToStorage = async () => {
    if (!videoBlob) return;

    try {
      const response = await fetch(videoBlob);
      const blobData = await response.blob();

      setUploading(true);
      setUploadProgress(0);

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
            await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            setUploadProgress(100);
            setUploaded(true);
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

  return (
    <div className="w-4/6 mx-auto p-4 space-y-4 rounded-lg border border-gray-200">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={!videoBlob}
        loop
        className="w-full aspect-video bg-black rounded-lg"
        controls={!!videoBlob}
      />

      <div className="flex justify-center space-x-4">
        {!videoBlob ? (
          !recording ? (
            <button
              onClick={startRecording}
              className="p-3 text-white bg-red-500 rounded-full hover:bg-red-600 disabled:opacity-50"
              disabled={uploading}
            >
              <Video className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="p-3 text-white bg-red-500 rounded-full hover:bg-red-600"
            >
              <Square className="w-6 h-6" />
            </button>
          )
        ) : (
          <>
            <button
              onClick={resetRecording}
              className="p-3 text-white bg-gray-500 rounded-full hover:bg-gray-600"
            >
              <Undo className="w-6 h-6" />
            </button>
            <button
              onClick={uploadVideoToStorage}
              className="p-3 text-white bg-green-500 rounded-full hover:bg-green-600 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? (
                <div className="relative">
                  <Upload className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 text-xs bg-white text-green-500 rounded-full px-1">
                    {uploadProgress}%
                  </span>
                </div>
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WebcamRecorder;
