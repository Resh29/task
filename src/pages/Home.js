import { React, useEffect, useContext, useCallback } from 'react';
import { TasksList } from '../components/TasksList';

import { Loader } from '../components/Loader';
import { useFetchData } from '../hooks/db.get';
import { DataContext } from '../context/DataContext';
import { ListFilter } from '../components/ListFilter';

export const HomePage = () => {
  const [getData, loading] = useFetchData();

  const [setState, stateData] = useContext(DataContext);
  useEffect(() => {
    getData('/tasks');
    return function clean() {
      setState([]);
    };
  }, []);

  function dataFilter(value) {
    getData('/tasks', value);
  }

  return (
    <>
      <p className="flow-text"> Good day </p>
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ListFilter submitAction={dataFilter} />
          {stateData.length ? (
            <div className="row">
              {stateData.map((item) => {
                return (
                  <div className="col s12 m12 l4" key={item[0].taskId}>
                    <TasksList
                      props={{
                        class: `status-${item[0].status}`,
                        header: item[0].status.toUpperCase(),
                        tasks: item,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No tasks </p>
          )}
        </>
      )}
    </>
  );
};
