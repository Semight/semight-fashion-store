// "use client";
// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// interface UserType {
//   name: string;
//   email: string;
//   phone?: string;
// }

// // Define the shape of your context data
// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: UserType | null; // `null` for unauthenticated users
//   login: (user: UserType) => void;
//   logout: () => void;
// }

// // Create the context with a default value of undefined
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Create a provider component
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [user, setUser] = useState<UserType | null>(null);

//   useEffect(() => {
//     // Check for an existing auth state in localStorage
//     const storedAuth = localStorage.getItem('isAuthenticated');
//     const storedUser = localStorage.getItem("user");
//     if (storedAuth === "true" && storedUser) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData: UserType) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     localStorage.setItem('isAuthenticated', 'true'); // Save to localStorage
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Create a custom hook for easier usage
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define the shape of your context data
interface User {
  name: string;
  email: string;
  phone?: string; // Optional phone property
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing auth state in localStorage
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");

    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser)); // Parse the stored user
    }
  }, []);

  const login = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easier usage
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
