import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Divider,
  Grid,
  InputAdornment,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  Percent as PercentIcon,
  AttachMoney as AttachMoneyIcon 
} from '@mui/icons-material';
import { useGlobal } from '../contexts/GlobalProvider';

function MetaConfig() {
  const { config, setConfig } = useGlobal();
  const [tempConfig, setTempConfig] = useState({
    meta: config.meta,
    comicao: config.comicao
  });
  const [metaFormatada, setMetaFormatada] = useState(
    config.meta.toLocaleString('pt-BR')
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSalvar = () => {
    try {
      // Validações
      if (tempConfig.meta <= 0) {
        setSnackbar({
          open: true,
          message: 'A meta deve ser maior que zero!',
          severity: 'error'
        });
        return;
      }

      if (tempConfig.comicao < 0 || tempConfig.comicao > 100) {
        setSnackbar({
          open: true,
          message: 'A comissão deve estar entre 0% e 100%!',
          severity: 'error'
        });
        return;
      }

      // Salvar configurações
      setConfig({
        ...config,
        meta: Number(tempConfig.meta),
        comicao: Number(tempConfig.comicao)
      });

      setSnackbar({
        open: true,
        message: 'Configurações salvas com sucesso!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao salvar configurações!',
        severity: 'error'
      });
    }
  };

  const handleReset = () => {
    setTempConfig({
      meta: config.meta,
      comicao: config.comicao
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarNumero = (valor) => {
    // Remove tudo que não é dígito
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Converte para número e formata
    const numero = Number(apenasNumeros);
    return numero.toLocaleString('pt-BR');
  };

  const desformatarNumero = (valorFormatado) => {
    // Remove pontos e substitui vírgula por ponto
    return valorFormatado.replace(/\./g, '').replace(',', '.');
  };

  const handleMetaChange = (e) => {
    const valorDigitado = e.target.value;
    const valorFormatado = formatarNumero(valorDigitado);
    const valorNumerico = desformatarNumero(valorFormatado);
    
    setMetaFormatada(valorFormatado);
    setTempConfig({ ...tempConfig, meta: Number(valorNumerico) || 0 });
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          maxWidth: '100%',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUpIcon />
          Configurações de Meta e Comissão
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Configure a meta de vendas mensal e a porcentagem de comissão que será aplicada a todos os funcionários.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Configuração de Meta */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              sx={{
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                height: '100%'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoneyIcon color="success" />
                Meta de Vendas Mensal
              </Typography>
              
              <TextField
                fullWidth
                label="Meta de Vendas"
                value={metaFormatada}
                onChange={handleMetaChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                sx={{ mb: 2 }}
                placeholder="0"
              />
              
              <Typography variant="body2" color="text.secondary">
                Meta atual: {formatarMoeda(config.meta)}
              </Typography>
            </Paper>
          </Grid>

          {/* Configuração de Comissão */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              sx={{
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                height: '100%'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PercentIcon color="primary" />
                Porcentagem de Comissão
              </Typography>
              
              <TextField
                fullWidth
                label="Comissão (%)"
                type="number"
                value={tempConfig.comicao}
                onChange={(e) => setTempConfig({ ...tempConfig, comicao: e.target.value })}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  inputProps: { min: 0, max: 100, step: 0.1 }
                }}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                Comissão atual: {config.comicao}%
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Visualização */}
        <Paper
          elevation={1}
          sx={{
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            mb: 3
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Simulação de Comissão
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Se um funcionário vender {formatarMoeda(tempConfig.meta || 0)}, 
            ele receberá {formatarMoeda((tempConfig.meta || 0) * (tempConfig.comicao || 0) / 100)} de comissão.
          </Typography>
        </Paper>

        {/* Botões de Ação */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 'auto' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px'
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSalvar}
            sx={{
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px'
            }}
          >
            Salvar Configurações
          </Button>
        </Box>
      </Paper>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MetaConfig;
