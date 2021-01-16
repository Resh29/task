import firebase from 'firebase/app';

export const useSetData = (path, data) => {
  const db = firebase.database();

  async function set() {
    await db
      .ref(path)
      .set(data)
      .catch((e) => console.error(e));
  }
  set();
};
