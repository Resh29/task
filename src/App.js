import './App.css';
import React, { useContext, useState, useEffect } from 'react';
import 'materialize-css';
import { Header } from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import firebase from 'firebase';
import { Loader } from './components/Loader';
import { AuthPage } from './pages/AuthPage';

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
      } else {
        firebase.auth().signOut();
      }
    });
  }, []);

  const routes = useRoutes();

  return (
    <div className="App" style={{ height: '100vh' }}>
      <Router>
        <Header />
        {authState ? (
          <div className="main container">{routes}</div>
        ) : (
          <AuthPage />
        )}
      </Router>
    </div>
  );
}

export default App;
