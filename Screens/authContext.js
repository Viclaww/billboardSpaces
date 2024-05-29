import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(null);
  const [refresh, setRefresh] = useState(null);

  return (
    <AuthContext.Provider value={{ access, setAccess, refresh, setRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
