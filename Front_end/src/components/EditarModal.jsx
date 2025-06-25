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
  'Verde',
  'Amarelo',
  'Roxo',
  'Laranja'
];

const formatKm = (value) => {
  if (value === 0 || value === '0') return '0';
  if (!value) return '';
  const cleanValue = value.toString().replace(/\D/g, '');
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const formatMoney = (value) => {
  if (value === 0 || value === '0') return '0,00';
  if (!value) return '';
  let cleanValue = value.toString().replace(/[^\d,]/g, '');
  const parts = cleanValue.split(',');
  if (parts.length > 2) {
    cleanValue = parts[0] + ',' + parts.slice(1).join('');
  }
  cleanValue = cleanValue.replace(/\./g, '');
  const [integerPart, decimalPart] = cleanValue.split(',');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (decimalPart !== undefined) {
    const limitedDecimalPart = decimalPart.slice(0, 2);
    return `${formattedIntegerPart},${limitedDecimalPart}`;
  }
  return formattedIntegerPart;
};

const EditarModal = ({ open, onClose, onSubmit, currentProduto, setCurrentProduto }) => {
  React.useEffect(() => {
    if (open && currentProduto) {
      setCurrentProduto(prev => ({
        ...prev,
        km: formatKm(prev.km),
        valor: formatMoney(prev.valor)
      }));
    }
  }, [open, currentProduto?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'km') {
      const formatted = formatKm(value);
      setCurrentProduto(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else if (name === 'valor') {
      const formatted = formatMoney(value);
      setCurrentProduto(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setCurrentProduto(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const produtoAtualizado = {
      ...currentProduto,
      km: Number(currentProduto.km.toString().replace(/\./g, '')),
      ano: Number(currentProduto.ano),
      valor: Number(currentProduto.valor.toString().replace(/\./g, '').replace(',', '.'))
    };
    onSubmit(produtoAtualizado);
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
          Editar Produto
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

          <FormControl fullWidth sx={{ mb: 3 }}>
            <CampoTexto
              label="Valor (R$)"
              name="valor"
              value={currentProduto.valor}
              onChange={handleInputChange}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: 'R$',
                sx: { borderRadius: '8px' }
              }}
            />
          </FormControl>

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
              Salvar Alterações
            </Botao>
          </Container>
        </form>
      </Painel>
    </Modal>
  );
};

export default EditarModal;