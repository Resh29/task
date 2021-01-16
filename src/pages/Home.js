import { React, useState, useEffect, useContext } from 'react';
import { TasksList } from '../components/TasksList';

import { Loader } from '../components/Loader';
import { useFetchData } from '../hooks/db.get';
import { DataContext } from '../context/DataContext';

export const HomePage = () => {
  const [awaiting, setAwaiting] = useState([]);

  const [inProgress, setinProgress] = useState([]);
  const [done, setDone] = useState([]);
  // const [state, setState] = useContext(DataContext);
  const [data, loading] = useFetchData('/tasks');

  useEffect(() => {
    setAwaiting(data.filter((task) => task.status === 'awaiting'));
    setDone(data.filter((task) => task.status === 'done'));
    setinProgress(data.filter((task) => task.status === 'progress'));
  }, [data]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {awaiting.length ? (
            <div className="row">
              <div className="col s12 m4">
                <TasksList
                  props={{
                    class: 'white black-text',
                    header: 'Awaiting',
                    tasks: awaiting,
                  }}
                />
              </div>
              <div className="col s12 m4">
                <TasksList
                  props={{
                    class: 'blue white-text',
                    header: 'In progress',
                    tasks: inProgress,
                  }}
                />
              </div>
              <div className="col s12 m4">
                <TasksList
                  props={{
                    class: 'green white-text',
                    header: 'Done',
                    tasks: done,
                  }}
                />
              </div>
            </div>
          ) : (
            <p>No tasks </p>
          )}
        </>
      )}
    </>
  );
};
