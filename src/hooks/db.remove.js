import firebase from 'firebase/app';
import { useMessage } from './message.hook';

export const useRemoveData = () => {
  const message = useMessage();
  const db = firebase.database();
  async function remove(path) {
    try {
      await db.ref(path).remove();
    } catch (error) {
      message(error.message);
    }
  }
  return remove;
};
