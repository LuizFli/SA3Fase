import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function BarraNavegacao() {
    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'grey', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>


            <Box>
                <Stack className="icon-navbar">
                    <img src="./public/imagens/icon2.png" alt="" />
                </Stack>
            </Box>

            <Box>
                <h2>Sale<span className="span-navbar">Sigth</span></h2>
            </Box>


            <Link to="/">
                <Box sx={{ display: 'flex', flexDirection: 'row', border: '1px solid black', borderRadius: '5px' }} >

                    <Stack className="iconesidebar">
                        <img src="./imagens/Group 2.png" />
                    </Stack>

                    <Stack>
                        <Typography className="textsidebar" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000' }}>Inicio</Typography>
                    </Stack>

                </Box>
            </Link>

            <Link to="/desempenho">
                <Box sx={{ display: 'flex', flexDirection: 'row', border: '1px solid black', borderRadius: '5px' }}>
                    <Stack className="iconesidebar">
                        <img src="./imagens/TrendUp.png" />
                    </Stack>
                    <Stack>
                        <Typography className="textsidebar" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000' }}>Funcionarios</Typography>
                    </Stack>
                </Box>
            </Link>

            <Link to="/produtos">
                <Box sx={{ display: 'flex', flexDirection: 'row', border: '1px solid black', borderRadius: '5px' }}>
                    <Stack className="iconesidebar">
                        <img src="./imagens/CirclesFour.png" alt="Produtos" />
                    </Stack>
                    <Stack>
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000' }}>Produtos</Typography>
                    </Stack>
                </Box>
            </Link>

                <Link to="/maisVendidos">
            <Box className="vendidos">
                    <Box className="iconesidebar">
                        <img src="./imagens/directions_car.png" alt="Mais Vendidos" />
                    </Box>
                    <Box className="textsidebar">Estoque</Box>
            </Box>
                </Link>

            <Box className="config">
                <Link to="/config">
                    <Box className="iconesidebar">
                        <img src="./imagens/Settings.png" alt="Cad Func" />
                    </Box>
                    <Box className="textsidebar">Configurações</Box>
                </Link>
            </Box>

            <Box className="logout">
                <Link to="/login">
                    <Box className="iconesidebar">
                        <img src="./imagens/Log out.png" alt="Log Out" />
                    </Box>
                    <Box className="textsidebar">Log Out</Box>
                </Link>
            </Box>


        </Box>

    )
}

export default BarraNavegacao
