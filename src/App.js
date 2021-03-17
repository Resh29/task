import React, { useContext, useState, useEffect } from 'react';
import 'materialize-css';
import { Header } from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes, useRegisterRoute } from './routes';
import { AuthContext } from './context/AuthContext';
import firebase from 'firebase';
import { Loader } from './components/Loader';

firebase.initializeApp({
  apiKey: 'AIzaSyC44FQactkSJvBs7Z7mKwyxuCOGECeFiJ0',
  authDomain: 'task-management-df022.firebaseapp.com',
  projectId: 'task-management-df022',
  storageBucket: 'task-management-df022.appspot.com',
  messagingSenderId: '1054249889246',
  appId: '1:1054249889246:web:34f12a999dc7af64f9814f',
});

const db = firebase.database();

function App() {
  const { state, setState, isAdmin, setIsAdmin } = useContext(AuthContext);
  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      async function getUserInfo(uid) {
        const result = (await db.ref(`users/${uid}`).once('value')).val();
        setIsAdmin(result.isAdmin);
      }
      if (user) {
        setAuthState(!authState);
        setState(user);
        getUserInfo(user.uid);
        setLoading(false);
      } else {
        firebase.auth().signOut();
        setLoading(false);
      }
    });
  }, []);

  const routes = useRoutes();
  const register = useRegisterRoute();

  return (
    <div className="App">
      <Router>
        <Header />
        {loading ? (
          <Loader props={{ color: 'spinner-green-only', size: 'big' }} />
        ) : authState ? (
          <div className="main container">{routes}</div>
        ) : (
          <div className="main container">{register}</div>
        )}
      </Router>
    </div>
  );
}

export default App;
