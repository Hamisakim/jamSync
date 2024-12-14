import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';


export const getJams = async () => {
  try {
    const jamsCol = collection(db, 'jams');


    const snapshot = await getDocs(jamsCol);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};