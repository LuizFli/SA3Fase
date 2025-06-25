// src/components/CadastroFuncionario.jsx

import { Avatar, Box, Button, Stack, TextField, Typography, MenuItem, InputAdornment, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
// Removido useGlobal pois não estava sendo usado para o fluxo principal de cadastro/edição
// import { useGlobal } from '../contexts/GlobalProvider' 

function CadastroFuncionario() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [sexo, setSexo] = React.useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const [modoEdicao, setModoEdicao] = useState(false);
  const [indiceEdicao, setIndiceEdicao] = useState(null);

  const [funcionario, setFuncionario] = useState({
    nome: '',
    usuario: '',
    dataNascimento: '',
    sexo: '',
    cpf: '',
    rg: '',
    identificador: '',
    email: '',
    telefone: '',
    cargo: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    cep: '',
    senha: '',
    confirmacaoSenha: '',
    foto: '',
  });

  useEffect(() => {
    const carregarFuncionarioParaEdicao = async () => {
      // Usa location.state?.indiceParaEditar que parece ser o ID do funcionário
      if (location.state?.indiceParaEditar) {
        const idFuncionario = location.state.indiceParaEditar;
        setModoEdicao(true);
        setIndiceEdicao(idFuncionario);
        try {
          const response = await axios.get(`http://localhost:3000/api/funcionarios/${idFuncionario}`);
          const dados = response.data;
          // Formata a data para o input type="date"
          const dataFormatada = dados.data_nascimento ? new Date(dados.data_nascimento).toISOString().split('T')[0] : '';
          setFuncionario({
            ...dados,
            dataNascimento: dataFormatada,
            confirmacaoSenha: dados.senha // Preenche para evitar validação de senhas diferentes
          });
          setSexo(dados.sexo || ''); // Seta o estado do campo de sexo
        } catch (error) {
          console.error("Erro ao carregar funcionário:", error);
          alert("Não foi possível carregar os dados do funcionário para edição.");
        }
      }
    };
    carregarFuncionarioParaEdicao();
  }, [location.state]);

  const mudarValores = (e) => {
    const { id, value } = e.target;
    setFuncionario({ ...funcionario, [id]: value });
  };
  
  // Função separada para o campo de sexo para atualizar ambos os estados
  const mudarSexo = (e) => {
    const novoSexo = e.target.value;
    setSexo(novoSexo);
    setFuncionario({ ...funcionario, sexo: novoSexo });
  };

  const Cadastrar = async () => {
    if (funcionario.senha !== funcionario.confirmacaoSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // CORREÇÃO: Prepara os dados para serem enviados, garantindo o nome correto do campo de data
    const dadosParaEnviar = {
        ...funcionario,
        data_nascimento: funcionario.dataNascimento
    };
    delete dadosParaEnviar.dataNascimento;
    delete dadosParaEnviar.confirmacaoSenha;


    try {
      if (modoEdicao) {
        await axios.put(`http://localhost:3000/api/funcionarios/${indiceEdicao}`, dadosParaEnviar);
        alert("Funcionário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/api/funcionarios", dadosParaEnviar);
        alert("Funcionário cadastrado com sucesso!");
      }
      navigate('/gerenciaFun');
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
      alert(error.response?.data?.erro || "Erro ao salvar funcionário");
    }
  };

  // Restante do seu componente...
  // ... (ApagarDados, validações, JSX, etc.)
  // O JSX não precisa de alteração, apenas a lógica acima.
  // ...
  // Lembre-se de usar a função `mudarSexo` no onChange do TextField de Sexo.
  // <TextField select value={sexo} onChange={mudarSexo}>
  return (
    // Seu JSX aqui... use as funções corrigidas
    // Exemplo para o campo de sexo:
    // <TextField ... select value={sexo} onChange={mudarSexo}> ...
    <Box>...</Box>
  )
}

export default CadastroFuncionario;