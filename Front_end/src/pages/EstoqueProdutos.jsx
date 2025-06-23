import React, { useState } from 'react';
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
import { useGlobal } from '../contexts/GlobalProvider';
import ProdutoEstoque from '../components/ProdutoEstoque';
import AdicionarModal from '../components/AdicionarModal';
import EditarModal from '../components/EditarModal';

function EstoqueProdutos() {
  const { produtos, setProdutos } = useGlobal();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [buscaId, setBuscaId] = useState('');
  const [currentProduto, setCurrentProduto] = useState({
    id: '',
    marca: '',
    modelo: '',
    ano: '',
    km: '',
    placa: '',
    cor: ''
  });

  // Função para filtrar produtos
  const produtosFiltrados = produtos.filter(produto => {
    if (buscaId) {
      return produto.id.toString().includes(buscaId);
    }
    
    const termo = termoBusca.toLowerCase();
    return (
      produto.marca.toLowerCase().includes(termo) ||
      produto.modelo.toLowerCase().includes(termo) ||
      produto.ano.toString().includes(termo) ||
      produto.cor.toLowerCase().includes(termo) ||
      produto.km.toString().includes(termo) ||
      produto.placa.toLowerCase().includes(termo) ||
      produto.id.toString().includes(termo)
    );
  });

  const apagarProduto = (id) => {
    const novosProdutos = produtos.filter(produto => produto.id !== id);
    setProdutos(novosProdutos);
    setSnackbarMessage('Produto removido com sucesso!');
    setOpenSnackbar(true);
  };

  const handleOpenAddModal = () => {
    setCurrentProduto({
      marca: '',
      modelo: '',
      ano: '',
      km: '',
      placa: '',
      id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
      cor: ''
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

  const handleAddSubmit = (produto) => {
    setProdutos([...produtos, produto]);
    setSnackbarMessage('Produto adicionado com sucesso!');
    setOpenSnackbar(true);
    handleCloseModal();
  };

  const handleEditSubmit = (produtoAtualizado) => {
    const novosProdutos = produtos.map(produto => 
      produto.id === produtoAtualizado.id ? produtoAtualizado : produto
    );
    setProdutos(novosProdutos);
    setSnackbarMessage('Produto atualizado com sucesso!');
    setOpenSnackbar(true);
    handleCloseModal();
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
                setBuscaId('');
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
                setTermoBusca('');
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
            produtos={termoBusca || buscaId ? produtosFiltrados : produtos} 
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
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </PageContainer>
  );
}

export default EstoqueProdutos;