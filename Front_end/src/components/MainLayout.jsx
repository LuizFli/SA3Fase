import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      overflow: 'hidden' // Impede rolagem global
    }}>
      {!isMobile && <NavBar/>}
      
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: { xs: 0, md: '300px' }, // Responsivo
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Remove rolagem do container principal
          position: 'relative'
        }}
      >
        <Box sx={{
          flex: 1,
          overflow: 'auto', // Rolagem apenas no conteúdo se necessário
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;