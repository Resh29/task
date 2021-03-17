import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { Loader } from '../components/Loader';
import { useMessage } from '../hooks/message.hook';

import { useAuth } from '../hooks/auth';

export const AuthPage = () => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(null);

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

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toRegistration = (e) => {
    e.preventDefault();
    history.push('/registration');
  };
  return (
    <>
      {' '}
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
            <h4 className="flow-text grey-text">Войдите или зарегистрируйтесь</h4>
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
                  minLength="6"
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
                  minLength="6"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className=" col s12">
                <div className="col">
                  <input
                    type="submit"
                    className="btn"
                    value="Войти"
                    onClick={() => login(user)}
                  />
                </div>
                <div className="col" style={{ float: 'right' }}>
                  <a
                    href="#"
                    onClick={(e) => {
                      toRegistration(e);
                    }}
                  >
                    {' '}
                    Зарегистрироваться{' '}
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
