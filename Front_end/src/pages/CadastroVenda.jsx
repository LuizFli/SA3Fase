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
import { useGlobal } from '../contexts/GlobalProvider';

function CadastroVenda() {
  const { produtos = [], vendas, setVendas, funcionarios = [], setFuncionarios } = useGlobal();

  const [formData, setFormData] = useState({
    id_produto: '',
    veiculo: '',
    valor: '' ,
    data: dayjs(),
    identificador_vendedor: '',
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
          valor: veiculoSelecionado.valor || 0
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
    
    // Validação da matrícula
    if (!formData.identificador_vendedor) {
      newErrors.identificador_vendedor = 'Matrícula é obrigatória';
    } else {
      const funcionarioExiste = funcionarios.some(
        f => f.identificador === formData.identificador_vendedor
      );
      if (!funcionarioExiste) {
        newErrors.identificador_vendedor = 'Matrícula não encontrada';
      }
    }
    
    if (!formData.auth_code) newErrors.auth_code = 'Código de autorização é obrigatório';
    if (formData.valor <= 0) newErrors.valor = 'O valor deve ser positivo';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Encontrar o funcionário pela matrícula
      const funcionarioIndex = funcionarios.findIndex(
        f => f.identificador === formData.identificador_vendedor
      );

      if (funcionarioIndex === -1) {
        setErrors(prev => ({
          ...prev,
          identificador_vendedor: 'Funcionário não encontrado'
        }));
        return;
      }

      // Criar nova venda
      const novaVenda = {
        ...formData,
        id: vendas.length > 0 ? Math.max(...vendas.map(v => v.id)) + 1 : 1,
        data: formData.data.format('YYYY-MM-DD'),
        valor: Number(formData.valor),
        produto: formData.veiculo,
        status: 'concluida'
      };

      // Atualizar vendas
      setVendas([...vendas, novaVenda]);

      // Atualizar funcionário - somar valor da venda ao total
      const funcionariosAtualizados = [...funcionarios];
      const vendaTotalAtual = parseFloat(funcionariosAtualizados[funcionarioIndex].financeiro.vendaTotal) || 0;
      const novaVendaTotal = vendaTotalAtual + novaVenda.valor;
      
      funcionariosAtualizados[funcionarioIndex] = {
        ...funcionariosAtualizados[funcionarioIndex],
        financeiro: {
          ...funcionariosAtualizados[funcionarioIndex].financeiro,
          vendaTotal: Number(novaVendaTotal)
        }
      };

      setFuncionarios(funcionariosAtualizados);

      // Reset form
      setFormData({
        id_produto: '',
        veiculo: '',
        valor: '',
        data: dayjs(),
        identificador_vendedor: '',
        auth_code: ''
      });

      alert('Venda cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar venda:', error);
      alert('Ocorreu um erro ao cadastrar a venda');
    }
  };



  return (
    <PageContainer>
      <Box sx={{
        m: 0,
        p: 0,
        maxWidth: '100%',
        minHeight: '100%',
        display: 'flex',
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
                    label="Identificador do Vendedor"
                    name="identificador_vendedor"
                    value={formData.identificador_vendedor}
                    onChange={handleChange}
                    error={!!errors.identificador_vendedor}
                    helperText={errors.identificador_vendedor}
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
                        identificador_vendedor: '',
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