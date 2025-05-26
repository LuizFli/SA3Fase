import React from 'react'
import { Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

function BarraNavegacao() {
  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'grey'}}>
    

      <Box>
        <Stack className="icon-navbar">
          <img src="./public/imagens/icon2.png" alt=""/>
        </Stack>

      </Box>

      <Box>
        <h2>Sale<span className="span-navbar">Sigth</span></h2>
      </Box>

      <nav className="navbar">
        <Box className="inicio">
          <Link to="/">

            <Box className="iconesidebar">
              <img src="./imagens/Group 2.png" alt="Início" />
            </Box>
            
            <Box className="textsidebar">Início</Box>

          </Link>
        </Box>

        <Box className="desempenho">
          <Link to="/desempenho">
            <Box className="iconesidebar">
              <img src="./imagens/TrendUp.png" alt="Desempenho" />
            </Box>
            <Box className="textsidebar">Funcionários</Box>
          </Link>
        </Box>

        <Box className="produtos">
          <Link to="/produtos">
            <Box className="iconesidebar">
              <img src="./imagens/CirclesFour.png" alt="Produtos" />
            </Box>
            <Box className="textsidebar">Produtos</Box>
          </Link>
        </Box>

        <Box className="vendidos">
          <Link to="/maisVendidos">
            <Box className="iconesidebar">
              <img src="./imagens/directions_car.png" alt="Mais Vendidos" />
            </Box>
            <Box className="textsidebar">Estoque</Box>
          </Link>
        </Box>

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

      </nav>
      </Box>
    
  )
}

export default BarraNavegacao
