import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField, 
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Badge,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Add, Search, Circle } from '@mui/icons-material';
import PageContainer from '../components/PageContainer';
import React from 'react';
import { useGlobal } from '../contexts/GlobalProvider';

// Dados mockados para os produtos


function EstoqueProdutos() {
  const {produtos , setProdutos} = useGlobal()
  return (
    <PageContainer>
      <Box sx={{
        width: '100%',
        height: '100%',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5'
      }}>
        {/* Header */}
        <Paper elevation={3} sx={{
          p: 3,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h4" component="h2" sx={{
            fontWeight: 'bold',
            color: 'primary.main'
          }}>
            Estoque de Produtos
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Status online */}
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Circle sx={{ color: '#4caf50', fontSize: '0.8rem' }} />
              }
            >
              <Avatar 
                alt="User Avatar" 
                src="/static/images/avatar/1.jpg" 
                sx={{ width: 40, height: 40 }}
              />
            </Badge>
            
            {/* Botão Adicionar Produto */}
            <Button
              variant="contained"
              color="success"
              startIcon={<Add />}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3
              }}
            >
              Adicionar Produto
            </Button>
          </Box>
        </Paper>

        {/* Área de Filtros e Busca */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Barra de busca */}
            <TextField
              placeholder="Buscar"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                flexGrow: 1,
                maxWidth: 400,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px'
                }
              }}
            />
            
            {/* Filtro dropdown */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Ordenar por</InputLabel>
              <Select
                label="Ordenar por"
                defaultValue="recentes"
              >
                <MenuItem value="recentes">Mais recentes</MenuItem>
                <MenuItem value="antigos">Mais antigos</MenuItem>
                <MenuItem value="marca">Marca (A-Z)</MenuItem>
                <MenuItem value="ano">Ano (mais novo)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* Tabela de Produtos */}
        <Paper elevation={2} sx={{
          flex: 1,
          overflow: 'auto'
        }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Marca</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Modelo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ano</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Cor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Km</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Placa</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produtos.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.marca}</TableCell>
                    <TableCell>{product.modelo}</TableCell>
                    <TableCell>{product.ano}</TableCell>
                    <TableCell>{product.cor}</TableCell>
                    <TableCell>{product.km.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>{product.placa}</TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#FF9D00',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#e68a00'
                          },
                          textTransform: 'none',
                          fontWeight: 'bold'
                        }}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </PageContainer>
  );
}

export default EstoqueProdutos;