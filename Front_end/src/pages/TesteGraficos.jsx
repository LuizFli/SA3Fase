import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LineChart from "../graphics/LineChart";
import RadialChart from "../graphics/RadialChart";
import BarChart from "../graphics/BarChart";
import CalendarCard from "../graphics/CalendarCard";

const TesteGraficos = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        p: 0,
        gap: 3,
        margin: 0,
        backgroundColor: '#EBD3BB', // Mantendo o fundo do primeiro código
      }}>
        {/* Cabeçalho (igual ao primeiro código) */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1,
          pl: 2,
          pr: 2,
          pt: 2,
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Bem-vindo Arthur Viecili
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Aqui está o seu painel de previsão de vendas
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <NotificationsActiveIcon color="success" />
            </IconButton>
            <Avatar alt="Arthur Viecili" src="https://via.placeholder.com/40" />
          </Box>
        </Box>

        {/* Linha Superior - LineChart ocupa 100% (substitui o RevenueCard) */}
        <Box sx={{ display: 'flex', width: '95%', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
          <LineChart />
        </Box>

        {/* Linha Inferior - 3 cards com gráficos do primeiro código */}
        <Box sx={{ 
          display: 'flex',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          width: '95%',
          margin: '0 auto',
          alignItems:'center' 
        }}>
          <RadialChart />
          <BarChart />
          <CalendarCard />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TesteGraficos;