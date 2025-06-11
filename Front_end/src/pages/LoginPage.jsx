import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';
import FloatingChatButton from '../components/FloatingChatButton';
import { AuthProvider } from '../contexts/AuthContext';

export default function LoginPage() {
    return (
        <AuthProvider>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                {/* Lado esquerdo */}
                <Grid
                    size={6}
                    sx={{
                        background: 'linear-gradient(154deg, #FF9D00 57.65%, rgba(242, 234, 229, 0.00) 167.67%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 4,
                        px: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 4,
                        }}
                    >
                        <img
                            src="/Imagens/icon.png"
                            alt="iconeSaleSight"
                            style={{ width: 100, height: 100 }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
                            SaleSight
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: { xs: '90%', sm: '70%', md: '649px' },
                            height: { xs: 'auto', md: '474px' },
                            backgroundColor: 'rgba(230, 95, 43, 0.10)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '45%',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src="/Imagens/PaginadeLogin.png"
                            alt="Ilustração de login"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            textAlign: 'center',
                            maxWidth: 600,
                            mt: 4,
                            px: 2,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                mb: 1,
                                fontSize: {
                                    xs: '1.5rem',
                                    sm: '2rem',
                                    md: '2.5rem',
                                },
                            }}
                        >
                            Transformando dados em decisões.
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'black',
                                fontSize: {
                                    xs: '0.9rem',
                                    sm: '1rem',
                                    md: '1.1rem',
                                },
                            }}
                        >
                            Com nossa plataforma de relatórios de venda, impulsione suas estratégias e maximize seus resultados.
                        </Typography>
                    </Box>
                </Grid>

                <Grid
                    size={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        px: 2,
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 500,
                            mx: 'auto',
                            mt: 8, // coloca o título mais pra cima
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                            }}
                        >
                            Entrar & Conectar-se aos melhores relatórios de venda.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 400,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            // justifyContent: 'center',
                            paddingTop: 25,
                            alignItems: 'center',
                            mx: 'auto',
                        }}
                    >
                        <LoginForm />
                    </Box>

                    <FloatingChatButton />
                </Grid>

            </Grid>
        </AuthProvider>
    );
}