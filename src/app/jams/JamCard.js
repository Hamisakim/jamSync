import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { getVideosByJamId } from '@/utils/firebase/queries';

const JamCard = ({ jam }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [rating, setRating] = useState(jam.starRating || 5); // Use the starRating from the database, fallback to 5 if not available
  const videoRef = useRef(null); // Reference for the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to track if video is playing

  // Fetch the video URL using jam.id when the component mounts
  useEffect(() => {
    const fetchVideoUrl = async () => {
      if (jam?.id) {
        try {
          const url = await getVideosByJamId(jam.id); // Assuming this returns the video URL
          setVideoUrl(url);
        } catch (error) {
          console.error('Error fetching video URL:', error);
        }
      }
    };
    fetchVideoUrl();
  }, [jam?.id]);

  // Handle Preview/Stop Button Click
  const handlePreviewStop = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true); // Set isPlaying to true when the video starts
      } else {
        videoRef.current.pause();
        setIsPlaying(false); // Set isPlaying to false when the video pauses
      }
    }
  };

  return (
    <div>
      {/* Video Player */}
      <div className="aspect-w-16 aspect-h-9 mb-4">
        {videoUrl ? (
          <video
            ref={videoRef}
            controls
            src={videoUrl}
            className="w-full h-full rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-gray-500">Loading video...</p>
        )}
      </div>
      <h2 className="text-xl font-bold">Title: {jam?.title}</h2>

      <p className="text-lg text-gray-600 mt-1">Genre: {jam.genre}</p>
      <p className="text-lg text-gray-600 mt-1">Key: {jam.key}</p>
      <p className="text-lg text-gray-600 mt-1">BPM: {jam.bpm}</p>

      {/* Rating and Voting Section */}
      <div className="flex items-center justify-between pt-2 pb-4">
        {/* Star Rating */}
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < rating ? 'yellow' : 'gray'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
              onClick={() => setRating(index + 1)} // Optional: allow user to click and update the rating
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12 4.5l1.42 4.38h4.63L14.8 11.5l1.42 4.38-3.6-2.63-3.6 2.63L10.2 11.5 7.92 8.88h4.63L12 4.5z"
              />
            </svg>
          ))}
        </div>
        {/* Upvote/Downvote Buttons */}
        <div className="flex space-x-2 items-center">
          <button
            className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            // Add upvote functionality here later
          >
            👍
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            // Add downvote functionality here later
          >
            👎
          </button>
        </div>
      </div>

      <div className="flex align-middle justify-center">
        <button
          onClick={handlePreviewStop}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? 'Stop' : 'Preview'}
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          <Link href={`/jams/${jam.id}`}>Collaborate</Link>
        </button>
      </div>
    </div>
  );
};

export default JamCard;
