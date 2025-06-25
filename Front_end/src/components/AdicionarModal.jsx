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
  // Se o valor for explicitamente 0 (número ou string '0'), retorna '0'
  if (value === 0 || value === '0') return '0';
  if (!value) return ''; // Lida com valores vazios ou nulos/indefinidos

  // Remove todos os caracteres não numéricos
  const cleanValue = value.toString().replace(/\D/g, '');
  // Adiciona pontos como separadores de milhares
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const AdicionarModal = ({ open, onClose, onSubmit, currentProduto, setCurrentProduto }) => {

  const { produtos, setProdutos } = useGlobal([]);
  const fetchProdutos = async () => {
    try {
      console.log('Carregando produtos do servidor...'); // Log para depuração
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
    console.log('Produtos atualizados:', produtos); // Log para depuração
  }, [produtos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'km') {
      // Para o campo KM, formata o valor enquanto o usuário digita
      setCurrentProduto(prev => ({
        ...prev,
        [name]: formatKm(value) // Usa a função de formatação
      }));
    } else {
      // Para outros campos, mantém o comportamento padrão
      setCurrentProduto(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Antes de enviar, limpa o valor de km removendo os pontos para garantir que seja um número puro
    const kmParaEnviar = currentProduto.km.toString().replace(/\D/g, '');

    const novoProduto = {
      ...currentProduto,
      km: Number(kmParaEnviar), // Converte a string limpa para número
      ano: Number(currentProduto.ano),
      valor: Number(currentProduto.valor)
    };
    onSubmit(novoProduto); // Chama a função onSubmit passada como prop
    fetchProdutos()
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
                  // Alterado type para "text" para permitir a formatação
                  type="text"
                  value={currentProduto.km}
                  onChange={handleInputChange}
                  required
                  fullWidth
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

          {/* Novo campo de Valor */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <CampoTexto
              label="Valor (R$)"
              name="valor"
              value={currentProduto.valor}
              onChange={handleInputChange}
              required
              fullWidth
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: 'R$',
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
