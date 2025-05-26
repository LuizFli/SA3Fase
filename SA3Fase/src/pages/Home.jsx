import React from 'react'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'

function Home() {
    return (
        <Box sx={{display:'flex'}}>
            <Box sx={{height:'100%', width:'20%'}}>
                <Navbar/>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100vw' }}>
                <h1>Bem-vindo ao SaleSight</h1>
            </Box>

        </Box>
    )
}

export default Home
