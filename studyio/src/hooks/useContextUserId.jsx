import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext({
  userId: null,
  setUserId: () => {},
  ip: null
});


export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const ip = 'http://192.168.0.165:8000'
  // const ip = 'http://10.34.131.239:8000'

  return (
    <UserContext.Provider value={{ userId, setUserId, ip }}>
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