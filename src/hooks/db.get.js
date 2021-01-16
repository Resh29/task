import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export const useFetchData = (path) => {
  const db = firebase.database();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function get() {
      try {
        const data = (await db.ref(`${path}`).once('value')).val();
        console.log(data);

        const res = Object.keys(data).map((key) => ({ ...data[key] }));
        setData(res);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
    get();
  }, [db, path]);
  return [data, loading];
};
