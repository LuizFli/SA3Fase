import { createContext, useContext, useState } from 'react';

// Cria o contexto
const GlobalContext = createContext();

// Provedor do contexto
export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [produtos , setProdutos] = useState([
    { id: 1, marca: 'Volkswagen', modelo: 'Golf', ano: 2022, cor: 'Preto', km: 15000, placa: 'ABC1D23' },
    { id: 2, marca: 'Ford', modelo: 'Focus', ano: 2021, cor: 'Branco', km: 25000, placa: 'DEF4G56' },
    { id: 3, marca: 'Chevrolet', modelo: 'Onix', ano: 2023, cor: 'Prata', km: 5000, placa: 'GHI7J89' },
    { id: 4, marca: 'Fiat', modelo: 'Argo', ano: 2020, cor: 'Vermelho', km: 40000, placa: 'KLM1N23' },
    { id: 5, marca: 'Hyundai', modelo: 'HB20', ano: 2022, cor: 'Cinza', km: 18000, placa: 'OPQ4R56' },
  ]);
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
    produtos , 
    setProdutos,
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