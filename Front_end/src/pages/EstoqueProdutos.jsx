import { Box, Typography, Paper } from '@mui/material'
import PageContainer from '../components/PageContainer'
import React from 'react'

function EstoqueProdutos() {
  return (
    <PageContainer>
      <Box sx={{
        width: '100%',
        height: '100%',
        p: 3,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Paper elevation={3} sx={{
          p: 3,
          mb: 3
        }}>
          <Typography variant="h4" component="h2" sx={{
            fontWeight: 'bold',
            color: 'primary.main'
          }}>
            Estoque de Produtos
          </Typography>
        </Paper>

        {/* Área para a tabela/listagem de produtos */}
        <Paper elevation={2} sx={{
          flex: 1,
          p: 2,
          overflow: 'auto'
        }}>
          {/* Sua tabela de produtos será inserida aqui */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'text.secondary'
          }}>
            Listagem de produtos aparecerá aqui
          </Box>
        </Paper>
      </Box>
    </PageContainer>
  )
}

export default EstoqueProdutos