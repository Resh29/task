import firebase from 'firebase';
import { useMessage } from './message.hook';
import { useState } from 'react';

export const useGetSingleTask = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const message = useMessage();
  const db = firebase.database();
  async function getData(path) {
    if (path) {
      try {
        const res = (
          await db
            .ref(path)
            .once('value')
            .catch((error) => message(error.message))
        ).val();
        setData(res);
      } catch (error) {
        message(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      return null;
    }
  }

  return [getData, data, loading];
};
