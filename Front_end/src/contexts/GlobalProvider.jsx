import { createContext, useContext, useState } from 'react';

// Cria o contexto
const GlobalContext = createContext();

// Provedor do contexto
export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [produtos , setProdutos] = useState([]);
  const [funcionarios, setFuncionarios ] = useState([
    {
      id: 1,
      nome: "João Silva",
      identificador: "48456",
      cargo: "Vendedor Pleno",
      ultimaVenda: `R$ 8.500,00`,
      foto: "",
      vendasTotais: '9',
      financeiro:{
          meta: 40.58,
          vendaTotal:80000,
          comicao:20000
      },
  }
  ])
  const [vendas, setVendas] = useState([]);
  const [config, setConfig] = useState({

    comicao: 4, // Porcentagem de comissão
    meta: 2000000, // Meta de vendas em reais
  })
  
  // Qualquer dado/função que você queira compartilhar globalmente
  const value = {
    user,
    setUser,
    vendas,
    setVendas,
    produtos , 
    setProdutos,
    funcionarios, 
    setFuncionarios,
    config,
    setConfig
    
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