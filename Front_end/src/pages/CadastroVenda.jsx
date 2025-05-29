import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import PageContainer from '../components/PageContainer';
import useGlobal from '../contexts/GlobalProvider'

function CadastroVenda() {

  const { vendas, setVendas } = useGlobal()
  return (
    <PageContainer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ 
          p: 3,
          minHeight: '70vh', // Altura mínima para preencher a tela
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Cabeçalho */}
          <Typography variant="h4" component="h1" gutterBottom sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 3,
            borderBottom: '1px solid #eee',
            pb: 2
          }}>
            Cadastro de Venda
          </Typography>

          {/* Área do conteúdo (será substituído pelo seu formulário) */}
          <Box sx={{
            flex: 1, // Ocupa todo o espaço disponível
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}>
            {/* Espaço reservado para o conteúdo */}
            <Box sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed #ccc',
              borderRadius: 1,
              p: 4,
              backgroundColor: 'rgba(0,0,0,0.02)'
            }}>
              <Typography variant="body1" color="text.secondary">
                Área para o formulário de cadastro de venda
              </Typography>
            </Box>

            {/* Rodapé do formulário */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              pt: 2,
              borderTop: '1px solid #eee'
            }}>
              {/* Botões serão adicionados aqui */}
            </Box>
          </Box>
        </Paper>
      </Container>
    </PageContainer>
  );
}

export default CadastroVenda;