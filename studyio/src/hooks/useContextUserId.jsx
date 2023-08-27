import React, { createContext, useState, useContext } from 'react';
import { env } from '../../env.config';

const UserContext = createContext({
  userId: null,
  setUserId: () => {},
  ip: null,
  token: null,
  setToken: () => {}
});


export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const ip = env.ip;

  return (
    <UserContext.Provider value={{ userId, setUserId, ip, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}