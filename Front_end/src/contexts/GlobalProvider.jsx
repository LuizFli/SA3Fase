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
  const [funcionarios, setFuncionarios ] = useState([
    {
      id: 1,
      nome: "João Silva",
      matricula: "65asd65sa4",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      foto: "",
      financeiro:{
          meta: 40,
          vendaTotal:800000,
          comicao:20000
      },
      email: 'joaosilva@gmail.com',
  },
  {
      id: 2,
      nome: "Maria Oliveira",
      matricula: "65asd65sa4",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      foto: "",
      financeiro:{
          meta: 50,
          vendaTotal:1000000,
          comicao:20000
      },
      email: 'mariaOliveira@gmail.com',
  },
  {
      id: 3,
      nome: "Carlos Souza",
      matricula: "65asd65sa4",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      foto: "",
      financeiro:{
          meta: 30,
          vendaTotal:600000,
          comicao:20000
      },
      email: 'carlosSouza@gmail.com',
  }
  ])
  const [vendas, setVendas] = useState([]);
  
  // Qualquer dado/função que você queira compartilhar globalmente
  const value = {
    user,
    setUser,
    vendas,
    setVendas,
    produtos , 
    setProdutos,
    funcionarios, 
    setFuncionarios
    
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