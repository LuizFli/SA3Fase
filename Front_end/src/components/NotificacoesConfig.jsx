import { Box, Paper, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useState } from 'react';

const notificacoesMock = [
  { id: 1, texto: 'Venda cadastrada com sucesso', lida: false },
  { id: 2, texto: 'Produto "Uno" está com estoque baixo', lida: false },
  { id: 3, texto: 'Funcionário Arthur foi inativado', lida: true },
];

function NotificacoesConfig() {
  const [notificacoes, setNotificacoes] = useState(notificacoesMock);

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
  };

  const limparHistorico = () => {
    setNotificacoes([]);
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
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notificações
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Últimas notificações
        </Typography>
        <List sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
          {notificacoes.length === 0 ? (
            <ListItem>
              <ListItemText primary="Nenhuma notificação encontrada." />
            </ListItem>
          ) : (
            notificacoes.map((n) => (
              <ListItem key={n.id} sx={{ opacity: n.lida ? 0.6 : 1 }}>
                <ListItemText
                  primary={n.texto}
                  secondary={n.lida ? 'Lida' : 'Não lida'}
                  secondaryTypographyProps={{ color: n.lida ? 'success.main' : 'primary.main' }}
                />
              </ListItem>
            ))
          )}
        </List>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={marcarTodasComoLidas}
            disabled={notificacoes.length === 0}
          >
            Marcar todas como lidas
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={limparHistorico}
            disabled={notificacoes.length === 0}
          >
            Limpar histórico
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default NotificacoesConfig;