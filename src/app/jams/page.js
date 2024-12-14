import { getJams } from '@/utils/firebase/queries';
import JamCard from './JamCard';

export default async function Tracks() {


  const myJams = await getJams()

  console.log('🚀 ~ file: page.js:9 ~ Tracks ~ myJams:', myJams);



  const jams = [
    {
      title: 'Jam 1',
      genre: 'Techno',
      key: '9A',
      bpm: 128,
    },
    {
      title: 'Jam 2',
      genre: 'House',
      key: '10A',
      bpm: 120,
    },
    {
      title: 'Jam 3',
      genre: 'Techno',
      key: '5B',
      bpm: 128,
    },
  ];

  return (
    <>
      <h1>Jams</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jams.map((track, index) => (
          <JamCard key={index} track={track} />
        ))}
      </div>
    </>
  );
}
