import React, { useState, useEffect, useRef } from 'react';
import { useRegister } from '../hooks/auth';

export const RegisterModal = ({ initialInfo }) => {
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const form = useRef(null);
  const register = useRegister();

  useEffect(() => {
    setUser(initialInfo.user);
    console.log(initialInfo);
    return () => {
      setUser({});
    };
  }, []);

  const changeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    const userData = {
      user,
      userInfo,
    };
    register(userData);
    form.current.reset();
    initialInfo.closeModal();
  };

  return (
    <div className="_modal">
      <div className="_modal__content">
        <div className="_modal__body">
          <h5 className="text-flow"> Заполните форму </h5>
          <form className="_modal__register-form" ref={form}>
            <div className="row">
              <div className="input-field col s12">
                <input id="name" type="text" name="name" className="validate" onChange={changeHandler} />

                <label htmlFor="name">Имя</label>
              </div>
              <div className="input-field col s12">
                <input id="last-name" type="text" name="lastName" className="validate" onChange={changeHandler} />

                <label htmlFor="last-name">Фамилия</label>
              </div>
              <div className="input-field col s12">
                <input id="phone" type="text" name="phone" className="validate" onChange={changeHandler} />

                <label htmlFor="phone">Телефон</label>
              </div>
            </div>
            <blockquote>
              {' '}
              Ваш логин: <span className="blue-text">{userInfo.email} </span>{' '}
            </blockquote>
          </form>
        </div>
        <div className="_modal__footer">
          <button
            className="btn red lightrn-2"
            onClick={() => {
              initialInfo.closeModal();
            }}
          >
            {' '}
            Назад <i className=" material-icons left"> arrow_back </i>{' '}
          </button>
          <button
            className="btn blue"
            onClick={() => {
              submitHandler();
            }}
          >
            {' '}
            Продолжить
            <i className=" material-icons right"> send </i>{' '}
          </button>
        </div>
      </div>
    </div>
  );
};
