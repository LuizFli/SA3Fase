import React from 'react';
import {
  Table as Tabela,
  TableBody as CorpoTabela,
  TableCell as Celula,
  TableContainer as ContainerTabela,
  TableHead as CabecalhoTabela,
  TableRow as Linha,
  Button as Botao,
  Box as Container
} from '@mui/material';
import { Delete as Excluir, Edit as Editar } from '@mui/icons-material';

const ProdutoEstoque = ({ produtos, apagarProduto }) => {
  return (
    <ContainerTabela>
      <Tabela sx={{ minWidth: 650 }}>
        <CabecalhoTabela>
          <Linha sx={{ backgroundColor: '#e0e0e0' }}>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Marca</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Modelo</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Ano</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Cor</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Km</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Placa</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>ID</Celula>
            <Celula sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Ações</Celula>
          </Linha>
        </CabecalhoTabela>
        <CorpoTabela>
          {produtos.map((produto) => (
            <Linha 
              key={produto.id}
              sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
            >
              <Celula sx={{ textAlign: 'center' }}>{produto.marca}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.modelo}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.ano}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.cor}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.km.toLocaleString('pt-BR')}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.placa}</Celula>
              <Celula sx={{ textAlign: 'center' }}>{produto.id}</Celula>
              <Celula sx={{ textAlign: 'center' }}>
                <Container sx={{ 
                  display: 'flex', 
                  gap: '8px',
                  justifyContent: 'center'
                }}>
                  <Botao
                    variant="contained"
                    startIcon={<Editar />}
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
                  
                  <Botao
                    variant="contained"
                    startIcon={<Excluir />}
                    onClick={() => apagarProduto(produto.id)}
                    sx={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      minWidth: '90px',
                      '&:hover': { backgroundColor: '#d32f2f' }
                    }}
                  >
                    Apagar
                  </Botao>
                </Container>
              </Celula>
            </Linha>
          ))}
        </CorpoTabela>
      </Tabela>
    </ContainerTabela>
  );
};

export default ProdutoEstoque;