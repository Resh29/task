import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const initialState = {
  user: '',
  isAdmin: '',
};

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // const changeToken = (user, isAdmin) => {
  //   setState(user);
  //   setIsAdmin(isAdmin);
  // };
  return (
    <AuthContext.Provider value={{ state, setState, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
