import React, { useState } from 'react';
import { 
  Box as Container, 
  Typography as Texto,
  Paper as Painel,
  Button as Botao,
  TextField as CampoTexto,
  Avatar as Avatar,
  Modal,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { Add as Adicionar, Search as Buscar, Edit as EditarIcon } from '@mui/icons-material';
import PageContainer from '../components/PageContainer';
import { useGlobal } from '../contexts/GlobalProvider';
import ProdutoEstoque from '../components/ProdutoEstoque';

function EstoqueProdutos() {
  const { produtos, setProdutos } = useGlobal();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [currentProduto, setCurrentProduto] = useState({
    id: '',
    marca: '',
    modelo: '',
    ano: '',
    km: '',
    placa: '',
    cor: ''
  });

  const coresDisponiveis = [
    'Preto',
    'Branco',
    'Prata',
    'Vermelho',
    'Azul',
    'Cinza',
    'Verde'
  ];

  // Função para filtrar produtos
  const produtosFiltrados = produtos.filter(produto => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const novoProduto = {
      ...currentProduto,
      km: Number(currentProduto.km),
      ano: Number(currentProduto.ano)
    };
    setProdutos([...produtos, novoProduto]);
    setSnackbarMessage('Produto adicionado com sucesso!');
    setOpenSnackbar(true);
    handleCloseModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const produtoAtualizado = {
      ...currentProduto,
      km: Number(currentProduto.km),
      ano: Number(currentProduto.ano)
    };
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
        backgroundColor: '#EBDFD7', 
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
            <Avatar 
              alt="Usuário" 
              src="/static/images/avatar/1.jpg" 
              sx={{ width: 45, height: 45 }} 
            />
            
            <Botao
              variant="contained"
              color="success"
              startIcon={<Adicionar />}
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
          </Container>
        </Painel>
        
        {/* Barra de busca */}
        <Painel elevation={2} sx={{ 
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '10px'
        }}>
          <Container sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <CampoTexto
              placeholder="Buscar"
              variant="outlined"
              size="small"
              fullWidth
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              InputProps={{
                startAdornment: <Buscar />,
                sx: { borderRadius: '20px' }
              }}
              sx={{ maxWidth: '400px' }}
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
            produtos={termoBusca ? produtosFiltrados : produtos} 
            apagarProduto={apagarProduto}
            editarProduto={handleOpenEditModal} 
          />
        </Painel>

        {/* Modal de Adição */}
        <Modal
          open={openAddModal}
          onClose={handleCloseModal}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Painel sx={{
            width: '80%',
            maxWidth: '800px',
            padding: '30px',
            borderRadius: '10px',
            outline: 'none'
          }}>
            <Texto variant="h4" sx={{ 
              fontWeight: 'bold', 
              color: '#333',
              fontSize: '1.8rem',
              mb: 3
            }}>
              Cadastrar Novo Produto
            </Texto>
            
            <form onSubmit={handleAddSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Marca"
                      name="marca"
                      value={currentProduto.marca}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Modelo"
                      name="modelo"
                      value={currentProduto.modelo}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Ano"
                      name="ano"
                      value={currentProduto.ano}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      type="number"
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Quilometragem (Km)"
                      name="km"
                      value={currentProduto.km}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      type="number"
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Placa"
                      name="placa"
                      value={currentProduto.placa}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Cor</InputLabel>
                    <Select
                      name="cor"
                      value={currentProduto.cor}
                      onChange={handleInputChange}
                      required
                      label="Cor"
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    >
                      {coresDisponiveis.map(cor => (
                        <MenuItem key={cor} value={cor}>{cor}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Container sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 2,
                mt: 3
              }}>
                <Botao
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Cancelar
                </Botao>
                <Botao
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Salvar Produto
                </Botao>
              </Container>
            </form>
          </Painel>
        </Modal>

        {/* Modal de Edição */}
        <Modal
          open={openEditModal}
          onClose={handleCloseModal}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Painel sx={{
            width: '80%',
            maxWidth: '800px',
            padding: '30px',
            borderRadius: '10px',
            outline: 'none'
          }}>
            <Texto variant="h4" sx={{ 
              fontWeight: 'bold', 
              color: '#333',
              fontSize: '1.8rem',
              mb: 3
            }}>
              Editar Produto
            </Texto>
            
            <form onSubmit={handleEditSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Marca"
                      name="marca"
                      value={currentProduto.marca}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Modelo"
                      name="modelo"
                      value={currentProduto.modelo}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Ano"
                      name="ano"
                      value={currentProduto.ano}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      type="number"
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Quilometragem (Km)"
                      name="km"
                      value={currentProduto.km}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      type="number"
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <CampoTexto
                      label="Placa"
                      name="placa"
                      value={currentProduto.placa}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Cor</InputLabel>
                    <Select
                      name="cor"
                      value={currentProduto.cor}
                      onChange={handleInputChange}
                      required
                      label="Cor"
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px'
                        }
                      }}
                    >
                      {coresDisponiveis.map(cor => (
                        <MenuItem key={cor} value={cor}>{cor}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Container sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 2,
                mt: 3
              }}>
                <Botao
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Cancelar
                </Botao>
                <Botao
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Salvar Alterações
                </Botao>
              </Container>
            </form>
          </Painel>
        </Modal>

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