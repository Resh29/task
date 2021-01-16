import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase/app';
import { Loader } from '../components/Loader';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const { state, setState, isAdmin } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const message = useMessage();
  useEffect(() => {
    if (state) {
      setLoading(true);
      history.push('/');
    } else {
      setLoading(false);
    }
  }, [state, history]);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (userData) => {
    if (userData.uid) {
      history.push('/');
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => res.user)
        .catch((error) => {
          message(error.code);
        });
      history.push('/');
    }
  };
  const register = async () => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => res.user)
        .catch((error) => {
          message(error.code);
        });

      await firebase
        .database()
        .ref(`/users/${result.uid}`)
        .set({ uid: result.uid, isAdmin: false });
      login(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="col s12 m4 offset-m4 z-depth-4"
            style={{
              marginTop: '4rem',
              borderRadius: '8px',
              padding: '.6rem 1.4rem',
            }}
          >
            <h4 className="flow-text grey-text">Sign in, or register</h4>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  autoComplete="on"
                  name="password"
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div
                className="form-footer row"
                style={{ justifyContent: 'space-evenly', display: 'flex' }}
              >
                <div>
                  <input
                    type="submit"
                    className="btn "
                    value="login"
                    onClick={login}
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    className="btn blue"
                    value="register"
                    onClick={register}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
