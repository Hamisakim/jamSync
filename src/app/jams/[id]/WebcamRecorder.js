'use client';
import { useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const WebcamRecorder = ({ jamId }) => {

  console.log('🚀 ~ file: WebcamRecorder.js:8 ~ WebcamRecorder ~ jamId:', jamId);

  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    const startVideoAndAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true, // Enable audio recording
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setError(null);
      } catch (err) {
        console.error('Error accessing media devices:', err);
        setError(err.message);
      }
    };

    startVideoAndAudio();

    return () => {
      const currentVideoRef = videoRef.current;
      if (currentVideoRef && currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    try {
      setRecording(true);
      chunksRef.current = [];

      const options = {
        mimeType: 'video/webm;codecs=vp8,opus', // Include opus codec for audio
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
      };

      const mediaRecorder = new MediaRecorder(
        videoRef.current.srcObject,
        options
      );
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunksRef.current, {
          type: 'video/webm;codecs=vp8,opus',
        });
        setVideoBlob(videoBlob);
      };

      mediaRecorder.start(1000); // Collect data every second
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start recording: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const uploadVideoToStorage = async (videoBlob) => {
    if (!videoBlob) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      //jamTitle/number
      const fileName = `${jamId}/${Date.now()}.webm`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, videoBlob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Error uploading video:', error);
          setError('Failed to upload: ' + error.message);
          setUploading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File uploaded successfully! URL:', downloadURL);
            // Here you could update your Firestore document with the video URL
            setUploading(false);
            setUploadProgress(100);
          } catch (err) {
            console.error('Error getting download URL:', err);
            setError('Failed to get download URL: ' + err.message);
            setUploading(false);
          }
        }
      );
    } catch (err) {
      console.error('Error initiating upload:', err);
      setError('Failed to start upload: ' + err.message);
      setUploading(false);
    }
  };

  return (
    <div className="w-full p-4 space-y-4 rounded-lg border border-gray-200">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full aspect-video bg-black rounded-lg"
      />

      <div className="space-x-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={uploading}
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Stop Recording
          </button>
        )}

        {videoBlob && !recording && (
          <button
            onClick={() => uploadVideoToStorage(videoBlob)}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? `Uploading: ${uploadProgress}%` : 'Upload Recording'}
          </button>
        )}
      </div>

      {videoBlob && !recording && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Preview:</h3>
          <video
            controls
            src={URL.createObjectURL(videoBlob)}
            className="w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default WebcamRecorder;