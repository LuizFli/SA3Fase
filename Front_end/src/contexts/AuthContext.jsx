import { createContext, useContext, useState } from 'react';
import { useGlobal } from './GlobalProvider';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { user, setUser } = useGlobal(null);
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
          role: response.data.user.role
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

  // const logout = () => {
  //   setUser(null);
  //   // Opcional: Chamada para o endpoint de logout se estiver usando sessões
  //   axios.post('http://localhost:3000/api/auth/logout').catch(console.error);
  // };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      // logout, 
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}