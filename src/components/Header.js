import React, { useContext, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';
import { useMessage } from '../hooks/message.hook';

export const Header = () => {
  const history = useHistory();
  const message = useMessage();
  const sidenav = useRef(null);
  const { state, setState, isAdmin } = useContext(AuthContext);
  useEffect(() => {
    if (window.M) {
      const elems = document.querySelectorAll('.sidenav');

      const instances = window.M.Sidenav.init(elems);

      const dropdown = document.querySelectorAll('.dropdown-trigger');
      window.M.Dropdown.init(dropdown);
    }
  });

  const logout = () => {
    setState(null);
    history.push('/auth');
    firebase
      .auth()
      .signOut()
      .then(() => {
        message('logout/message');
      });
    localStorage.removeItem('task-user-refresh-token');
  };
  return (
    <div>
      <nav className="navbar indigo darken-4">
        <div className="nav-wrapper ">
          {state ? (
            <>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right">
                <li>
                  <NavLink to="/" className="waves-effect waves-light">
                    Главная
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my_list" className="waves-effect waves-light">
                    Мои заявки
                  </NavLink>
                </li>
                {isAdmin ? (
                  <li>
                    <a className="dropdown-trigger  " href="#" data-target="dropdown1">
                      Управление заявками
                    </a>

                    <ul id="dropdown1" className="dropdown-content">
                      <li>
                        <NavLink to="/create" className="indigo-text">
                          Добавить
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/all" className="indigo-text">
                          Все заявки
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                ) : null}

                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                  >
                    Выйти
                  </a>
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo" ref={sidenav}>
        <li>
          <NavLink to="/"> Главная </NavLink>
        </li>
        <li>
          <NavLink to="/my_list"> Мои заявки </NavLink>
        </li>
        {isAdmin ? (
          <li>
            <a className="dropdown-trigger  " href="#" data-target="dropdown2">
              Управление заявками
            </a>

            <ul id="dropdown2" className="dropdown-content">
              <li>
                <NavLink to="/create" className="indigo-text">
                  Добавить
                </NavLink>
              </li>
              <li>
                <NavLink to="/all" className="indigo-text">
                  Все заявки
                </NavLink>
              </li>
            </ul>
          </li>
        ) : null}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Выйти
          </a>
        </li>
      </ul>
    </div>
  );
};
