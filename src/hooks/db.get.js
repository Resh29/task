import { useContext, useState } from 'react';
import firebase from 'firebase/app';
import { useMessage } from './message.hook';
import { DataContext } from '../context/DataContext';

export const useFetchData = () => {
  const db = firebase.database();

  const [loading, setLoading] = useState(true);
  const [setState, contextData] = useContext(DataContext);

  const message = useMessage();

  async function get(path, date) {
    const now = date || new Date(Date.now()).toLocaleDateString();
    try {
      let data = {};
      if (date === 'all') {
        data = (await db.ref(`${path}`).once('value')).val();
      } else {
        data = (
          await db.ref(`${path}`).orderByChild('date').equalTo(now).once('value')
        ).val();
      }

      if (data) {
        const res = Object.keys(data).map((key) => ({
          ...data[key],
          taskNumber: key,
        }));
        const keys = [...new Set([...res].map((el) => el.status))];
        const filteredData = [];
        keys.forEach((item) =>
          filteredData.push([...res.filter((el) => el.status === item)])
        );
        setState(filteredData.reverse());
      } else {
        message('no-data');
        setState([]);
      }
    } catch (error) {
      message();
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return [get, loading];
};
