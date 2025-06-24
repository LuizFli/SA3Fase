import React, { useState } from 'react';
import { Typography, Box, Avatar, Paper } from '@mui/material';
import Funcionario from '../components/Funcionario';
import PageContainer from '../components/PageContainer';
import { useGlobal } from '../contexts/GlobalProvider';

const ListaFuncionarios = () => {
  const { funcionarios, setFuncionarios } = useGlobal();

  return (
    <PageContainer>
      <Box
        sx={{
          padding: '20px',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        {/* Cabeçalho com Paper */}
        <Paper
          elevation={3}
          sx={{
            padding: '15px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
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
            Funcionários
          </Typography>
          <Avatar
            alt="Usuário"
            src="/Imagens/Adm.png"
            sx={{ width: 45, height: 45 }}
          />
        </Paper>

        {/* Conteúdo principal */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            height: '80%',
          }}
        >
          <Box
            sx={{
              width: '84%',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
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
              },
            }}
          >
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