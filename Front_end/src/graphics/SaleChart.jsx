import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { useGlobal } from '../contexts/GlobalProvider';

const SaleChart = () => {
  const { vendas} = useGlobal();
    

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, flex: 1, height: 282 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Últimas Vendas
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto', // Adiciona barra de rolagem
          maxHeight: 240, // Define a altura máxima do conteúdo rolável
        }}
      >
        {vendas.map((venda) => (
          <Box
            key={venda.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderRadius: 2,
              backgroundColor: '#F5F5F5',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar alt={venda.nome} src={venda.foto} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {venda.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {venda.produto}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                {venda.valor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {venda.data}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default SaleChart;