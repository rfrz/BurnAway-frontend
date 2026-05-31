import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('burnaway_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-fetch user on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await api.getProfile();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auth init failed", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      const newToken = response.token;
      
      localStorage.setItem('burnaway_token', newToken);
      setToken(newToken);
      
      const userData = await api.getProfile();
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      const newToken = response.token;
      
      localStorage.setItem('burnaway_token', newToken);
      setToken(newToken);
      
      const newProfile = await api.getProfile();
      setUser(newProfile);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('burnaway_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (data) => {
    try {
      const updatedUser = await api.updateProfile(data);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Update failed' };
    }
  };

  const updatePassword = async (data) => {
    try {
      const response = await api.updatePassword(data);
      // Backend might return a new token after password change
      if (response.token) {
        localStorage.setItem('burnaway_token', response.token);
        setToken(response.token);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Password update failed' };
    }
  };

  const deleteAccount = async () => {
    try {
      await api.deleteAccount();
      logout();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Account deletion failed' };
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isAuthenticated, 
        isLoading, 
        login, 
        register, 
        logout,
        updateUser,
        updatePassword,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
