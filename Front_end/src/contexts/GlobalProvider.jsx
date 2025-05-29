import { createContext, useContext, useState } from 'react';

// Cria o contexto
const GlobalContext = createContext();

// Provedor do contexto
export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [vendas, setVendas] = useState([
    {
      id_produto: 1,
      produto: 'Notebook Pro',
      valor: 4599.99,
      data: '2023-10-01',
      matricula_vendedor: 'V00123',
      auth_code: 'A1B2C3D4'
    },
    {
      id_produto: 2,
      produto: 'Smartphone Plus',
      valor: 2299.50,
      data: '2023-10-15',
      matricula_vendedor: 'V00245',
      auth_code: 'E5F6G7H8'
    },
    // Adicione mais dados de exemplo...
  ]);
  
  // Qualquer dado/função que você queira compartilhar globalmente
  const value = {
    user,
    setUser,
    vendas,
    setVendas,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useGlobal() {
  return useContext(GlobalContext);
}