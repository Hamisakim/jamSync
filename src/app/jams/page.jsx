import { getJams } from '@/utils/firebase/queries';
import JamCard from './JamCard';

export default async function Tracks() {
  const myJams = await getJams();

  return (
    <>
      <h1>Jams</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myJams.map((jam, index) => (
          <JamCard key={index} jam={jam} />
        ))}
      </div>
    </>
  );
}
