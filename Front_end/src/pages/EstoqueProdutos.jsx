import React, { useState, useEffect, useCallback } from 'react';
import {
  Box as Container,
  Typography as Texto,
  Paper as Painel,
  Button as Botao,
  TextField as CampoTexto,
  Avatar as Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import { Add as Adicionar, Search as Buscar } from '@mui/icons-material';
import PageContainer from '../components/PageContainer';
import ProdutoEstoque from '../components/ProdutoEstoque';
import AdicionarModal from '../components/AdicionarModal';
import EditarModal from '../components/EditarModal';

// Importa as funções da sua API de produtos
import { getProdutos, cadastrarProduto, atualizarProduto, excluirProduto } from '../api/produtosApi';

function EstoqueProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [termoBusca, setTermoBusca] = useState('');
  const [buscaId, setBuscaId] = useState('');
  const [currentProduto, setCurrentProduto] = useState({
    id: '',
    marca: '',
    modelo: '',
    ano: '',
    km: '',
    placa: '',
    cor: '',
    valor: ''
  });

  // Função para buscar produtos do backend usando a API
  const fetchProdutos = useCallback(async () => {
    try {
      const data = await getProdutos({ searchTerm: termoBusca, id: buscaId });
      // Garante que 'produtos' é sempre um array
      if (data && Array.isArray(data.produtos)) {
        setProdutos(data.produtos);
      } else {
        console.warn("A API retornou uma estrutura de dados inesperada ou 'produtos' não é um array:", data);
        setProdutos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setSnackbarMessage(error.message || 'Erro ao carregar produtos.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [termoBusca, buscaId]);

  // Efeito para carregar produtos quando o componente monta e quando os termos de busca mudam
  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  // Função para apagar um produto usando a API
  const apagarProduto = async (id) => {
    try {
      await excluirProduto(id); // Chama a função de exclusão da API

      setSnackbarMessage('Produto removido com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      fetchProdutos(); // Recarrega a lista de produtos após a exclusão
    } catch (error) {
      console.error("Erro ao apagar produto:", error);
      setSnackbarMessage(error.message || 'Erro ao remover produto.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleOpenAddModal = () => {
    setCurrentProduto({
      marca: '',
      modelo: '',
      ano: '',
      km: '',
      placa: '',
      cor: '',
      valor: ''
    });
    setOpenAddModal(true);
  };

  const handleOpenEditModal = (produto) => {
    setCurrentProduto(produto);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Função para adicionar um novo produto usando a API
  const handleAddSubmit = async (produto) => {
    try {
      await cadastrarProduto(produto); // Chama a função de cadastro da API

      setSnackbarMessage('Produto adicionado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseModal();
      fetchProdutos(); // Recarrega a lista de produtos após a adição
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      setSnackbarMessage(error.message || 'Erro ao adicionar produto.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // Função para editar um produto existente usando a API
  const handleEditSubmit = async (produtoAtualizado) => {
    try {
      await atualizarProduto(produtoAtualizado.id, produtoAtualizado); // Chama a função de atualização da API

      setSnackbarMessage('Produto atualizado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseModal();
      fetchProdutos(); // Recarrega a lista de produtos após a edição
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setSnackbarMessage(error.message || 'Erro ao atualizar produto.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <PageContainer>
      <Container sx={{
        padding: '20px',
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}>
        {/* Cabeçalho */}
        <Painel elevation={3} sx={{
          padding: '15px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px'
        }}>
          <Texto variant="h4" sx={{
            fontWeight: 'bold',
            color: '#333',
            fontSize: '1.8rem'
          }}>
            Estoque de Produtos
          </Texto>

          <Container sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Botao
              variant="contained"
              color="success"
              sx={{
                fontWeight: 'bold',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
              onClick={handleOpenAddModal}
            >
              Adicionar Produto
            </Botao>

            <Avatar
              alt="Usuário"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 45, height: 45 }}
            />
          </Container>
        </Painel>

        {/* Barra de busca */}
        <Painel elevation={2} sx={{
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '10px'
        }}>
          <Container sx={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <CampoTexto
              placeholder="Buscar geral"
              variant="outlined"
              size="small"
              value={termoBusca}
              onChange={(e) => {
                setTermoBusca(e.target.value);
                setBuscaId(''); // Limpa a busca por ID quando a busca geral é usada
              }}
              InputProps={{
                startAdornment: <Buscar />,
                sx: { borderRadius: '20px' }
              }}
              sx={{ width: '300px' }}
            />

            <CampoTexto
              placeholder="Buscar por ID"
              variant="outlined"
              size="small"
              value={buscaId}
              onChange={(e) => {
                setBuscaId(e.target.value);
                setTermoBusca(''); // Limpa a busca geral quando a busca por ID é usada
              }}
              InputProps={{
                startAdornment: <Buscar />,
                sx: { borderRadius: '20px' }
              }}
              sx={{ width: '250px' }}
            />
          </Container>
        </Painel>

        {/* Tabela de produtos */}
        <Painel elevation={2} sx={{
          width: '100%',
          overflow: 'auto',
          borderRadius: '10px'
        }}>
          <ProdutoEstoque
            produtos={produtos}
            apagarProduto={apagarProduto}
            editarProduto={handleOpenEditModal}
          />

        </Painel>

        {/* Modal de Adição */}
        <AdicionarModal
          open={openAddModal}
          onClose={handleCloseModal}
          onSubmit={handleAddSubmit}
          currentProduto={currentProduto}
          setCurrentProduto={setCurrentProduto}
        />

        {/* Modal de Edição */}
        <EditarModal
          open={openEditModal}
          onClose={handleCloseModal}
          onSubmit={handleEditSubmit}
          currentProduto={currentProduto}
          setCurrentProduto={setCurrentProduto}
        />

        {/* Snackbar para feedback */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </PageContainer>
  );
}

export default EstoqueProdutos;
