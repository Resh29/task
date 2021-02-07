import React, { createContext, useEffect, useState } from 'react';

const DataContext = createContext([null, () => {}]);

const DataProvider = ({ children }) => {
  const [stateData, setState] = useState([]);

  return (
    <DataContext.Provider value={[setState, stateData]}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };
