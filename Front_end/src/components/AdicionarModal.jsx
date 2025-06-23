import React from 'react';
import {
  Modal,
  Paper as Painel,
  Typography as Texto,
  Grid,
  FormControl,
  TextField as CampoTexto,
  InputLabel,
  Select,
  MenuItem,
  Box as Container,
  Button as Botao
} from '@mui/material';

const coresDisponiveis = [
  'Preto',
  'Branco',
  'Prata',
  'Vermelho',
  'Azul',
  'Cinza',
  'Verde'
];

const AdicionarModal = ({ open, onClose, onSubmit, currentProduto, setCurrentProduto }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoProduto = {
      ...currentProduto,
      km: Number(currentProduto.km),
      ano: Number(currentProduto.ano)
    };
    onSubmit(novoProduto);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
        
        <form onSubmit={handleSubmit}>
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
              onClick={onClose}
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
  );
};

export default AdicionarModal;