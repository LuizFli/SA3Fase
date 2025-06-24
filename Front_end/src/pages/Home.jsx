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
    
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1,
          pl: 5,
          pr: 5,
          pt: 2,
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Bem-vindo Arthur Viecili
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Aqui está o seu painel de previsão de vendas
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <NotificationsActiveIcon  sx={{ color: '#e86f40'}} />
            </IconButton>
            <Avatar alt="Arthur Viecili" src="/Imagens/Adm.png" />
          </Box>
        </Box>


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