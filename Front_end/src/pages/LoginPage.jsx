import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                size={6}
                sx={{
                    background: 'linear-gradient(135deg, #FF6D00 0%, #FF9100 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    position: 'relative'
                }}
            >
                <Box sx={{ textAlign: 'center', color: 'white', p: 4, zIndex: 1 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                        SalesSight
                    </Typography>
                    <Typography variant="h5">
                        Transformando dados em decisões
                    </Typography>
                </Box>
                
                {/* Imagem - ajuste o caminho conforme sua estrutura de arquivos */}
                <img 
                    src="/Imagens/PaginadeLogin.png" 
                    alt="Ilustração de login" 
                    style={{ 
                        maxWidth: '80%',
                        maxHeight: '50%',
                        objectFit: 'contain',
                        marginTop: '20px'
                    }} 
                />
            </Grid>

            {/* Lado direito - formulário */}
            <Grid
                size={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'background.paper',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 400, p: 3 }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
                    >
                        Entrar & Conectar-se aos melhores relatórios de venda
                    </Typography>
                    
                    <LoginForm />
                </Box>
            </Grid>
        </Grid>
    );
}