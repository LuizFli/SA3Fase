import React from 'react';
import { Box, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled, Card, CardMedia } from '@mui/material';
import { Home, People, Apps, Settings, Logout, Edit, Work as CasesIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 300;

const NavbarContainer = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  height: '100vh',
  backgroundColor: '#070605',
  position: 'fixed',
  left: 0,
  top: 0,
  padding: theme.spacing(2, 0),
  borderRight: '1px solid rgba(255, 255, 255, 0.12)',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    display: 'none'}
}));

const LogoContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  marginBottom: '16px',
  minHeight: '64px',
});

const LogoText = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'white',
  whiteSpace: 'nowrap',
  '& span': {
    color: '#E65F2B',
  },
});

const MenuList = styled(List)({
  height: 'calc(100vh - 120px)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#E65F2B',
    borderRadius: '2px',
  },
});

export default function PermanentSidebar() {
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', icon: <Home />, path: '/dashboard' },
    { text: 'Funcionários', icon: <People />, path: '/funcionarios' },
    { text: 'Gerenciar Acesso', icon: <CasesIcon />, path: '/gerenciaFun' },
    { text: 'Produtos', icon: <Apps />, path: '/produtos' },
    { text: 'Vendas', icon: <Edit />, path: '/vendas'},
    { text: 'Configurações', icon: <Settings />, path: '/gerenciaAcesso' },
    { text: 'Sair', icon: <Logout />, path: '/' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <NavbarContainer>
      <LogoContainer sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Card
          sx={{
            width: 90,
            height: 90,
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            boxShadow: 'none',
            p: 1
          }}
        >
          <CardMedia
            component="img"
            image="/Imagens/Icone_Sales.png"
            alt="Logo"
            sx={{
              width: '100px',
              height: '100px',
              objectFit: 'contain'
            }}
          />
        </Card>
        <LogoText>
          Sale<span>Sigth</span>
        </LogoText>
      </LogoContainer>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      <MenuList>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              display: 'block',
              mb: 1,
              mx: 1,
              minWidth: 0,
              borderRadius: '10px',

            }}
          >
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                minHeight: 48,
                px: 2.5,
                color: isActive(item.path) ? '#E65F2B' : 'white',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '8px',
                  right: '25px',
                  top: 0,
                  bottom: 0,
                  backgroundColor: isActive(item.path) ? 'white' : 'transparent',
                  borderRadius: '10px',
                  zIndex: -1,
                },
                '&:hover::before': {
                  backgroundColor: isActive(item.path) ? 'white' : 'rgba(255, 255, 255, 0.05)',
                },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: isActive(item.path) ? '#E65F2B' : 'white',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  '& .MuiTypography-root': {
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </MenuList>
    </NavbarContainer>
  );
}