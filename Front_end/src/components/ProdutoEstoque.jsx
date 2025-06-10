import React, { useState } from 'react';
import {
  Table as Tabela,
  TableBody as CorpoTabela,
  TableCell as Celula,
  TableContainer as ContainerTabela,
  TableHead as CabecalhoTabela,
  TableRow as Linha,
  Button as Botao,
  Box as Container,
  Modal,
  Typography,
  Paper
} from '@mui/material';
import { Delete as Excluir, Edit as Editar } from '@mui/icons-material';

const ProdutoEstoque = ({ produtos, apagarProduto, editarProduto }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);

  const handleOpenConfirmModal = (id) => {
    setProdutoToDelete(id);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setProdutoToDelete(null);
  };

  const handleConfirmDelete = () => {
    apagarProduto(produtoToDelete);
    handleCloseConfirmModal();
  };

  return (
    <>
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
                <Celula sx={{ textAlign: 'center' }}>{produto.id.toString().padStart(4, '0')}</Celula>
                <Celula sx={{ textAlign: 'center' }}>
                  <Container sx={{ 
                    display: 'flex', 
                    gap: '8px',
                    justifyContent: 'center'
                  }}>
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
                    
                    <Botao
                      variant="contained"
                      startIcon={<Excluir />}
                      onClick={() => handleOpenConfirmModal(produto.id)}
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

      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{
          width: '400px',
          padding: '20px',
          borderRadius: '10px',
          outline: 'none'
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Confirmar Exclusão
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Tem certeza que deseja apagar este produto? Esta ação não pode ser desfeita.
          </Typography>
          <Container sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 2
          }}>
            <Botao
              variant="outlined"
              onClick={handleCloseConfirmModal}
              sx={{
                px: 3,
                py: 1,
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
            >
              Cancelar
            </Botao>
            <Botao
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
              sx={{
                px: 3,
                py: 1,
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
            >
              Confirmar
            </Botao>
          </Container>
        </Paper>
      </Modal>
    </>
  );
};

export default ProdutoEstoque;