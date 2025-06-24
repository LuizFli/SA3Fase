import { createContext, useContext, useState } from 'react';

// Cria o contexto
const GlobalContext = createContext();

// Provedor do contexto
export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [produtos , setProdutos] = useState([
    { id: 1, marca: 'Volkswagen', modelo: 'Golf', ano: 2022, cor: 'Preto', km: 15000, placa: 'ABC1D23', valor: 85000 },
    { id: 2, marca: 'Ford', modelo: 'Focus', ano: 2021, cor: 'Branco', km: 25000, placa: 'DEF4G56', valor: 78000 },
    { id: 3, marca: 'Chevrolet', modelo: 'Onix', ano: 2023, cor: 'Prata', km: 5000, placa: 'GHI7J89', valor: 65000 },
    { id: 4, marca: 'Fiat', modelo: 'Argo', ano: 2020, cor: 'Vermelho', km: 40000, placa: 'KLM1N23' , valor: 60000 },
    { id: 5, marca: 'Hyundai', modelo: 'HB20', ano: 2022, cor: 'Cinza', km: 18000, placa: 'OPQ4R56' , valor: 70000 },
    
  ]);
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