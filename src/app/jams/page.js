'use client'; // Make this a client component

import { useState, useEffect } from 'react';
import { getJams, createJam } from '@/utils/firebase/queries';
import JamCard from './JamCard';
import NewJamCard from './NewJamCard';
import Image from 'next/image';

export default function Tracks() {
  const [myJams, setMyJams] = useState([]); // Track state for Jams

  // Fetch Jams when the component mounts
  useEffect(() => {
    const fetchJams = async () => {
      const jams = await getJams();
      setMyJams(jams);
    };
    fetchJams();
  }, []);

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
      <div className="bg-[#F1F5F7] min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between p-4">
            <div className="flex-shrink-0">
              <Image
                src="/images/JamSync2.png" // Path to the logo in the public folder
                alt="JamSync Logo"
                width={150} // Adjust the width as per your needs
                height={50} // Adjust the height as per your needs
              />
            </div>
            <h1 className="text-4xl font-bold text-center mb-6 font-poppins">
              JamSync
            </h1>
            <p>Login</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myJams.map((jam, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <JamCard jam={jam} />
              </div>
            ))}

            {/* Render New Jam Card */}
            <div className="border border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
              <NewJamCard onCreate={handleCreateJam} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// import { getJams, createJam } from '@/utils/firebase/queries';
// import JamCard from './JamCard';
// import NewJamCard from './NewJamCard'; // Import the new component

// export default async function Tracks() {
//   const myJams = await getJams();

//   // Function to handle creating a new Jam
//   const handleCreateJam = async (newJamData) => {
//     try {
//       const newJam = await createJam(newJamData);
//       setMyJams((prevJams) => [...prevJams, newJam]); // Add the new Jam to the list
//     } catch (error) {
//       console.error('Error creating Jam:', error);
//     }
//   };

//   return (
//     <>
//       <h1>Jams test</h1>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {myJams.map((jam, index) => (
//           <JamCard key={index} jam={jam} />
//         ))}
//         {/* Render New Jam Card */}
//         <NewJamCard onCreate={handleCreateJam} />
//       </div>
//     </>
//   );
// }
