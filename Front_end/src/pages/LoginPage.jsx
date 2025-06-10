import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';
import FloatingChatButton from '../components/FloatingChatButton';

export default function LoginPage() {
    return (
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

            {/* Lado direito */}
            <Grid
                size={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100vh',
                    px: 2,
                }}
            >
                {/* Título reduzido */}
                <Box sx={{ mt: 10 }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 'bold', textAlign: 'center', maxWidth: 400 }}
                    >
                        Entrar & Conectar-se aos melhores relatórios de venda.
                    </Typography>
                </Box>

                {/* Formulário com largura maior */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 500, // Aumentado
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        flexGrow: 1,
                    }}
                >
                    <LoginForm />
                </Box>

                <Box sx={{ height: 80 }} />
                <FloatingChatButton />
            </Grid>
        </Grid>
    );
}
