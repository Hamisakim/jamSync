'use client'; // Make this a client component

import { useState, useEffect } from 'react';
import { getJams, createJam } from '@/utils/firebase/queries';
import JamCard from './JamCard';
import NewJamCard from './NewJamCard';
import Image from 'next/image';

export default function Tracks() {
  const [myJams, setMyJams] = useState([]); // Track state for Jams

  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Jams when the component mounts
  useEffect(() => {
    const fetchJams = async () => {
      const jams = await getJams();
      console.log('Fetched Jams:', jams); // Check structure
      setMyJams(jams);
    };
    fetchJams();
  }, []);

  // Filter Jam based on search query
  const filteredJams = myJams.filter(
    (jam) =>
      (jam?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (jam?.key || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (jam?.bpm || '').toString().includes(searchQuery) ||
      (jam?.genre || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Client-side handler for creating a new Jam
  const handleCreateJam = async (newJamData) => {
    try {
      const newJam = await createJam(newJamData); // Call server-side function
      setMyJams((prev) => [...prev, newJam]); // Update local state with the new Jam
    } catch (error) {
      console.error('Error creating new Jam:', error);
    }
  };

  return (
    <>
      <div className="relative bg-[#191825] min-h-screen">
        {/* Hero Image Section */}
        <div
          className="relative w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://www.checkatrade.com/blog/wp-content/uploads/2020/10/Recording-studio-cost-to-build.jpg)',
          }}
        >
          {/* Logo */}
          <div className="absolute top-0 left-0 p-4 z-10">
            <Image
              src="/images/JamSync3.png" // Path to the logo in the public folder
              alt="JamSync Logo"
              width={150} // Adjust the width as per your needs
              height={50} // Adjust the height as per your needs
            />
          </div>

          {/* JamSync Title */}
          {/* <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-center text-white z-10">
            JamSync
          </h1> */}

          {/* Login Text */}
          <div className="absolute top-20 right-10 z-10 flex space-x-4">
            <p className="text-white font-semibold text-lg">Login</p>
            <p className="text-white font-semibold text-lg">Sign up</p>
          </div>

          {/* Overlay for text visibility */}
          <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

          {/* Collaborative Section */}
          <div className="relative bg-cover bg-center h-[500px]">
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center text-white">
              <h1 className="text-5xl font-bold">
                Collaborate & Create with JamSync
              </h1>
              <p className="mt-4 text-xl">
                Your platform for music collaboration, jamming, and creativity.
              </p>
              <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* ////////////search///////// */}
        <div className="my-4 px-6">
          <input
            type="text"
            placeholder="Search by title, genre, key, or bpm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        {/*///////// search ///////////*/}

        <div className="px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJams.map((jam, index) => (
              <div
                key={index}
                className="bg-[#E4E7EB] border border-gray-200 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl p-6"
              >
                <JamCard jam={jam} />
              </div>
            ))}

            {/* Render New Jam Card */}
            <div className="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center hover:bg-gray-200 transition-colors duration-300">
              <NewJamCard onCreate={handleCreateJam} />
            </div>
          </div>
        </div>
        <footer className="bg-gray-800 text-white py-4">
          <div className="text-center">
            <p>&copy; 2024 JamSync. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
