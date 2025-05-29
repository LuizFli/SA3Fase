import { Box } from '@mui/material'
import React from 'react'
import NavBar from '../components/NavBar'

function EstoqueProdutos() {
  return (
    <Box sx={{m:'0',p:'0' ,display:'flex'}}>
      <Box>
        <NavBar />
      </Box>
      <Box>
        <h2>Estoque Produtos</h2>
      </Box>
    </Box>
  )
}

export default EstoqueProdutos
