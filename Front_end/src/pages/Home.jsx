import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LineChart from "../graphics/LineChart";
import RadialChart from "../graphics/RadialChart";
import BarChart from "../graphics/BarChart";
import SaleChart from "../graphics/SaleChart";

const TesteGraficos = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',         
        p: 0,
        gap: 3,
        margin: 3,
      }}>
        {/* Cabeçalho padrão com Paper */}
        <Paper
          elevation={3}
          sx={{
            padding: '15px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '10px',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.8rem' }}>
            Bem-vindo Luiz Filipe
          </Typography>
          <Avatar alt="Luiz Filipe" src="/Imagens/Adm.png" sx={{ width: 45, height: 45 }} />
        </Paper>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 'bold', pl: 5, pr: 5 }}>
          Aqui está o seu painel de previsão de vendas
        </Typography>

        <Box sx={{ display: 'flex', width: '95%', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
          <LineChart />
        </Box>

        <Box sx={{ 
          display: 'flex',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          width: '95%',
          margin: '0 auto',
          alignItems:'center' 
        }}>
          <RadialChart />
          <BarChart />
          <SaleChart />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TesteGraficos;