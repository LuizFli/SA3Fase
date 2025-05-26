import React from 'react'
import { Box } from '@mui/material'
import BarraNavegacao from '../components/BarraNavegacao'

function Home() {
    return (
        <Box sx={{display:'flex', height: '96vh', width:'96vw' }}>
            <Box sx={{height:'100%', width:'12%'}}>
                <BarraNavegacao />

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width:'80%' }}>
                <h1>Bem-vindo ao SaleSight</h1>
            </Box>

        </Box>
    )
}

export default Home
