import React, { createContext, useState } from 'react';

const DataContext = createContext([null, () => {}]);

const DataProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <DataContext.Provider value={[state, setState]}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };
