import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Grid
} from '@mui/material';
import { PhotoCamera, Save, Lock } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { usuariosApi } from '../api/usuariosApi';

function PerfilConfig() {
  const { user, updateUser } = useAuth();
  
  // Estados para os dados do perfil
  
  // Estados para os dados do perfil
  const [perfilData, setPerfilData] = useState({
    name: '',
    email: '',
    avatar: ''
  });

  // Estados para mudança de senha
  const [senhaData, setSenhaData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  
  // Estados para feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Carregar dados do usuário ao montar o componente
  useEffect(() => {
    if (user) {
      setPerfilData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  // Função para lidar com mudanças nos campos do perfil
  const handlePerfilChange = (field, value) => {
    setPerfilData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para lidar com mudanças nos campos de senha
  const handleSenhaChange = (field, value) => {
    setSenhaData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para lidar com upload de avatar
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handlePerfilChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para salvar o perfil
  const handleSalvarPerfil = async () => {
    if (!perfilData.name.trim() || !perfilData.email.trim()) {
      showSnackbar('Nome e email são obrigatórios', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await usuariosApi.atualizarPerfil(user.id, perfilData);
      
      if (response.success) {
        // Atualizar o contexto de autenticação
        updateUser(response.user);
        
        showSnackbar('Perfil atualizado com sucesso!', 'success');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao atualizar perfil';
      showSnackbar(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Função para alterar senha
  const handleAlterarSenha = async () => {
    if (!senhaData.currentPassword || !senhaData.newPassword || !senhaData.confirmPassword) {
      showSnackbar('Todos os campos de senha são obrigatórios', 'error');
      return;
    }

    if (senhaData.newPassword !== senhaData.confirmPassword) {
      showSnackbar('Nova senha e confirmação não coincidem', 'error');
      return;
    }

    if (senhaData.newPassword.length < 6) {
      showSnackbar('A nova senha deve ter pelo menos 6 caracteres', 'error');
      return;
    }

    setLoadingPassword(true);
    try {
      const response = await usuariosApi.atualizarSenha(user.id, {
        currentPassword: senhaData.currentPassword,
        newPassword: senhaData.newPassword
      });
      
      if (response.success) {
        showSnackbar('Senha alterada com sucesso!', 'success');
        setOpenPasswordDialog(false);
        setSenhaData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao alterar senha';
      showSnackbar(message, 'error');
    } finally {
      setLoadingPassword(false);
    }
  };

  // Função para mostrar snackbar
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Função para fechar snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          padding: '30px',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          maxWidth: '100%',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
          Configurações do Perfil
        </Typography>

        <Grid container spacing={4}>
          {/* Seção do Avatar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Foto do Perfil
              </Typography>
              
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={perfilData.avatar || user?.avatar || "/Imagens/Adm.png"}
                  alt={perfilData.name}
                  sx={{ 
                    width: 120, 
                    height: 120,
                    border: '4px solid #e65f2b',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
                
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#e65f2b',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#d54e1f'
                      }
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
              
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Clique no ícone da câmera para alterar sua foto
              </Typography>
            </Box>
          </Grid>

          {/* Seção de Informações Pessoais */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Informações Pessoais
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Nome Completo"
                value={perfilData.name}
                onChange={(e) => handlePerfilChange('name', e.target.value)}
                fullWidth
                variant="outlined"
                required
              />
              
              <TextField
                label="Email"
                type="email"
                value={perfilData.email}
                onChange={(e) => handlePerfilChange('email', e.target.value)}
                fullWidth
                variant="outlined"
                required
              />
              
              <TextField
                label="Usuário"
                value={user?.username || ''}
                fullWidth
                variant="outlined"
                disabled
                helperText="O nome de usuário não pode ser alterado"
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                  onClick={handleSalvarPerfil}
                  disabled={loading}
                  sx={{
                    backgroundColor: '#e65f2b',
                    '&:hover': {
                      backgroundColor: '#d54e1f'
                    }
                  }}
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Lock />}
                  onClick={() => setOpenPasswordDialog(true)}
                  sx={{
                    borderColor: '#e65f2b',
                    color: '#e65f2b',
                    '&:hover': {
                      borderColor: '#d54e1f',
                      backgroundColor: 'rgba(230, 95, 43, 0.04)'
                    }
                  }}
                >
                  Alterar Senha
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Dialog para alterar senha */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Alterar Senha</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Senha Atual"
              type="password"
              value={senhaData.currentPassword}
              onChange={(e) => handleSenhaChange('currentPassword', e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            
            <TextField
              label="Nova Senha"
              type="password"
              value={senhaData.newPassword}
              onChange={(e) => handleSenhaChange('newPassword', e.target.value)}
              fullWidth
              variant="outlined"
              required
              helperText="Mínimo 6 caracteres"
            />
            
            <TextField
              label="Confirmar Nova Senha"
              type="password"
              value={senhaData.confirmPassword}
              onChange={(e) => handleSenhaChange('confirmPassword', e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleAlterarSenha}
            variant="contained"
            disabled={loadingPassword}
            sx={{
              backgroundColor: '#e65f2b',
              '&:hover': {
                backgroundColor: '#d54e1f'
              }
            }}
          >
            {loadingPassword ? <CircularProgress size={20} color="inherit" /> : 'Alterar Senha'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PerfilConfig;