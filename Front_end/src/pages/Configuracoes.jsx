import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PageContainer from '../components/PageContainer';
import GerenciaFuncionario from '../components/GerenciaFuncionario';
import PerfilConfig from '../components/PerfilConfig';
import NotificacoesConfig from '../components/NotificacoesConfig';
import AjudaConfig from '../components/AjudaConfig';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ width: '100%' }}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const Configuracoes = () => {
  const [tab, setTab] = useState(0);

  return (
    <PageContainer>
      <Box
        sx={{
          padding: '20px',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: '15px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              fontSize: '1.8rem',
            }}
          >
            Configurações
          </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            borderRadius: '10px',
            minHeight: 400,
            height: '90%',
          }}
        >
          {/* Menu lateral */}
          <Box
            sx={{
              minWidth: 220,
              borderRight: '1px solid #eee',
              background: '#fafafa',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              height: '100%',
            }}
          >
            <Tabs
              orientation="vertical"
              value={tab}
              onChange={(_, newValue) => setTab(newValue)}
              sx={{
                width: '100%',
                height: '100%',
                '& .MuiTab-root': {
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  borderRadius: '20px',
                  color: '#222',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  mb: 1,
                  px: 2,
                  py: 1.5,
                  transition: 'background 0.2s, color 0.2s',
                  minHeight: 48,
                  letterSpacing: 1,
                  textTransform: 'none',
                  '&.Mui-selected': {
                    background: '#e65f2b',
                    color: '#fff',
                  },
                  '&:hover': {
                    background: '#ffe2d2',
                    color: '#e65f2b',
                  },
                  gap: 1.5,
                  justifyContent: 'flex-start',
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab icon={<PersonIcon />} iconPosition="start" label="Perfil" />
              <Tab icon={<GroupIcon />} iconPosition="start" label="Gerenciamento de Funcionários" />
              <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notificações" />
              <Tab icon={<HelpOutlineIcon />} iconPosition="start" label="Ajuda" />
            </Tabs>
          </Box>
          {/* Conteúdo da configuração */}
          <Box sx={{ flex: 1, height: '100%' }}>
            <TabPanel value={tab} index={0}>
              <PerfilConfig />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <GerenciaFuncionario />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <NotificacoesConfig />
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <AjudaConfig />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </PageContainer>
  );
};

export default Configuracoes;