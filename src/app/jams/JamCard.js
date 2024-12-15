import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const JamCard = ({ jam }) => {
  const videoId = 'n2_IflHo-B0';

  const [rating, setRating] = useState(5);

  const youtubeThumbnailUrl = `https://img.youtube.com/vi/4WqAe7e_H5o/maxresdefault.jpg`;

  return (
    <div>
      {/* Add YouTube Thumbnail */}
      <div className="mt-4 mb-4">
        <img
          src={youtubeThumbnailUrl}
          width={'50'}
          height={'20'}
          alt={`${jam?.title} thumbnail`}
          className="w-full h-auto rounded-lg"
        />
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
