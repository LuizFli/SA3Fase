import { Box, Paper, Typography, List, ListItem, ListItemText, Divider, Button, Alert, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

function NotificacoesConfig() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contador, setContador] = useState(0);

  const API_BASE_URL = 'http://localhost:3000/api';

  // Função para buscar notificações
  const buscarNotificacoes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/notificacoes?limite=50`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar notificações');
      }
      
      const data = await response.json();
      setNotificacoes(data);
      
      // Buscar contador de não lidas
      const contadorResponse = await fetch(`${API_BASE_URL}/notificacoes/contador`);
      if (contadorResponse.ok) {
        const contadorData = await contadorResponse.json();
        setContador(contadorData.total);
      }
      
      setError('');
    } catch (err) {
      console.error('Erro ao buscar notificações:', err);
      setError('Erro ao carregar notificações. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para marcar uma notificação como lida
  const marcarComoLida = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notificacoes/${id}/lida`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao marcar notificação como lida');
      }

      // Atualizar a lista local
      setNotificacoes(prev => 
        prev.map(n => 
          n.id === id ? { ...n, lida: true } : n
        )
      );
      
      // Atualizar contador
      setContador(prev => Math.max(0, prev - 1));
      
    } catch (err) {
      console.error('Erro ao marcar notificação como lida:', err);
      setError('Erro ao marcar notificação como lida.');
    }
  };

  // Função para marcar todas como lidas
  const marcarTodasComoLidas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notificacoes/marcar-todas-lidas`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao marcar todas as notificações como lidas');
      }

      // Atualizar todas as notificações localmente
      setNotificacoes(prev => 
        prev.map(n => ({ ...n, lida: true }))
      );
      
      setContador(0);
      
    } catch (err) {
      console.error('Erro ao marcar todas as notificações como lidas:', err);
      setError('Erro ao marcar todas as notificações como lidas.');
    }
  };

  // Função para formatar a data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para obter o texto formatado da notificação
  const getTextoNotificacao = (notificacao) => {
    return notificacao.descricao || notificacao.titulo;
  };

  // Carregar notificações ao montar o componente
  useEffect(() => {
    buscarNotificacoes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

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
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notificações
          {contador > 0 && (
            <Typography component="span" sx={{ ml: 1, color: 'error.main', fontWeight: 'bold' }}>
              ({contador} não lidas)
            </Typography>
          )}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Últimas notificações
        </Typography>
        
        <List sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
          {notificacoes.slice(-3).length === 0 ? (
            <ListItem>
              <ListItemText primary="Nenhuma notificação encontrada." />
            </ListItem>
          ) : (
            notificacoes.slice(-3).map((notificacao) => (
              <ListItem 
                key={notificacao.id} 
                sx={{ 
                  opacity: notificacao.lida ? 0.6 : 1,
                  cursor: !notificacao.lida ? 'pointer' : 'default',
                  '&:hover': !notificacao.lida ? {
                    backgroundColor: 'action.hover'
                  } : {},
                  borderRadius: 1,
                  mb: 1,
                  border: !notificacao.lida ? '1px solid #e0e0e0' : 'none'
                }}
                onClick={() => !notificacao.lida && marcarComoLida(notificacao.id)}
              >
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: !notificacao.lida ? 'bold' : 'normal' }}>
                        {notificacao.titulo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {notificacao.descricao}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatarData(notificacao.created_at)}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: notificacao.lida ? 'success.main' : 'primary.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {notificacao.lida ? 'Lida' : 'Não lida'}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={marcarTodasComoLidas}
            disabled={notificacoes.length === 0 || contador === 0}
          >
            Marcar todas como lidas
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={buscarNotificacoes}
            disabled={loading}
          >
            Atualizar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default NotificacoesConfig;