import React from 'react'
import { Box } from '@mui/material'
import PageContainer from '../components/PageContainer' // Importe o componente criado anteriormente


function Relatorio() {
  return (
    <PageContainer>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',  // Ocupa 100% do espaço disponível
                width: '100%',   // Ocupa 100% do espaço disponível
                p: 3             // Padding opcional
            }}>
                <h1 style={{ fontSize: '2.5rem', color: '#333' }}>
                    Bem-vindo ao <span style={{ color: '#E65F2B' }}>SaleSight</span>
                </h1>
            </Box>
        </PageContainer>
  )
}

export default Relatorio
