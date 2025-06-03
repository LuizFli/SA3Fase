import React, { useState } from 'react';
import {
    Typography,
    Box,
} from '@mui/material';
import Funcionario from '../components/Funcionario';

import PageContainer from '../components/PageContainer';



const ListaFuncionarios = () => {
    const funcionariosData = [
        {
            id: 1,
            nome: "João Silva",
            matricula: "65asd65sa4",
            cpf: "123.456.789-00",
            telefone: "(11) 98765-4321",
            foto: "",
            meta: 50,
            email:'joaosilva@gmail.com',
        },
        {
            id: 2,
            nome: "Maria Oliveira",
            matricula: "65asd65sa4",
            cpf: "123.456.789-00",
            telefone: "(11) 98765-4321",
            foto: "",
            meta: 40,
            email:'mariaOliveira@gmail.com',
        },
        {
            id: 3,
            nome: "Carlos Souza",
            matricula: "65asd65sa4",
            cpf: "123.456.789-00",
            telefone: "(11) 98765-4321",
            foto: "",
            meta: 30,
            email:'carlosSouza@gmail.com',
        }
    ];



    return (
        <PageContainer>

            <Box sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'top', height: '12%', alignItems: 'center' }}>

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

                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', height: '80%' }}>

                    <Box sx={{ width: '84%', bgcolor: 'background.paper', overflow: 'auto', borderRadius: '25px' }}>
                        {funcionariosData.map((funcionario) => (
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