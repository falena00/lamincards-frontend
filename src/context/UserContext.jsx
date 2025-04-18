// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Crea il contesto
const UserContext = createContext();

// 2. Hook per usare il contesto
export function useUser() {
  return useContext(UserContext);
}

// 3. Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Al primo caricamento → recupera utente da localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Quando l'utente cambia → aggiorna localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
