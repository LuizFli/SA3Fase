import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Avatar, CircularProgress } from '@mui/material';
import { getVendas } from '../api/vendasApi';

const SaleChart = () => {
  const [ultimasVendas, setUltimasVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUltimasVendas = async () => {
      setLoading(true);
      try {
        // Busca as vendas e pega as 3 mais recentes
        const vendas = await getVendas();
        if (vendas && vendas.length > 0) {
          setUltimasVendas(vendas.slice(0, 3));
        } else {
          setUltimasVendas([]);
        }
      } catch (error) {
        setUltimasVendas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUltimasVendas();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        flex: 1,
        width: 350,
        height: 330,
        boxSizing: 'border-box'
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Últimas Vendas
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto',
          maxHeight: 220,
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
        {loading ? (
          <CircularProgress />
        ) : ultimasVendas.length > 0 ? (
          ultimasVendas.map((venda) => (
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
                <Avatar alt={venda.nome_vendedor} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {venda.nome_vendedor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {venda.produto}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(venda.valor)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(venda.data).toLocaleDateString('pt-BR')}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhuma venda encontrada.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default SaleChart;