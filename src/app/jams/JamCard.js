import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getVideosByJamId } from '@/utils/firebase/queries';

const JamCard = ({ jam }) => {
  const videoId = 'n2_IflHo-B0';
  const [videoUrl, setVideoUrl] = useState(null);

  console.log('INSIDE OF JAM', jam.id);

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

  getVideosByJamId(jam.id);

  const [rating, setRating] = useState(5);

  const youtubeThumbnailUrl = `https://img.youtube.com/vi/4WqAe7e_H5o/maxresdefault.jpg`;

  return (
    <div>
      {/* Add YouTube Thumbnail */}
      {/* Video Player */}
      <div className="aspect-w-16 aspect-h-9 mb-4">
        {videoUrl ? (
          <video controls src={videoUrl} className="w-full h-full rounded-lg">
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

      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            onClick={() => setRating(index + 1)}
            xmlns="http://www.w3.org/2000/svg"
            fill={index < rating ? 'yellow' : 'gray'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.5l1.42 4.38h4.63L14.8 11.5l1.42 4.38-3.6-2.63-3.6 2.63L10.2 11.5 7.92 8.88h4.63L12 4.5z"
            />
          </svg>
        ))}
      </div>
      <div className="flex align-middle justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Preview
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          <Link href={`/jams/${jam.id}`}>Collaborate</Link>
        </button>
      </div>
    </div>
  );
};

export default JamCard;
