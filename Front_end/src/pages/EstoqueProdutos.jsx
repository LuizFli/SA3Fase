import React from 'react';
import { 
  Box as Container, 
  Typography as Texto,
  Paper as Painel,
  Button as Botao,
  TextField as CampoTexto,
  Avatar as Avatar
} from '@mui/material';
import { Add as Adicionar, Search as Buscar } from '@mui/icons-material';
import PageContainer from '../components/PageContainer';
import { useGlobal } from '../contexts/GlobalProvider';
import ProdutoEstoque from '../components/ProdutoEstoque';

function EstoqueProdutos() {
  const { produtos, setProdutos } = useGlobal();

  const apagarProduto = (id) => {
    const novosProdutos = produtos.filter(produto => produto.id !== id);
    setProdutos(novosProdutos);
  };

  return (
    <PageContainer>
      <Container sx={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        
        <Painel elevation={3} sx={{ 
          padding: '15px 20px',
          marginBottom: '20px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px'
        }}>
          <Texto variant="h4" sx={{ 
            fontWeight: 'bold', 
            color: '#333',
            fontSize: '1.8rem'
          }}>
            Estoque de Produtos
          </Texto>
          
          <Container sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Avatar 
              alt="Usuário" 
              src="/static/images/avatar/1.jpg" 
              sx={{ width: 45, height: 45 }} 
            />
            
            <Botao
              variant="contained"
              color="success"
              startIcon={<Adicionar />}
              sx={{ 
                fontWeight: 'bold', 
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
              onClick={() => window.location.href = '/cadProduto'}
            >
              Adicionar Produto
            </Botao>
          </Container>
        </Painel>
        

        <Painel elevation={2} sx={{ 
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '10px'
        }}>
          <Container sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <CampoTexto
              placeholder="Buscar"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <Buscar />,
                sx: { borderRadius: '20px' }
              }}
              sx={{ maxWidth: '400px' }}
            />
          </Container>
        </Painel>

        <Painel elevation={2} sx={{ 
          width: '100%',
          overflow: 'auto',
          borderRadius: '10px'
        }}>
          <ProdutoEstoque produtos={produtos} apagarProduto={apagarProduto} />
        </Painel>
      </Container>
    </PageContainer>
  );
}

export default EstoqueProdutos;