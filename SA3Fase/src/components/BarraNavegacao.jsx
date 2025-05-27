import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './BarraNavegacao.css'

function BarraNavegacao() {
    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'grey', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

            <Box sx={{display:'flex',flexDirection:'column' ,height:'20%', width:'100%', alignItems:'center'}}>

                <Box>
                    <Stack className="icon-navbar">
                        <img src="./public/imagens/icon2.png" alt="" />
                    </Stack>
                </Box>

                <Box>
                    <h2>Sale<span className="span-navbar">Sigth</span></h2>
                </Box>
            </Box>

            <Box sx={{display:'flex',flexDirection:'column' ,height:'80%', width:'100%', alignItems:'center', gap:'4%'}}>

                <Box sx={{ width: '88%', border: '1px solid black', borderRadius: '5px', gap: '15%' }}>
                    <Link to="/" className='link'>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4%', marginLeft: '2%' }} >

                            <Stack className="iconesidebar">
                                <img src="./public/imagens/Group 2.png" />
                            </Stack>

                            <Stack>
                                <Typography className="textsidebar" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000' }}>Inicio</Typography>
                            </Stack>

                        </Box>
                    </Link>
                </Box>
                <Box sx={{ width: '88%', border: '1px solid black', borderRadius: '5px', gap: '15%' }}>

                    <Link to="/desempenho" className='link'>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4%', marginLeft: '2%' }}>
                            <Stack className="iconesidebar">
                                <img src="./public/imagens/TrendUp.png" />
                            </Stack>
                            <Stack>
                                <Typography className="textsidebar" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000' }}>Funcionarios</Typography>
                            </Stack>
                        </Box>
                    </Link>
                </Box>

                <Box sx={{ width: '88%', border: '1px solid black', borderRadius: '5px', gap: '15%' }}>
                    <Link to="/produtos" className='link' >
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4%', marginLeft: '2%' }}>
                            <Stack className="iconesidebar">
                                <img src="./public/imagens/CirclesFour.png" />
                            </Stack>
                            <Stack>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000', textDecoration: 'none' }}>Produtos</Typography>
                            </Stack>
                        </Box>
                    </Link>
                </Box>
                <Box sx={{ width: '88%', border: '1px solid black', borderRadius: '5px', gap: '15%' }}>

                    <Link to="/estoque" className='link'>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4%', marginLeft: '2%' }}>
                            <Stack className="iconesidebar">
                                <img src="./public/imagens/directions_car.png" />
                            </Stack>
                            <Stack>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000' }}>Estoque</Typography>
                            </Stack>
                        </Box>
                    </Link>
                </Box>
                <Box sx={{ width: '88%', border: '1px solid black', borderRadius: '5px', gap: '15%' }}>


                    <Link to="/config" className='link'>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4%', marginLeft: '2%' }}>
                            <Box className="iconesidebar" >
                                <img src="./public/imagens/Settings.png" alt=""/>
                            </Box>
                            <Stack>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000' }}>Configurações</Typography>
                            </Stack>
                        </Box>
                    </Link>
                </Box>
                <Box sx={{ width: '88%', border: '1px solid black', borderRadius: '5px', gap: '15%' }}>

                    <Link to="/login" className='link'>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4%', marginLeft: '2%' }}>
                            <Stack className="iconesidebar">
                                <img src="./public/imagens/Log out.png" />
                            </Stack>
                            <Stack>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000000' }}>Sair</Typography>
                            </Stack>
                        </Box>
                    </Link>

                </Box>

            </Box>
        </Box>

    )
}

export default BarraNavegacao
