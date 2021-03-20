import { React, useEffect, useContext, useState } from 'react';
import { TasksList } from '../components/TasksList';
import { Loader } from '../components/Loader';
import { useFetchData } from '../hooks/db.get';
import { DataContext } from '../context/DataContext';
import { ListFilter } from '../components/ListFilter';

export const HomePage = () => {
  const [getData, loading] = useFetchData();
  const [refreshStatus, setRefreshStatus] = useState(false);

  const [setState, stateData] = useContext(DataContext);

  useEffect(() => {
    getData('/tasks');

    return () => {};
  }, []);
  useEffect(() => {
    let interval = setInterval(async () => {
      setRefreshStatus((v) => !v);
      await getData('/tasks');
      setTimeout(() => {
        setRefreshStatus((v) => !v);
      }, 400);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function dataFilter(value) {
    getData('/tasks', value);
  }

  return (
    <section className="page">
      {refreshStatus ? (
        <div>
          <span className="badge">
            <i className="small material-icons  refresh-status-icon"> refresh </i>
          </span>
        </div>
      ) : null}

      <h2> Добро пожаловать... Снова </h2>

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
            <p className="flow-text grey-text"> Нa сегодня заявок нет... </p>
          )}
        </>
      )}
    </section>
  );
};
