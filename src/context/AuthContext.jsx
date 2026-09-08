import React, { createContext, useState, useContext } from 'react';
import { demoUsers } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (userId, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = demoUsers.find(u => u.userId === userId && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: "Invalid demo credentials" };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoggedIn: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
