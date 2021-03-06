import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { Loader } from '../components/Loader';
import { useMessage } from '../hooks/message.hook';
import { RegisterModal } from '../components/RegisterModal';

import { useAuth } from '../hooks/auth';

export const AuthPage = () => {
  const { state, setState, isAdmin } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const message = useMessage();
  const login = useAuth();

  const form = useRef(null);
  useEffect(() => {
    if (state) {
      setLoading(true);
      history.push('/');
    } else {
      setLoading(false);
    }
  }, [state]);

  useEffect(() => {
    return setUser(null);
  }, [modal]);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    if (user.email && user.password) {
      setModal((value) => !value);
    } else {
      message('empty-fields');
    }
  };
  const closeModal = () => {
    setModal((v) => !v);

    form.current.reset();
    console.log(user);
  };
  return (
    <>
      {' '}
      {modal ? <RegisterModal initialInfo={{ user, closeModal }} /> : null}
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <form
            ref={form}
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
              <div className="form-footer row" style={{ justifyContent: 'space-evenly', display: 'flex' }}>
                <div>
                  <input type="submit" className="btn " value="login" onClick={() => login(user)} />
                </div>
                <div>
                  <input type="submit" className="btn blue" value="register" onClick={openModal} />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
