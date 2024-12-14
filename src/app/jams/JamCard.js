import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const JamCard = ({ jam }) => {
  const videoId = 'n2_IflHo-B0';

  const youtubeThumbnailUrl = `https://img.youtube.com/vi/4WqAe7e_H5o/maxresdefault.jpg`;
  // 'https://www.youtube.com/watch?v=n2_IflHo-B0';

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
      <h2 className="text-xl font-bold">{jam?.title}</h2>

      <p className="text-lg text-gray-600 mt-1">{jam.genre}</p>
      <p className="text-lg text-gray-600 mt-1">{jam.key}</p>
      <p className="text-lg text-gray-600 mt-1">{jam.bpm}</p>

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
