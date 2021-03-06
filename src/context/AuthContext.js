import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return <AuthContext.Provider value={{ state, setState, isAdmin, setIsAdmin }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
