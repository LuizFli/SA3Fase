import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password
      });
  
      if (response.data.success) {
        const userData = {
          id: response.data.user.id,
          name: response.data.user.name,
          username: response.data.user.username,
          role: response.data.user.role,
          email: response.data.user.email,
          avatar: response.data.user.avatar
        };
        
        setUser(userData);
        return userData;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Credenciais inválidas';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const updateUser = (updatedUserData) => {
    setUser(prev => ({
      ...prev,
      ...updatedUserData
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      login, 
      logout,
      updateUser,
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}