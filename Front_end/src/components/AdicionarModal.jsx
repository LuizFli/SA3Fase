import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
import { useGlobal } from '../contexts/GlobalProvider';

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

// Função utilitária para formatar a quilometragem com pontos a cada 3 números
const formatKm = (value) => {
  if (value === 0 || value === '0') return '0';
  if (!value) return '';
  const cleanValue = value.toString().replace(/\D/g, '');
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Adicionada: Função para formatar valor monetário com pontos e vírgulas
const formatMoney = (value) => {
  if (value === 0 || value === '0') return '0,00';
  if (!value) return '';
  let cleanValue = value.toString().replace(/[^\d,]/g, '');
  const parts = cleanValue.split(',');
  if (parts.length > 2) {
    cleanValue = parts[0] + ',' + parts.slice(1).join('');
  }
  cleanValue = cleanValue.replace(/\./g, ''); // Remove pontos existentes
  const [integerPart, decimalPart] = cleanValue.split(',');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (decimalPart !== undefined) {
    const limitedDecimalPart = decimalPart.slice(0, 2);
    return `${formattedIntegerPart},${limitedDecimalPart}`;
  }
  return formattedIntegerPart;
};


const AdicionarModal = ({ open, onClose, onSubmit, currentProduto, setCurrentProduto }) => {

  const { produtos, setProdutos } = useGlobal([]);
  const fetchProdutos = async () => {
    try {
      console.log('Carregando produtos do servidor...');
      const response = await axios.get('http://localhost:3000/api/produtos');
      setProdutos(response.data.produtos);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  useEffect(() => {    
    fetchProdutos();
  }, []);
  useEffect(() => {
    console.log('Produtos atualizados:', produtos);
  }, [produtos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'km') {
      setCurrentProduto(prev => ({
        ...prev,
        [name]: formatKm(value)
      }));
    } else if (name === 'valor') { // Adicionada lógica para formatar o campo "valor"
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
    const kmParaEnviar = currentProduto.km.toString().replace(/\D/g, '');

    const novoProduto = {
      ...currentProduto,
      km: Number(kmParaEnviar),
      ano: Number(currentProduto.ano),
      // Corrigido: Limpa o valor monetário removendo pontos e trocando vírgula por ponto antes de converter para número
      valor: Number(currentProduto.valor.toString().replace(/\./g, '').replace(',', '.'))
    };
    onSubmit(novoProduto);
    fetchProdutos();
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
                  sx={{ // Adicionado para consistência de estilo com EditarModal
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
                  sx={{ // Adicionado para consistência de estilo com EditarModal
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
                  sx={{ // Adicionado para consistência de estilo com EditarModal
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
                  type="text" // Mantido como "text" para formatação
                  value={currentProduto.km}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ // Adicionado para consistência de estilo com EditarModal
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
                  sx={{ // Adicionado para consistência de estilo com EditarModal
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
                  sx={{ // Adicionado para consistência de estilo com EditarModal
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

          {/* Campo de Valor com formatação */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <CampoTexto
              label="Valor (R$)"
              name="valor"
              value={currentProduto.valor}
              onChange={handleInputChange}
              required
              fullWidth
              type="text" // Alterado para "text" para permitir a formatação monetária
              variant="outlined"
              InputProps={{
                startAdornment: 'R$',
                sx: { borderRadius: '8px' } // Adicionado para consistência de estilo com EditarModal
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
              Salvar Produto
            </Botao>
          </Container>
        </form>
      </Painel>
    </Modal>
  );
};

export default AdicionarModal;