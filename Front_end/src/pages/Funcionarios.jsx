import React from 'react'
import { Box, Button, Container } from '@mui/material'
import PageContainer from '../components/PageContainer'
import CadastroFuncionario from '../components/CadastroFuncionario'
import { Navigate } from 'react-router'

function Funcionarios() {

  const handleCadastro = () => {
    <Navigate to="/cadastroFuncionario" />
  }
  const handleLista = () => {
    <Navigate to="/listaFuncionarios" />
  }

  return (
    <PageContainer>
      <Button onClick={handleCadastro}>Cadastro Funcionario</Button>
      <Button onClick={handleLista}>Lista Funcionarios</Button>
      
             
    </PageContainer>
  )
}

export default Funcionarios;