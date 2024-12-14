import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, storage } from './firebaseConfig';
import { listAll, ref, getDownloadURL } from 'firebase/storage';

export const getJams = async () => {
  try {
    const jamsCol = collection(db, 'jams');

    const snapshot = await getDocs(jamsCol);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getTrack = async () => {
  const trackCol = collection(db, 'tracks');
  const snapshot = await getDocs(trackCol);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getTracksByJamId = async (jamId) => {
  try {
    // Create a reference to the tracks collection
    const tracksRef = collection(db, 'tracks');

    // Create a query against the collection
    const q = query(tracksRef, where('jamId', '==', 'jams/' + jamId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Convert the query snapshot to an array of track objects
    const tracks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return tracks;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};

export const getVideos = async () => {
  const videosRef = ref(storage, 'P7UQNtxTapthYrT5yOhc/');
  const res = await listAll(videosRef);
  const urls = [];
  for (const item of res.items) {
    const url = await getDownloadURL(item);

    console.log('🚀 ~ file: queries.js:60 ~ getVideos ~ url:', url);

    urls.push(url);
  }
  return urls;
};

export const getVideosByJamId = async (jamId) => {
  const videosRef = ref(storage, jamId + '/');
  const res = await listAll(videosRef);
  const urls = [];
  for (const item of res.items) {
    const url = await getDownloadURL(item);
    urls.push(url);
  }
  return urls;
};
