import firebase from 'firebase/app';
import { useMessage } from './message.hook';
import { useFetchData } from './db.get';

export const useUpdateData = () => {
  const [getData] = useFetchData();
  const message = useMessage();
  const db = firebase.database();

  async function update(path, data, location) {
    try {
      await db
        .ref(path)
        .set(data)
        .catch((e) => console.error(e));
      getData(location);
    } catch (error) {
      message(error.message);
    }
  }
  return update;
};
