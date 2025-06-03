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
import RevenueCard from "../grafics/RevenueCard";
import CarsSoldCard from "../grafics/CarsSoldCard";
import SellerActionCard from "../grafics/SellerActionCard";
import CalendarCard from "../grafics/CalendarCard";

const TesteGraficos = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        p: 0,
        gap: 3, // Espaço entre as linhas
        margin: 0
      }}>
        {/* Cabeçalho */}
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
            <Avatar alt="Arthur Viecili" src="/static/images/avatar/1.jpg" />
          </Box>
        </Box>

        {/* Linha Superior - RevenueCard ocupa 100% */}
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center'}}>
          <RevenueCard />
        </Box>

        {/* Linha Inferior - 3 cards com mesmo tamanho */}
        <Box sx={{ 
          display: 'flex',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, // 3 colunas iguais
          gap: 3,
          width: '95%',
          margin: '0 auto', // Centraliza horizontalmente
          alignItems:'center' 
        }}>
          <CarsSoldCard />
          <SellerActionCard />
          <CalendarCard />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TesteGraficos;