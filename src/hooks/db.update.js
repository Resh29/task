import firebase from 'firebase/app';

export const useSetData = () => {
  const db = firebase.database();

  async function set(path, data) {
    await db
      .ref(path)
      .set(data)
      .catch((e) => console.error(e));
  }
  return set;
};
