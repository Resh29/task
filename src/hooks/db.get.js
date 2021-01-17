import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { useMessage } from './message.hook';

export const useFetchData = (path) => {
  const db = firebase.database();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const message = useMessage();

  useEffect(() => {
    async function get() {
      try {
        const data = (await db.ref(`${path}`).once('value')).val();

        if (data) {
          const res = Object.keys(data).map((key) => ({
            ...data[key],
            taskNumber: key,
          }));

          setData(res);
        } else {
          message('При загрузке данных');
        }
      } catch (error) {
        message();
        throw error;
      } finally {
        setLoading(false);
      }
    }
    get();
  }, [db, path]);
  return [data, loading, message];
};
