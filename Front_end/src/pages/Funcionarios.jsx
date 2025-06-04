import React from 'react'
import { Box, Button, Container } from '@mui/material'
import PageContainer from '../components/PageContainer'
import ListaFuncionarios from './ListaFuncionarios'

import { useNavigate } from 'react-router'

function Funcionarios() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ListaFuncionarios />
    </PageContainer>
  )
}

export default Funcionarios;