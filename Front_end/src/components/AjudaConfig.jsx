import { Box, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function AjudaConfig() {
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
          Ajuda
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Precisa de suporte? Veja abaixo algumas dúvidas frequentes:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Como cadastrar uma venda?"
              secondary="Acesse a página de Vendas e clique em 'Cadastrar Venda'. Preencha os campos obrigatórios e salve."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Como editar meu perfil?"
              secondary="Vá em Configurações > Perfil, altere os dados desejados e clique em Salvar."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Como adicionar um novo funcionário?"
              secondary="Acesse Configurações > Gerenciamento de Funcionários e clique em 'Adicionar Funcionário'."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Precisa de mais ajuda?"
              secondary="Entre em contato pelo e-mail: suporte@salesight.com"
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default AjudaConfig;