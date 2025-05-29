import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  Grid,
  Button,
  Stack
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  DateRange as DateRangeIcon 
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import NavBar from '../components/NavBar';

function HistoricoVendas() {
  const theme = useTheme();
  const [vendas, setVendas] = useState([
    {
      id_produto: 1,
      produto: 'Notebook Pro',
      valor: 4599.99,
      data: '2023-10-01',
      matricula_vendedor: 'V00123',
      auth_code: 'A1B2C3D4'
    },
    {
      id_produto: 2,
      produto: 'Smartphone Plus',
      valor: 2299.50,
      data: '2023-10-15',
      matricula_vendedor: 'V00245',
      auth_code: 'E5F6G7H8'
    },
    // Adicione mais dados de exemplo...
  ]);
  
  // Estados para paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('todos');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Manipuladores de eventos
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterField('todos');
    setStartDate(null);
    setEndDate(null);
  };

  // Filtragem dos dados
  const filteredVendas = vendas.filter(venda => {
    // Filtro por termo de busca
    const matchesSearch = filterField === 'todos'
      ? Object.values(venda).some(
          value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      : venda[filterField].toString().toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por período
    const saleDate = new Date(venda.data);
    const matchesDate = (!startDate || saleDate >= new Date(startDate)) && 
                       (!endDate || saleDate <= new Date(endDate));
    
    return matchesSearch && matchesDate;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={{ 
        width: '100vw', 
        minHeight: '100vh', 
        display: 'flex', 
        backgroundColor: '#EBDFD7' 
      }}>
        <Box sx={{ minWidth:'0%', backgroundColor:'black'}}>
          <NavBar/>
        </Box>

        <Box sx={{ 
          width: '80%', 
          p: 3,
          display: 'flex', 
          flexDirection: 'column'
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#133337', 
              mb: 3,
              fontWeight: 'bold'
            }}
          >
            Histórico de Vendas
          </Typography>

          <Paper sx={{ mb: 2, p: 2 }}>
            {/* Barra de pesquisa principal */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Pesquisar"
                  variant="outlined"
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
                    )
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Filtrar por</InputLabel>
                  <Select
                    value={filterField}
                    label="Filtrar por"
                    onChange={(e) => setFilterField(e.target.value)}
                  >
                    <MenuItem value="todos">Todos os campos</MenuItem>
                    <MenuItem value="id_produto">ID Produto</MenuItem>
                    <MenuItem value="produto">Produto</MenuItem>
                    <MenuItem value="matricula_vendedor">Vendedor</MenuItem>
                    <MenuItem value="auth_code">Auth Code</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Ocultar Filtros' : 'Mais Filtros'}
                </Button>
              </Grid>
              
              <Grid item xs={12} md={2}>
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

            {/* Filtros avançados (mostrar/ocultar) */}
            {showFilters && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Filtros Avançados
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                      label="Data inicial"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                      inputFormat="dd/MM/yyyy"
                      components={{
                        OpenPickerIcon: DateRangeIcon
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
                        OpenPickerIcon: DateRangeIcon
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Valor mínimo"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Valor máximo"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Tabela de resultados */}
            <TableContainer sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    backgroundColor: theme.palette.primary.main,
                    '& th': { 
                      color: theme.palette.common.white,
                      fontSize: '1rem'
                    }
                  }}>
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
                        <TableRow 
                          key={venda.id_produto}
                          hover
                        >
                          <TableCell>{venda.id_produto}</TableCell>
                          <TableCell>{venda.produto}</TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(venda.valor)}
                          </TableCell>
                          <TableCell>
                            {new Date(venda.data).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>{venda.matricula_vendedor}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>
                            {venda.auth_code}
                          </TableCell>
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
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </Paper>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default HistoricoVendas;