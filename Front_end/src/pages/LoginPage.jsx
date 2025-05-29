import { CssBaseline, Box, Container } from '@mui/material';
import { AuthProvider } from '../contexts/AuthContext';
import { Login } from '@mui/icons-material';
import React from 'react';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginFrom';


export default function LoginPage() {
    return (
        <AuthProvider>
            <CssBaseline />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'grey.800',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <Container component="main" maxWidth="xs" sx={{ maxHeight:'80%' ,backgroundColor: 'whitesmoke', boxShadow: '0 0 10px 1px whitesmoke', borderRadius:'15px'}}>
                    <Box
                        sx={{
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                           
                        }}
                    >
                        <LoginHeader />
                        <LoginForm />

                    </Box>
                </Container>
            </Box>
        </AuthProvider>
    );
}