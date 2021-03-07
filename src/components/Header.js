import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';
import { useMessage } from '../hooks/message.hook';

export const Header = () => {
  const history = useHistory();
  const message = useMessage();
  const sidenav = useRef(null);
  const { state, setState, isAdmin } = useContext(AuthContext);
  const [dropdownState, setDropdownState] = useState(false);
  const [sideNavState, setSideNavState] = useState(true);
  useEffect(() => {
    if (window.M) {
      // const elems = document.querySelectorAll('.sidenav');
      // const instances = window.M.Sidenav.init(elems);
      // const dropdown = document.querySelectorAll('.dropdown-trigger');
      // window.M.Dropdown.init(dropdown);
    }
  });

  const dropdown = (e) => {
    e.preventDefault();
    setDropdownState((v) => !v);
  };

  const navClickHandler = (e) => {
    console.log(e.target.classList[0]);
    switch (e.target.classList[0]) {
      case 'sidebar':
        setSideNavState((v) => !v);
        break;
    }
  };

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
        <div className="nav-wrapper">
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
      <div className={sideNavState ? 'sidebar sidebar-active' : 'sidebar'} onClick={(e) => navClickHandler(e)}>
        <ul className="side-nav">
          <li className="side-nav-item">
            <NavLink to="/"> Главная </NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink to="/my_list"> Мои заявки </NavLink>
          </li>
          {isAdmin ? (
            <li className="side-nav-item">
              <a className="dropdown__toggler" href="#" onClick={(e) => dropdown(e)}>
                Управление заявками{' '}
                <i
                  className="material-icons right"
                  style={dropdownState ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0)' }}
                >
                  arrow_drop_down
                </i>{' '}
              </a>

              <ul className={dropdownState ? 'dropdown__content  dropdown-active' : 'dropdown__content'}>
                <li className="dropdown-item">
                  <NavLink to="/create" className="indigo-text">
                    Добавить
                  </NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink to="/all" className="indigo-text">
                    Все заявки
                  </NavLink>
                </li>
              </ul>
            </li>
          ) : null}
          <li className="side-nav-item">
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
    </div>
  );
};
