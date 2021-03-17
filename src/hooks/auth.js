import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { useMessage } from './message.hook';

export const useAuth = () => {
  const message = useMessage();
  const history = useHistory();
  return async (userData) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((res) => res.user)
      .catch((error) => {
        message(error.code);
      });
    history.push('/');
  };
};

export const useRegister = () => {
  const message = useMessage();
  const history = useHistory();
  return async (userData) => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then((res) => res.user)
        .catch((error) => {
          message(error.code);
        });

      if (result.uid) {
        await firebase
          .database()
          .ref(`/users/${result.uid}`)
          .set({
            uid: result.uid,
            isAdmin: false,
            name: userData.name,
            lastName: userData.lastName,
            phone: userData.phone,
            email: userData.email,
          })
          .then(history.push('/'));
      }
    } catch (error) {
      message(error.code);
    }
  };
};
