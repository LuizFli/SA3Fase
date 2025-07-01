import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Avatar,
  Snackbar,
  Alert,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  DateRange as DateRangeIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import PageContainer from '../components/PageContainer';
import ProdutoEstoque from '../components/ProdutoEstoque';
import AdicionarModal from '../components/AdicionarModal';
import EditarModal from '../components/EditarModal';
import { getProdutos, cadastrarProduto, atualizarProduto, excluirProduto } from '../api/produtosApi';
import { useGlobal } from '../contexts/GlobalProvider';

function EstoqueProdutos() {
  const { user } = useAuth();
  const {produtos, setProdutos} = useGlobal([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Estados para filtros (valores em edição)
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const [tempIdSearch, setTempIdSearch] = useState('');
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);

  // Estados para filtros aplicados
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [appliedIdSearch, setAppliedIdSearch] = useState('');
  const [appliedStartDate, setAppliedStartDate] = useState(null);
  const [appliedEndDate, setAppliedEndDate] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
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
      const params = {};
      
      if (appliedSearchTerm) params.searchTerm = appliedSearchTerm;
      if (appliedIdSearch) params.id = appliedIdSearch;
      
      // Formatar datas corretamente igual ao de vendas
      if (appliedStartDate) {
        params.startDate = format(appliedStartDate, 'yyyy-MM-dd');
      }
      
      if (appliedEndDate) {
        params.endDate = format(appliedEndDate, 'yyyy-MM-dd');
      }

      const data = await getProdutos(params);
      
      if (data && Array.isArray(data.produtos)) {
        setProdutos(data.produtos.map(p => ({ ...p, status: 'ativo' })));
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
  }, [appliedSearchTerm, appliedIdSearch, appliedStartDate, appliedEndDate, setProdutos]);

  // Efeito para carregar produtos quando os filtros aplicados mudam
  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

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

  const handleApplyFilters = () => {
    setAppliedSearchTerm(tempSearchTerm);
    setAppliedIdSearch(tempIdSearch);
    setAppliedStartDate(tempStartDate);
    setAppliedEndDate(tempEndDate);
  };

  const handleResetFilters = () => {
    setTempSearchTerm('');
    setTempIdSearch('');
    setTempStartDate(null);
    setTempEndDate(null);
    setAppliedSearchTerm('');
    setAppliedIdSearch('');
    setAppliedStartDate(null);
    setAppliedEndDate(null);
  };

  // Função para adicionar um novo produto usando a API
  const handleAddSubmit = async (produto) => {
    try {
      await cadastrarProduto(produto);

      setSnackbarMessage('Produto adicionado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseModal();
      fetchProdutos();
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
      await atualizarProduto(produtoAtualizado.id, produtoAtualizado);

      setSnackbarMessage('Produto atualizado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseModal();
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setSnackbarMessage(error.message || 'Erro ao atualizar produto.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // Proteção caso o contexto ainda não esteja carregado
  if (!user) {
    return (
      <PageContainer>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '50vh'
        }}>
          <Typography variant="h6">Carregando...</Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Box sx={{ padding: '20px', minHeight: '100vh', boxSizing: 'border-box' }}>
          {/* Cabeçalho */}
          <Paper elevation={3} sx={{
            padding: '15px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '10px'
          }}>
            <Typography variant="h4" sx={{
              fontWeight: 'bold',
              color: '#333',
              fontSize: '1.8rem'
            }}>
              Estoque de Produtos
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Avatar
                alt={user?.name || "Usuário"}
                src={user?.avatar || "/Imagens/Adm.png"}
                sx={{ width: 45, height: 45 }}
              />
            </Box>
          </Paper>

          {/* Barra de busca e filtros */}
          <Paper elevation={2} sx={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '10px'
          }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  placeholder="Buscar geral"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={tempSearchTerm}
                  onChange={(e) => {
                    setTempSearchTerm(e.target.value);
                    setTempIdSearch('');
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: tempSearchTerm && (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setTempSearchTerm('')}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ maxWidth: '400px' }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Ocultar Filtros' : 'Mais Filtros'}
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<ClearIcon />}
                  onClick={handleResetFilters}
                >
                  Limpar Filtros
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<CheckIcon />}
                  onClick={handleApplyFilters}
                >
                  Aplicar
                </Button>
              </Grid>
            </Grid>

            {/* Filtros avançados */}
            {showFilters && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      placeholder="Buscar por ID"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={tempIdSearch}
                      onChange={(e) => {
                        setTempIdSearch(e.target.value);
                        setTempSearchTerm('');
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                      label="Data inicial"
                      value={tempStartDate}
                      onChange={(newValue) => setTempStartDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                      inputFormat="dd/MM/yyyy"
                      components={{
                        OpenPickerIcon: DateRangeIcon,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                      label="Data final"
                      value={tempEndDate}
                      onChange={(newValue) => setTempEndDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                      inputFormat="dd/MM/yyyy"
                      components={{
                        OpenPickerIcon: DateRangeIcon,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>

          {/* Tabela de produtos */}
          <Paper elevation={2} sx={{
            width: '100%',
            overflow: 'auto',
            borderRadius: '10px',
            maxHeight: '70vh' // Limita a altura da tabela
          }}>
            <ProdutoEstoque
              produtos={produtos}
              editarProduto={handleOpenEditModal}
            />
          </Paper>

          {/* Botão adicional abaixo da tabela */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '20px' 
          }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenAddModal}
              sx={{
                fontWeight: 'bold',
                padding: '12px 30px',
                borderRadius: '8px',
                fontSize: '1rem',
                minWidth: '200px'
              }}
            >
              Adicionar Produto
            </Button>
          </Box>

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
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </LocalizationProvider>
    </PageContainer>
  );
}

export default EstoqueProdutos;