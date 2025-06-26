import { Box, Paper, Typography } from '@mui/material';

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
        <Typography variant="body2" color="text.secondary">
          Em caso de dúvidas, entre em contato com o suporte.
        </Typography>
      </Paper>
    </Box>
  );
}

export default AjudaConfig;