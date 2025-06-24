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
  CircularProgress,
  Alert
} from '@mui/material';
import { Add } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useGlobal } from '../contexts/GlobalProvider';
import { cadastrarVenda } from '../api/vendasApi';

function CadastroDeVenda({ onClose, onVendaCadastrada }) {
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
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCurrencyChange = (event) => {
    let value = event.target.value;
    
    // Remove todos os caracteres não numéricos exceto vírgula e ponto
    value = value.replace(/[^\d,.-]/g, '');
    
    // Converte para formato numérico
    const numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
    
    // Atualiza o estado
    setFormData({
      ...formData,
      [event.target.name]: numericValue
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id_produto) newErrors.id_produto = 'Selecione um veículo';
    if (!formData.identificador_vendedor) newErrors.identificador_vendedor = 'Informe o vendedor';
    if (!formData.auth_code) newErrors.auth_code = 'Código de autorização é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length > 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    const hasErrors = validateForm();
    if (hasErrors) return;

    setLoading(true);

    try {
      const vendaData = {
        id_produto: Number(formData.id_produto),
        valor: Number(formData.valor),
        identificador_vendedor: formData.identificador_vendedor,
        auth_code: formData.auth_code || undefined
      };

      const novaVenda = await cadastrarVenda(vendaData);

      onClose();
      setFormData({
        id_produto: '',
        veiculo: '',
        valor: '',
        identificador_vendedor: '',
        auth_code: ''
      });

      // Chama a callback para atualizar a lista de vendas
      if (onVendaCadastrada) {
        onVendaCadastrada(novaVenda);
      }

    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
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

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

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
              sx={{ width: 300 }}
              disabled={loading}
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
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Valor (R$)"
              name="valor"
              value={formData.valor ? new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(formData.valor) : ''}
              onChange={handleCurrencyChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
              fullWidth
              disabled={loading}
            />
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
              disabled={loading}
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
              disabled={loading}
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
            disabled={loading}
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
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Add />}
            disabled={loading}
            sx={{
              px: 4,
              py: 1,
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Venda'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default CadastroDeVenda;