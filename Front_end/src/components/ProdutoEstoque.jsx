import React from 'react';
import {
  Table as Tabela,
  TableBody as CorpoTabela,
  TableCell as Celula,
  TableContainer as ContainerTabela,
  TableHead as CabecalhoTabela,
  TableRow as Linha,
  Button as Botao,
  Box as Container,
  Typography as Texto,
  Chip
} from '@mui/material';
import { Edit as Editar } from '@mui/icons-material';

const ProdutoEstoque = ({ produtos, editarProduto }) => {
  return (
    <ContainerTabela
      sx={{
        maxHeight: 'calc(100vh - 300px)',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555'
        }
      }}
    >
      <Tabela sx={{ minWidth: 650 }} stickyHeader>
        <CabecalhoTabela>
          <Linha sx={{ backgroundColor: '#e0e0e0' }}>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Marca</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Modelo</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Ano</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Cor</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Km</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Placa</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Valor</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>ID</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Status</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Ações</Celula>
          </Linha>
        </CabecalhoTabela>
        <CorpoTabela>
          {produtos.map((produto) => (
            <Linha
              key={produto.id}
              sx={{ 
                '&:hover': { backgroundColor: '#f9f9f9' },
                // Opcional: destaque visual para inativos
                backgroundColor: produto.ativo === false ? 'rgba(255, 0, 0, 0.05)' : 'inherit'
              }}
            >
              <Celula sx={{ textAlign: 'center' }}>{produto.marca}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.modelo}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.ano}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.cor}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.km.toLocaleString('pt-BR')}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.placa}</Celula>
              <Celula sx={{ textAlign: 'center' }}>
                {Number(produto.valor).toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </Celula>
              <Celula sx={{ textAlign: 'center' }}>
                {produto.id.toString().padStart(4, '0')}
              </Celula>
              <Celula sx={{ textAlign: 'center' }}>
                <Chip
                  label={produto.ativo ? 'Ativo' : 'Inativo'}
                  color={produto.ativo ? 'success' : 'error'}
                  size="small"
                  sx={{ 
                    fontWeight: 'bold',
                    minWidth: '80px'
                  }}
                />
              </Celula>
              <Celula sx={{ textAlign: 'center' }}>
                <Botao
                  variant="contained"
                  startIcon={<Editar />}
                  onClick={() => editarProduto(produto)}
                  sx={{
                    backgroundColor: '#FF9D00',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    minWidth: '90px',
                    '&:hover': { backgroundColor: '#e68a00' }
                  }}
                >
                  Editar
                </Botao>
              </Celula>
            </Linha>
          ))}
        </CorpoTabela>
      </Tabela>
    </ContainerTabela>
  );
};

export default ProdutoEstoque;