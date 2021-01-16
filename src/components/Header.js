import React, { useContext, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';
import { useMessage } from '../hooks/message.hook';

export const Header = () => {
  const history = useHistory();
  const message = useMessage();
  useEffect(() => {
    if (window.M) {
      const elems = document.querySelectorAll('.sidenav');

      const instances = window.M.Sidenav.init(elems);
    }
  });

  const sidenav = useRef(null);

  const { state, setState } = useContext(AuthContext);

  const logout = () => {
    // localStorage.removeItem('currentUser');
    setState(null);
    history.push('/auth');
    firebase
      .auth()
      .signOut()
      .then(() => {
        message('logout/message');
      });
  };
  return (
    <div>
      <nav className="navbar indigo darken-4">
        <div className="nav-wrapper ">
          <a href="#!" className="brand-logo">
            Navbar
          </a>

          {state ? (
            <>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right ">
                <li>
                  <NavLink to="/"> Home </NavLink>
                </li>
                <li>
                  <NavLink to="/my_list"> My tasks list </NavLink>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo" ref={sidenav}>
        <li>
          <NavLink to="/"> Home </NavLink>
        </li>
        <li>
          <NavLink to="/my_list"> My tasks list </NavLink>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            {' '}
            Logout{' '}
          </a>
        </li>
      </ul>
    </div>
  );
};
