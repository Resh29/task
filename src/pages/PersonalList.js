import React, { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

import firebase from 'firebase/app';
import { TasksList } from '../components/TasksList';
import { useFetchData } from '../hooks/db.get';
import { Loader } from '../components/Loader';

export const PersonalList = () => {
  const tabs = useRef(null);
  const { state, changeToken } = useContext(AuthContext);
  const [data, loading] = useFetchData(`users/${state.uid}/tasks`);

  useEffect(() => {
    if (window.M) {
      const instance = window.M.Tabs.init(tabs.current);
    }
  });

  return (
    <div className="row">
      <h1>Мои заявочки...</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ul className="tabs" ref={tabs}>
            <li className="tab col s3">
              <a href="#progress" className="indigo-text">
                В работе
              </a>
            </li>
            <li className="tab col s3">
              <a href="#done" className="indigo-text">
                {' '}
                Выполнено{' '}
              </a>
            </li>
          </ul>

          {data.length ? (
            <>
              <div id="progress">
                <TasksList
                  props={{
                    class: 'white black-text',
                    header: 'Some tasks',
                    tasks: data,
                  }}
                />
              </div>
              <div id="done">
                <p>Nothing to do there</p>
              </div>
            </>
          ) : (
            <p> Здесь пока ничего нет... </p>
          )}
        </>
      )}
    </div>
  );
};
