import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext({
  userId: null,
  setUserId: () => {},
  ip: null,
  username: null, // Adiciona o campo username ao contexto
  setUsername: () => {}, // Adiciona a função para atualizar o username
});


export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const ip = 'http://192.168.0.105:8081'

  return (
    <UserContext.Provider value={{ userId, setUserId, ip, username, setUsername }}>
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