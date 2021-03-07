import { React, useEffect, useContext } from 'react';
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
  }, []);

  function dataFilter(value) {
    getData('/tasks', value);
  }

  return (
    <section className="page">
      <h1> Добро пожаловать... Снова </h1>

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
