import { createContext, useContext, useState } from 'react';
import { useGlobal } from './GlobalProvider';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const {user, setUser} = useGlobal(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@salesight.com' && password === 'admin123') {
        const userData = {
          id: 1,
          name: 'Administrador',
          email,
          role: 'admin'
        };
        setUser(userData);
        return userData;
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}