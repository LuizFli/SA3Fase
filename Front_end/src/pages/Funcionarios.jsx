import React from 'react'
import { Box, Button, Container } from '@mui/material'
import PageContainer from '../components/PageContainer'
import CadastroFuncionario from '../components/CadastroFuncionario'
import { useNavigate } from 'react-router'

function Funcionarios() {
  const navigate = useNavigate();

  const handleCadastro = () => {
    navigate("/cadastrofun");
  }
  const handleLista = () => {
    navigate("/listaFuncionarios");
  }

  return (
    <PageContainer>
      <Button onClick={handleCadastro}>Cadastro Funcionario</Button>
      <Button onClick={handleLista}>Lista Funcionarios</Button>
      
             
    </PageContainer>
  )
}

export default Funcionarios;