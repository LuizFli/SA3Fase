import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useGlobal } from '../contexts/GlobalProvider';

function CadastroDeVenda({ onClose }) {
  const { produtos = [], vendas, setVendas, funcionarios = [] } = useGlobal();

  const [formData, setFormData] = useState({
    id_produto: '',
    veiculo: '',
    valor: '',
    data: dayjs(),
    identificador_vendedor: '',
    auth_code: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    if (name === 'id_produto') {
      const veiculoSelecionado = produtos.find((p) => p.id === Number(value));
      if (veiculoSelecionado) {
        setFormData((prev) => ({
          ...prev,
          veiculo: `${veiculoSelecionado.marca} ${veiculoSelecionado.modelo}`,
          valor: veiculoSelecionado.valor || 0,
        }));
      }
    }
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      data: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação e lógica de cadastro de venda
    // (mesma lógica do CadastroVenda.jsx)
  };

  return (
    <Paper
      sx={{
        width: '80%',
        maxWidth: '800px',
        padding: '30px',
        borderRadius: '10px',
        outline: 'none',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          fontSize: '1.8rem',
          mb: 3,
        }}
      >
        Cadastrar Nova Venda
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Veículo"
              name="id_produto"
              value={formData.id_produto}
              onChange={handleChange}
              fullWidth
              error={!!errors.id_produto}
              helperText={errors.id_produto}
            >
              <MenuItem value="">
                <em>Selecione um veículo</em>
              </MenuItem>
              {produtos.map((veiculo) => (
                <MenuItem key={veiculo.id} value={veiculo.id}>
                  {veiculo.marca} {veiculo.modelo} - {veiculo.ano} ({veiculo.placa})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Veículo Selecionado"
              name="veiculo"
              value={formData.veiculo}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Valor (R$)"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data da Venda"
                value={formData.data}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Identificador do Vendedor"
              name="identificador_vendedor"
              value={formData.identificador_vendedor}
              onChange={handleChange}
              error={!!errors.identificador_vendedor}
              helperText={errors.identificador_vendedor}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Código de Autorização"
              name="auth_code"
              value={formData.auth_code}
              onChange={handleChange}
              error={!!errors.auth_code}
              helperText={errors.auth_code}
              fullWidth
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              px: 4,
              py: 1,
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              px: 4,
              py: 1,
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
          >
            Cadastrar Venda
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default CadastroDeVenda;