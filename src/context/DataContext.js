import React, { createContext, useEffect, useState } from 'react';

const DataContext = createContext([null, () => {}]);

const DataProvider = ({ children }) => {
  const [stateData, setState] = useState([]);
  const [awaiting, setAwaiting] = useState([]);
  const [done, setDone] = useState([]);
  const [inProgress, setinProgress] = useState([]);

  useEffect(() => {
    setAwaiting(stateData.filter((task) => task.status === 'awaiting'));
    setDone(stateData.filter((task) => task.status === 'done'));
    setinProgress(stateData.filter((task) => task.status === 'progress'));
  }, [stateData]);

  return (
    <DataContext.Provider value={[setState, awaiting, inProgress, done]}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };
