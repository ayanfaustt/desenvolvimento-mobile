import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext({
  userId: null,
  setUserId: () => {},
  ip: null,
});


export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  // const ip = 'http://192.168.100.5:8000' // diogo
  const ip = 'http://192.168.0.113:3000' // querem

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