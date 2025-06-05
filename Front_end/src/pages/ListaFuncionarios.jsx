import React, { useState } from 'react';
import {
    Typography,
    Box,
} from '@mui/material';
import Funcionario from '../components/Funcionario';
import PageContainer from '../components/PageContainer';
import { useGlobal } from '../contexts/GlobalProvider';

    



const ListaFuncionarios = () => {
    const { funcionarios, setFuncionarios } = useGlobal()
    

    return (
        <PageContainer>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'top', height: '12%', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ width: '%', display: 'flex', justifyContent: 'center' }}>

                        <Typography
                            variant="h4"
                            sx={{
                                color: '#133337',
                                mb: 3,
                                fontWeight: 'bold'
                            }}>
                            Funcionários
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', height: '80%' }}>
                    <Box sx={{
                        width: '84%', overflow: 'auto', '&::-webkit-scrollbar': {
                            width: '8px',
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                            borderRadius: '10px',

                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#e65f2b',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: 'orange',
                        }
                    }}>
                        {funcionarios.map((funcionario) => (
                            <React.Fragment key={funcionario.id}>
                                <Funcionario
                                    funcionario={funcionario}
                                    onClick={() => handleAbrirDesempenho(funcionario)}
                                />
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default ListaFuncionarios;