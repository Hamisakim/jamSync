'use client'; // Make this a client component

import { useState, useEffect } from 'react';
import { getJams, createJam } from '@/utils/firebase/queries';
import JamCard from './JamCard';
import NewJamCard from './NewJamCard';

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
      <h1>Jams</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myJams.map((jam, index) => (
          <JamCard key={index} jam={jam} />
        ))}

        {/* Render New Jam Card */}
        <NewJamCard onCreate={handleCreateJam} />
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
