import React from 'react';

const JamCard = ({ track }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">{track.title}</h2>
      <p className="text-lg text-gray-600 mt-1">{track.genre}</p>
      <p className="text-lg text-gray-600 mt-1">{track.key}</p>
      <p className="text-lg text-gray-600 mt-1">{track.bpm}</p>
      <div className="flex align-middle justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Preview
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          Join
        </button>
      </div>
    </div>
  );
};

export default JamCard;
