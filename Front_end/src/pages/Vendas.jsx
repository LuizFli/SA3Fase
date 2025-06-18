import React, { useState } from 'react';
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
  TablePagination,
  InputAdornment,
  IconButton,
  Grid,
  Avatar,
  Modal,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import PageContainer from '../components/PageContainer';
import CadastroDeVenda from '../components/CadastroDeVenda';
import { useGlobal } from '../contexts/GlobalProvider';

function Vendas() {
  const { vendas } = useGlobal();

  // Estados para paginação e filtros
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Filtragem dos dados
  const filteredVendas = vendas.filter((venda) => {
    const matchesSearch = Object.values(venda).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const saleDate = new Date(venda.data);
    const matchesDate =
      (!startDate || saleDate >= new Date(startDate)) &&
      (!endDate || saleDate <= new Date(endDate));

    return matchesSearch && matchesDate;
  });

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
              <Button
                variant="contained"
                color="success"
                onClick={handleOpenModal}
                sx={{
                  fontWeight: 'bold',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                }}
              >
                Cadastrar Venda
              </Button>
              <Avatar alt="Usuário" src="/static/images/avatar/1.jpg" sx={{ width: 45, height: 45 }} />
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setSearchTerm('')}>
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
            </Grid>

            {/* Filtros avançados */}
            {showFilters && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                      label="Data inicial"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
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
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
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

          {/* Tabela de vendas */}
          <Paper
            elevation={2}
            sx={{
              width: '100%',
              overflow: 'auto',
              borderRadius: '10px',
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: '#e65f2b',
                      '& th': {
                        color: '#fff',
                        fontSize: '1rem',
                      },
                    }}
                  >
                    <TableCell>ID Produto</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell align="right">Valor</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Vendedor</TableCell>
                    <TableCell>Auth Code</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVendas.length > 0 ? (
                    filteredVendas
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((venda) => (
                        <TableRow key={venda.id_produto} hover>
                          <TableCell>{venda.id_produto}</TableCell>
                          <TableCell>{venda.produto}</TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(venda.valor)}
                          </TableCell>
                          <TableCell>
                            {new Date(venda.data).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>{venda.matricula_vendedor}</TableCell>
                          <TableCell>{venda.auth_code}</TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Nenhum resultado encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredVendas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Itens por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
            />
          </Paper>
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
        <CadastroDeVenda onClose={handleCloseModal} />
      </Modal>
    </PageContainer>
  );
}

export default Vendas;