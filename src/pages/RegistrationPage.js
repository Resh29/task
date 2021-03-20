import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Loader } from '../components/Loader';

import { useRegister } from '../hooks/auth';
import { useMessage } from '../hooks/message.hook';

export const RegistrationPage = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const message = useMessage();
  const history = useHistory();
  const registration = useRegister();

  const [userInfo, setUserInfo] = useState({});

  const changeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      registration(userInfo);
      form.current.reset();
    } catch (error) {
      message(error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="registration">
          <div className="row">
            <form
              onSubmit={submitHandler}
              className="registration-form col s12 m4 offset-m4 z-depth-4"
              style={{
                marginTop: '4rem',
                borderRadius: '8px',
                padding: '.6rem 1.4rem',
              }}
            >
              <h4 className="flow-text"> Форма регистрации: </h4>
              <div className="input-field col s12">
                <input
                  id="first_name"
                  type="text"
                  name="name"
                  className="validate"
                  onChange={changeHandler}
                  required
                />
                <label htmlFor="first_name">Имя</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="validate"
                  onChange={changeHandler}
                  required
                />
                <label htmlFor="lastName">Фамилия</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                  onChange={changeHandler}
                  required
                />
                <label htmlFor="email">Электронная почта</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="phone"
                  type="number"
                  name="phone"
                  className="validate"
                  onChange={changeHandler}
                  maxLength="13"
                  required
                />
                <label htmlFor="phone">Телефон</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="password"
                  type="text"
                  name="password"
                  className="validate"
                  onChange={changeHandler}
                  maxLength="16"
                  minLength="6"
                  required
                />
                <label htmlFor="password">Пароль</label>
              </div>

              <div className="input-field col s6">
                <input type="submit" className="btn" value="Зарегистрироваться" />
              </div>
              <div className="input-field col s6" style={{ textAlign: 'right' }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  Назад
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
