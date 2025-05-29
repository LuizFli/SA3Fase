import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import PageContainer from '../components/PageContainer';

function CadastroProduto() {
  return (
    <PageContainer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 4
          }}>
            Cadastro de Produtos
          </Typography>
          
          {/* Seu formulário de cadastro virá aqui */}
          <Box component="form" sx={{ mt: 3 }}>
            {/* Campos do formulário */}
            <Typography variant="body1">
              Formulário de cadastro será implementado aqui
            </Typography>
          </Box>
        </Paper>
      </Container>
    </PageContainer>
  );
}

export default CadastroProduto;
