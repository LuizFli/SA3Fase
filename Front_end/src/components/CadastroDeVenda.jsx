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
import { cadastrarVenda, fetchProdutosAtivos } from '../api/vendasApi';
import { getFuncionarioByIdentificador } from '../api/funcionariosApi';

function CadastroDeVenda({ onClose, onVendaCadastrada }) {
  const { produtos = [], funcionarios, updateProdutos } = useGlobal();
  const produtosAtivos = produtos.filter(p => p.ativo === true);

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
  const [status, setStatus] = useState(true);

  const handleCurrencyChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^\d,.-]/g, '');
    const numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;

    setFormData({
      ...formData,
      [event.target.name]: numericValue
    });
  };
const verificarVendedorAtivo = async (identificador) => {
    if (!identificador) return false;
    const vendedor = await getFuncionarioByIdentificador(identificador);
    return vendedor?.ativo === true;  // Retorna explicitamente true/false
};

  const validateForm = async () => {  // Tornar a função assíncrona
    const newErrors = {};
    
    if (!formData.id_produto) {
      newErrors.id_produto = produtos.length === 0
        ? 'Nenhum veículo disponível'
        : 'Selecione um veículo';
    }
    
    if (!formData.identificador_vendedor) {
      newErrors.identificador_vendedor = 'Informe o vendedor';
    } else {
      // Verificar status do vendedor apenas se o identificador foi fornecido
      try {
        const ativo = await verificarVendedorAtivo(formData.identificador_vendedor);
        if (ativo === false) {
          newErrors.identificador_vendedor = 'Vendedor inativo';
        }
      } catch (error) {
        newErrors.identificador_vendedor = 'Erro ao verificar vendedor';
        console.error(error);
      }
    }
    
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
      setFormData((prev) => ({
        ...prev,
        veiculo: veiculoSelecionado ? `${veiculoSelecionado.marca} ${veiculoSelecionado.modelo}` : '',
        valor: veiculoSelecionado?.valor || 0,
      }));
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
  
    // Adicionar await aqui para esperar o resultado da validação
    const formIsInvalid = await validateForm();
    if (formIsInvalid) return;
  
    setLoading(true);
  
    try {
      const vendaData = {
        id_produto: Number(formData.id_produto),
        valor: Number(formData.valor),
        identificador_vendedor: formData.identificador_vendedor,
        auth_code: formData.auth_code || undefined
      };
  
      const novaVenda = await cadastrarVenda(vendaData);
      
      // Atualiza a lista de produtos após o cadastro
      const produtosAtualizados = await fetchProdutosAtivos();
      if (updateProdutos) {
        updateProdutos(produtosAtualizados);
      }

      // Limpa o formulário e fecha o modal
      setFormData({
        id_produto: '',
        veiculo: '',
        valor: '',
        identificador_vendedor: '',
        auth_code: ''
      });

      // Notifica o componente pai sobre a nova venda
      if (onVendaCadastrada) {
        onVendaCadastrada(novaVenda);
      }

      if (onClose) {
        onClose();
      }
  
    } catch (err) {
      setSubmitError(err.message || 'Erro ao cadastrar venda');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return value ? new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value) : '';
  };

  return (
    <Paper sx={{
      width: '80%',
      maxWidth: '800px',
      padding: '30px',
      borderRadius: '10px',
      outline: 'none',
    }}>
      <Typography variant="h4" sx={{
        fontWeight: 'bold',
        color: '#333',
        fontSize: '1.8rem',
        mb: 3,
      }}>
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
              sx={{width: 300}}
              error={!!errors.id_produto}
              helperText={errors.id_produto}
              disabled={loading || produtosAtivos.length === 0}
            >
              <MenuItem value="">
                <em>Selecione um veículo</em>
              </MenuItem>
              {produtosAtivos.length === 0 ? (
                <MenuItem disabled>
                  {loading ? 'Carregando veículos...' : 'Nenhum veículo disponível para venda'}
                </MenuItem>
              ) : (
                produtosAtivos.map((veiculo) => (
                  <MenuItem key={veiculo.id} value={veiculo.id}>
                    {veiculo.marca} {veiculo.modelo} - {veiculo.ano} ({veiculo.placa})
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Veículo Selecionado"
              name="veiculo"
              value={formData.veiculo}
              InputProps={{ readOnly: true }}
              fullWidth
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Valor (R$)"
              name="valor"
              value={formatCurrency(formData.valor)}
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

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 3,
        }}>
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
            disabled={loading || produtosAtivos.length === 0}
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