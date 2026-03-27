import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/client";

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const foundUser = await loginUser(email, password);

      const userData: User = {
        id: foundUser.id || "",
        email: foundUser.email,
        name: foundUser.name,
        phone: foundUser.phone,
        avatar: foundUser.avatar,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string,
  ) => {
    try {
      // Generate avatar from dicebear
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(" ", "")}`;

      const newUser = await registerUser({
        email,
        password,
        name,
        phone,
        avatar,
      });

      const userData: User = {
        id: newUser.id || "",
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        avatar: newUser.avatar,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
