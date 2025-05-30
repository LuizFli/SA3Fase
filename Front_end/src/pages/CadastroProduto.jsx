import React, { useState } from 'react';
import { 
  Box as Container, 
  Typography as Texto,
  Paper as Painel,
  Button as Botao,
  TextField as CampoTexto,
  Grid as Grade,
  FormControl as ControleFormulario,
  InputLabel as Rotulo,
  Select as Selecionar,
  MenuItem as ItemMenu
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import { useGlobal } from '../contexts/GlobalProvider';

function CadastroProduto() {
  const { produtos, setProdutos } = useGlobal();
  const [novoProduto, setNovoProduto] = useState({
    marca: '',
    modelo: '',
    ano: '',
    km: '',
    placa: '',
    id: produtos.length + 1,
    cor: ''
  });

  const coresDisponiveis = [
    'Preto',
    'Branco',
    'Prata',
    'Vermelho',
    'Azul',
    'Cinza',
    'Verde'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProdutos([...produtos, novoProduto]);
    window.location.href = '/produtos';
  };

  return (
    <PageContainer>
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Painel elevation={3} sx={{ 
          p: 4,
          width: '100%',
          maxWidth: '900px',
          backgroundColor: '#f8f4f0',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <Texto 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center',
              fontSize: '2rem'
            }}
          >
            Cadastro de Produtos
          </Texto>
          
          <Container 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Grade container spacing={4} sx={{ width: '100%' }}>
              {/* Coluna da Esquerda */}
              <Grade item xs={12} md={6}>
                <ControleFormulario fullWidth sx={{ mb: 3 }}>
                  <Rotulo sx={{ mb: 1, fontWeight: '500' }}>Marca</Rotulo>
                  <CampoTexto
                    name="marca"
                    value={novoProduto.marca}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  />
                </ControleFormulario>

                <ControleFormulario fullWidth sx={{ mb: 3 }}>
                  <Rotulo sx={{ mb: 1, fontWeight: '500' }}>Modelo</Rotulo>
                  <CampoTexto
                    name="modelo"
                    value={novoProduto.modelo}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  />
                </ControleFormulario>

                <ControleFormulario fullWidth sx={{ mb: 3 }}>
                  <Rotulo sx={{ mb: 1, fontWeight: '500' }}>Ano</Rotulo>
                  <CampoTexto
                    name="ano"
                    value={novoProduto.ano}
                    onChange={handleChange}
                    required
                    fullWidth
                    type="number"
                    sx={{ backgroundColor: 'white' }}
                  />
                </ControleFormulario>

                <ControleFormulario fullWidth sx={{ mb: 3 }}>
                  <Rotulo sx={{ mb: 1, fontWeight: '500' }}>Quilometragem (Km)</Rotulo>
                  <CampoTexto
                    name="km"
                    value={novoProduto.km}
                    onChange={handleChange}
                    required
                    fullWidth
                    type="number"
                    sx={{ backgroundColor: 'white' }}
                  />
                </ControleFormulario>
              </Grade>

              {/* Coluna da Direita */}
              <Grade item xs={12} md={6}>
                <ControleFormulario fullWidth sx={{ mb: 3 }}>
                  <Rotulo sx={{ mb: 1, fontWeight: '500' }}>Placa</Rotulo>
                  <CampoTexto
                    name="placa"
                    value={novoProduto.placa}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  />
                </ControleFormulario>

                <ControleFormulario fullWidth sx={{ mb: 3 }}>
                  <Rotulo sx={{ mb: 1, fontWeight: '500' }}></Rotulo>
                  <CampoTexto
                    name="id"
                    value={novoProduto.id}
                    onChange={handleChange}
                    required
                    fullWidth
                    type="number"
                    disabled
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                </ControleFormulario>

                <ControleFormulario fullWidth sx={{ mb: 3 }}>
                  <Rotulo sx={{ mb: 1, fontWeight: '500' }}>Cor</Rotulo>
                  <Selecionar
                    name="cor"
                    value={novoProduto.cor}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  >
                    {coresDisponiveis.map(cor => (
                      <ItemMenu key={cor} value={cor}>{cor}</ItemMenu>
                    ))}
                  </Selecionar>
                </ControleFormulario>
              </Grade>
            </Grade>

            <Container sx={{ 
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
              width: '100%'
            }}>
              <Botao
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#FF9D00',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 40px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  minWidth: '150px',
                  '&:hover': {
                    backgroundColor: '#e68a00',
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                    transform: 'translateY(-2px)'
                  },
                  '&:active': {
                    transform: 'translateY(0)'
                  }
                }}
              >
                SALVAR
              </Botao>
            </Container>
          </Container>
        </Painel>
      </Container>
    </PageContainer>
  );
}

export default CadastroProduto;