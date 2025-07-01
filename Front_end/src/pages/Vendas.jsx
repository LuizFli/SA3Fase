import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  InputAdornment,
  IconButton,
  Grid,
  Avatar,
  Modal,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import {
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
import axios from 'axios';
import PageContainer from '../components/PageContainer';
import CadastroDeVenda from '../components/CadastroDeVenda';
import { getVendas, deletarVenda } from '../api/vendasApi';
import { atualizarStatusProduto } from '../api/produtosApi';
import { useGlobal } from '../contexts/GlobalProvider';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

function Vendas() {
  const { user } = useAuth();

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

  // Estados para dados e carregamento
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para filtros (valores em edição)
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);

  // Estados para filtros aplicados
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [appliedStartDate, setAppliedStartDate] = useState(null);
  const [appliedEndDate, setAppliedEndDate] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { produtos, setProdutos } = useGlobal();

  // Estado para snackbar (feedback)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Buscar vendas quando os filtros aplicados mudam
  useEffect(() => {
    const fetchVendas = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        
        if (appliedSearchTerm) params.searchTerm = appliedSearchTerm;
        
        // Formatar datas corretamente
        if (appliedStartDate) {
          params.startDate = format(appliedStartDate, 'yyyy-MM-dd');
        }
        
        if (appliedEndDate) {
          params.endDate = format(appliedEndDate, 'yyyy-MM-dd');
        }
        
        // Enviar como string
        params.apenasAtivos = 'false';
        
        const vendasData = await getVendas(params);
        
        setVendas(vendasData);
      } catch (err) {
        console.error('Erro ao carregar vendas:', err);
        setError(err.message || 'Erro ao carregar vendas');
        setVendas([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVendas();
  }, [appliedSearchTerm, appliedStartDate, appliedEndDate]);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/produtos', {
        params: { status: 'disponivel' }
      });

      setProdutos(response.data.produtos || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProdutos([]);
    }
  };

  useEffect(() => {
    fetchProdutos();
    console.log('Produtos atualizados:', produtos);
  }, []);

  const handleDeletarVenda = async (idVenda, idProduto) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir esta venda?');
    if (!confirmacao) return;

    try {
      await deletarVenda(idVenda);

      try {
        await atualizarStatusProduto(idProduto, 'ativo');
      } catch (updateError) {
        console.warn('Erro ao atualizar produto, mas a venda foi excluída:', updateError);
      }

      setVendas(prev => prev.filter(v => v.id !== idVenda));

      setSnackbar({
        open: true,
        message: 'Venda excluída com sucesso!',
        severity: 'success'
      });

    } catch (err) {
      console.error('Erro ao excluir venda:', err);
      setSnackbar({
        open: true,
        message: `Erro ao excluir venda: ${err.message}`,
        severity: 'error'
      });
    }
  };

  const handleApplyFilters = () => {
    setAppliedSearchTerm(tempSearchTerm);
    setAppliedStartDate(tempStartDate);
    setAppliedEndDate(tempEndDate);
  };

  const handleResetFilters = () => {
    setTempSearchTerm('');
    setTempStartDate(null);
    setTempEndDate(null);
    setAppliedSearchTerm('');
    setAppliedStartDate(null);
    setAppliedEndDate(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleVendaCadastrada = (novaVenda) => {
    setSnackbar({
      open: true,
      message: `Venda do veículo ${novaVenda.produto} cadastrada com sucesso!`,
      severity: 'success'
    });

    setVendas(prev => [{
      ...novaVenda,
      id_produto: novaVenda.id_produto,
      produto: novaVenda.produto,
      valor: novaVenda.valor,
      data: novaVenda.data,
      nome_vendedor: novaVenda.nome_vendedor,
      auth_code: novaVenda.auth_code
    }, ...prev]);

    handleCloseModal();
  };

  return (
    <PageContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Box sx={{ padding: '20px', minHeight: '100vh', boxSizing: 'border-box' }}>
          {/* Cabeçalho */}
          <Paper
            elevation={3}
            sx={{
              padding: '15px 20px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '10px',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#333',
                fontSize: '1.8rem',
              }}
            >
              Vendas
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Avatar alt={user?.name || "Usuário"} src={user?.avatar || "/Imagens/Adm.png"} sx={{ width: 45, height: 45 }} />
            </Box>
          </Paper>

          {/* Barra de busca e filtros */}
          <Paper
            elevation={2}
            sx={{
              padding: '15px',
              marginBottom: '20px',
              borderRadius: '10px',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  placeholder="Buscar"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={tempSearchTerm}
                  onChange={(e) => setTempSearchTerm(e.target.value)}
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

          {/* Mensagem de erro */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Tabela de vendas */}
          <Paper elevation={2} sx={{
            width: '100%',
            overflow: 'auto',
            borderRadius: '10px',
            maxHeight: '70vh' // Limita a altura da tabela
          }}>
            <TableContainer sx={{
              maxHeight: '100%', // Remove conflito de altura
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
            }}>
              <Table sx={{ minWidth: 650 }} stickyHeader>
                <TableHead>
                  <TableRow sx={{ 
                    backgroundColor: '#e65f2b !important',
                    '& .MuiTableCell-head': {
                      backgroundColor: '#e65f2b !important',
                      color: '#fff !important'
                    }
                  }}>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      textAlign: 'center', 
                      color: '#fff !important',
                      backgroundColor: '#e65f2b !important'
                    }}>ID Produto</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      textAlign: 'center', 
                      color: '#fff !important',
                      backgroundColor: '#e65f2b !important'
                    }}>Produto</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      textAlign: 'center', 
                      color: '#fff !important',
                      backgroundColor: '#e65f2b !important'
                    }}>Valor</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      textAlign: 'center', 
                      color: '#fff !important',
                      backgroundColor: '#e65f2b !important'
                    }}>Data</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      textAlign: 'center', 
                      color: '#fff !important',
                      backgroundColor: '#e65f2b !important'
                    }}>Vendedor</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      textAlign: 'center', 
                      color: '#fff !important',
                      backgroundColor: '#e65f2b !important'
                    }}>Auth Code</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      textAlign: 'center', 
                      color: '#fff !important',
                      backgroundColor: '#e65f2b !important'
                    }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : vendas.length > 0 ? (
                    vendas.map((venda) => (
                      <TableRow 
                        key={`${venda.id_produto}-${venda.data}-${venda.auth_code}`} 
                        sx={{ 
                          '&:hover': { backgroundColor: '#f9f9f9' }
                        }}
                      >
                        <TableCell sx={{ textAlign: 'center' }}>
                          {venda.id_produto.toString().padStart(4, '0')}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{venda.produto}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {Number(venda.valor).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {new Date(venda.data).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{venda.nome_vendedor}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{venda.auth_code}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDeletarVenda(venda.id, venda.id_produto)}
                            sx={{
                              fontWeight: 'bold',
                              padding: '6px 12px',
                              fontSize: '0.8rem',
                              minWidth: '90px'
                            }}
                          >
                            Excluir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        {error || 'Nenhuma venda encontrada'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
              onClick={handleOpenModal}
              sx={{
                fontWeight: 'bold',
                padding: '12px 30px',
                borderRadius: '8px',
                fontSize: '1rem',
                minWidth: '200px'
              }}
            >
              Cadastrar Venda
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>

      {/* Modal de Cadastro de Venda */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CadastroDeVenda
          onClose={handleCloseModal}
          onVendaCadastrada={handleVendaCadastrada}
        />
      </Modal>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}

export default Vendas;