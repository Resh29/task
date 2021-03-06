import React, { useEffect, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useFetchData } from '../hooks/db.get';
import { Loader } from '../components/Loader';
import { TasksList } from '../components/TasksList';

export const AllTasks = () => {
  const [getData, loading] = useFetchData();
  const [setState, stateData] = useContext(DataContext);
  useEffect(() => {
    getData('/tasks', 'all');
  }, []);

  return (
    <>
      <h1> Управление заявками </h1>
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {stateData.length ? (
            <>
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
