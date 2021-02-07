import React, { useContext, useRef, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

import { TasksList } from '../components/TasksList';
import { useFetchData } from '../hooks/db.get';
import { Loader } from '../components/Loader';
import { ListFilter } from '../components/ListFilter';
import { DataContext } from '../context/DataContext';

export const PersonalList = () => {
  const tabs = useRef(null);
  const { state, changeToken } = useContext(AuthContext);
  const [setState, stateData] = useContext(DataContext);
  const [getData, loading] = useFetchData();

  useEffect(() => {
    getData(`/users/${state.uid}/tasks`);
  }, []);

  function dataFilter(value) {
    getData(`/users/${state.uid}/tasks`, value);
  }

  return (
    <>
      <p> Урурур </p>
      <hr />
      <ListFilter submitAction={dataFilter} />
      <div className="row">
        <h3>Мои заявочки...</h3>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ul className="tabs" ref={tabs}>
              {stateData.length
                ? stateData.map((item) => {
                    return (
                      <li className="tab col s3 m6" key={item[0].taskId}>
                        <a href={'#' + item[0].status} className="indigo-text">
                          {item[0].status}
                        </a>
                      </li>
                    );
                  })
                : null}
            </ul>
            {stateData.length
              ? stateData.map((item) => {
                  return (
                    <div key={item[0].taskId} id={item[0].status}>
                      <TasksList
                        props={{
                          class: 'white black-text',
                          header: item[0].status,
                          tasks: item,
                        }}
                      />
                    </div>
                  );
                })
              : null}
          </>
        )}
      </div>
    </>
  );
};
