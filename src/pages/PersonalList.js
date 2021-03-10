import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

import { TasksList } from '../components/TasksList';
import { useFetchData } from '../hooks/db.get';
import { Loader } from '../components/Loader';
import { ListFilter } from '../components/ListFilter';
import { DataContext } from '../context/DataContext';

export const PersonalList = () => {
  const { state } = useContext(AuthContext);
  const [setState, stateData] = useContext(DataContext);
  const [getData, loading] = useFetchData();

  useEffect(() => {
    if (state) {
      getData(`/users/${state.uid}/tasks`);
    }
  }, [state]);

  function dataFilter(value) {
    getData(`/users/${state.uid}/tasks`, value);
  }

  return (
    <>
      <h2>Мои заявочки...</h2>
      <ListFilter submitAction={dataFilter} />
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {stateData.length ? (
            <>
              {' '}
              {stateData.map((item) => {
                return (
                  <div className="col s12 m12 l6" key={item[0].taskId}>
                    <TasksList
                      props={{
                        class: `status-${item[0].status}`,
                        header: item[0].status.toUpperCase(),
                        tasks: item,
                      }}
                    />
                  </div>
                );
              })}{' '}
            </>
          ) : (
            <p className="grey-text flow-text"> Здесь пока ничего нет... </p>
          )}
        </div>
      )}
    </>
  );
};
