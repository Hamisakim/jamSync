'use client';
import { useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/firebase/firebaseConfig';


import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const WebcamRecorder = () => {
  const videoRef = useRef(null); // Ref to display the video on the page
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null); // The video blob (file) after recording

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    startVideo();

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
    setRecording(true);
    chunksRef.current = []; // Clear any previous chunks

    const mediaRecorder = new MediaRecorder(videoRef.current.srcObject);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
      setVideoBlob(videoBlob);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const uploadVideoToStorage = async (videoBlob) => {
    // Create a reference to Firebase Storage (change 'videos' to the desired folder)
    const storageRef = ref(storage, `videos/${Date.now()}.webm`);

    // Upload the Blob to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, videoBlob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ${progress}% done');
      },
      (error) => {
        console.error('Error uploading video:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File uploaded successfully! Video URL:', downloadURL);
      }
    );
  };

  return (
    <div className="w-full border border-red-50">
      <video ref={videoRef} autoPlay muted></video>

      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {videoBlob && (
        <div>
          <button onClick={() => uploadVideoToStorage(videoBlob)}>
            Upload Video
          </button>
          <video
            className="w-60"
            controls
            src={URL.createObjectURL(videoBlob)}
            style={{ marginTop: '10px', width: '100%' }}
          ></video>
        </div>
      )}
    </div>
  );
};

export default WebcamRecorder;
