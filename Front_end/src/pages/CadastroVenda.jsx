import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  FormControl,
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PageContainer from '../components/PageContainer';
<<<<<<< HEAD
import {useGlobal} from '../contexts/GlobalProvider'
=======
import { useGlobal } from '../contexts/GlobalProvider';
>>>>>>> ae1791b05467f4299bdb662c4edad35760a5de74

function CadastroVenda() {
  const { produtos = [], vendas, setVendas } = useGlobal();

  const [formData, setFormData] = useState({
    id_produto: '',
    veiculo: '',
    valor: '',
    data: dayjs(),
    matricula_vendedor: '',
    auth_code: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    if (name === 'id_produto') {
      const veiculoSelecionado = produtos.find(p => p.id === Number(value));
      if (veiculoSelecionado) {
        setFormData(prev => ({
          ...prev,
          veiculo: `${veiculoSelecionado.marca} ${veiculoSelecionado.modelo}`,
          valor: 50000 // Valor padrão ou você pode calcular com base nos dados do veículo
        }));
      }
    }
  };

  const handleDateChange = (newValue) => {
    setFormData(prev => ({
      ...prev,
      data: newValue
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id_produto) newErrors.id_produto = 'Selecione um veículo';
    if (!formData.matricula_vendedor) newErrors.matricula_vendedor = 'Matrícula é obrigatória';
    if (!formData.auth_code) newErrors.auth_code = 'Código de autorização é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const novaVenda = {
        ...formData,
        data: formData.data.format('YYYY-MM-DD'),
        valor: Number(formData.valor),
        produto: formData.veiculo // Usando o nome do veículo como "produto"
      };

      setVendas([...vendas, novaVenda]);

      setFormData({
        id_produto: '',
        veiculo: '',
        valor: '',
        data: dayjs(),
        matricula_vendedor: '',
        auth_code: ''
      });

      alert('Venda cadastrada com sucesso!');
    }
  };

<<<<<<< HEAD
  const { vendas, setVendas } = useGlobal()

=======
>>>>>>> ae1791b05467f4299bdb662c4edad35760a5de74
  return (
    <PageContainer>
      <Box sx={{
        m: 0,
        p: 0,
        maxWidth: '100%',
        minHeight: '100%',
        display: 'flex',
        backgroundColor: '#EBDFD7'
      }}>
        <Box sx={{
          width: '100%',
          p: 3,
          display: 'flex',
          flexDirection: 'column',

        }}>
          <Typography
            variant="h4"
            sx={{
              color: '#133337',
              mb: 3,
              fontWeight: 'bold'
            }}
          >
            Cadastro de Venda de Veículo
          </Typography>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{
              p: 3,
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column'
            }}>

              <Box component="form" onSubmit={handleSubmit} sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 3
              }}>
                <Box sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  p: 2
                }}>
                  <FormControl fullWidth error={!!errors.id_produto}>
                    <TextField
                      select
                      label="Veículo"
                      name="id_produto"
                      value={formData.id_produto}
                      onChange={handleChange}
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
                  </FormControl>

                  <TextField
                    label="Veículo Selecionado"
                    name="veiculo"
                    value={formData.veiculo}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />

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

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Data da Venda"
                      value={formData.data}
                      onChange={handleDateChange}
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  </LocalizationProvider>

                  <TextField
                    label="Matrícula do Vendedor"
                    name="matricula_vendedor"
                    value={formData.matricula_vendedor}
                    onChange={handleChange}
                    error={!!errors.matricula_vendedor}
                    helperText={errors.matricula_vendedor}
                    fullWidth
                    placeholder="Ex: V00123"
                  />

                  <TextField
                    label="Código de Autorização"
                    name="auth_code"
                    value={formData.auth_code}
                    onChange={handleChange}
                    error={!!errors.auth_code}
                    helperText={errors.auth_code}
                    fullWidth
                    placeholder="Ex: A1B2C3D4"
                  />
                </Box>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                  pt: 2,
                  borderTop: '1px solid #eee'
                }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setFormData({
                        id_produto: '',
                        veiculo: '',
                        valor: '',
                        data: dayjs(),
                        matricula_vendedor: '',
                        auth_code: ''
                      });
                      setErrors({});
                    }}
                  >
                    Limpar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Cadastrar Venda
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default CadastroVenda;