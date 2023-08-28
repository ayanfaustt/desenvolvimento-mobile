import React, { createContext, useState, useContext, useEffect } from 'react';
import { env } from '../../env.config';

const UserContext = createContext({
  userId: null,
  setUserId: () => {},
  username:null,
  setUserName: () => {},
  ip: null,
  token: null,
  setToken: () => {},
  reqConfig: null,
  setReqConfig: () => []
});


export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUserName] = useState(null);
  const [reqConfig, setReqConfig] = useState({         
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  const ip = env.ip;

  useEffect(() => {
    if (token) {
      setReqConfig({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ userId, setUserId, ip, token, setToken, reqConfig, setReqConfig, username, setUserName }}>
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