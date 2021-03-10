import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';
import { useMessage } from '../hooks/message.hook';

export const Header = () => {
  const history = useHistory();
  const message = useMessage();

  const { state, setState, isAdmin } = useContext(AuthContext);
  const [dropdownState, setDropdownState] = useState(false);
  const [sideNavState, setSideNavState] = useState(false);
  const [navbarDropdownState, setNavbarDropdownState] = useState(false);

  const dropdown = (e) => {
    e.preventDefault();
    setDropdownState((v) => !v);
  };
  const navbarDropdown = (e) => {
    e.preventDefault();
    setNavbarDropdownState((v) => !v);
  };

  const navClickHandler = (e) => {
    if (e.target.classList.value === 'side-nav') {
      return false;
    } else {
      setSideNavState((v) => !v);
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
              <a
                href="#"
                className="sidenav-trigger"
                onClick={(e) => {
                  e.preventDefault();
                  setSideNavState((v) => !v);
                }}
              >
                <i className="material-icons">menu</i>
              </a>
              <ul className="right">
                <li>
                  <NavLink to="/" className="waves-effect waves-light">
                    Главная
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-list" className="waves-effect waves-light">
                    Мои заявки
                  </NavLink>
                </li>
                {isAdmin ? (
                  <li
                    className={
                      navbarDropdownState
                        ? 'navbar-dropdown navbar-dropdown-active'
                        : 'navbar-dropdown'
                    }
                    onClick={
                      navbarDropdownState ? () => setNavbarDropdownState((v) => !v) : null
                    }
                  >
                    <a
                      className="navbar-dropdown__toggler"
                      href="#"
                      onClick={(e) => navbarDropdown(e)}
                    >
                      Управление заявками
                    </a>

                    <ul className="navbar-dropdown__content">
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
      <div
        className={sideNavState ? 'sidebar sidebar-active' : 'sidebar'}
        onClick={(e) => navClickHandler(e)}
      >
        <ul className="side-nav">
          <li className="side-nav-item">
            <NavLink to="/" className="nav-link" exact>
              {' '}
              Главная{' '}
            </NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink to="/my-list" className="nav-link">
              {' '}
              Мои заявки{' '}
            </NavLink>
          </li>
          {isAdmin ? (
            <li className="side-nav-item">
              <a
                className="dropdown__toggler nav-link"
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  dropdown(e);
                }}
              >
                Управление заявками{' '}
                <i
                  className="material-icons right"
                  style={
                    dropdownState
                      ? { transform: 'rotate(180deg)' }
                      : { transform: 'rotate(0)' }
                  }
                >
                  arrow_drop_down
                </i>{' '}
              </a>

              <ul
                className={
                  dropdownState
                    ? 'dropdown__content  dropdown-active'
                    : 'dropdown__content'
                }
              >
                <li className="dropdown-item">
                  <NavLink to="/create" className="indigo-text nav-link">
                    Добавить
                  </NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink to="/all" className="indigo-text nav-link">
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
              className="nav-link"
            >
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
