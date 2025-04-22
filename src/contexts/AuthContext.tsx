import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{success: boolean; message?: string}>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{success: boolean; message?: string}>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => ({success: false}),
  signup: async () => ({success: false}),
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem('user').then(stored => {
      if (stored) setUser(JSON.parse(stored));
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    // dummy auth
    if (email === 'test@example.com' && password === 'password') {
      const u: User = {name: 'Test User', email};
      setUser(u);
      await AsyncStorage.setItem('user', JSON.stringify(u));
      return {success: true};
    }
    return {success: false, message: 'Incorrect credentials'};
  };

  const signup = async (name: string, email: string, password: string) => {
    if (password.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters',
      };
    }
    const u: User = {name, email};
    setUser(u);
    await AsyncStorage.setItem('user', JSON.stringify(u));
    return {success: true};
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{user, loading, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
