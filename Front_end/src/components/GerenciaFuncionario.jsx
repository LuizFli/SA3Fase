import { Avatar, Box, Button, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Delete, Edit, Visibility, VisibilityOff, Block, CheckCircle, Group } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import axios from 'axios';

function GerenciamentoFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [showPassword, setShowPassword] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [funcionarioEditado, setFuncionarioEditado] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/funcionarios');
      const funcionariosCompletos = response.data.map(f => ({
        ...f,
        data_nascimento: f.data_nascimento || '',
        status: f.status || 'ativo'
      }));
      setFuncionarios(funcionariosCompletos);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
      alert("Erro ao carregar funcionários");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const editarDados = (id) => {
    const funcionario = funcionarios.find((f) => f.id === id);
    if (!funcionario) return;
    const dataFormatada = funcionario.data_nascimento ? new Date(funcionario.data_nascimento).toISOString().split('T')[0] : '';
    setFuncionarioEditado({
      ...funcionario,
      dataNascimento: dataFormatada,
    });
    setEditandoId(id);
  };

  const salvarEdicao = async () => {
    if (!editandoId) return;
    setLoading(true);
    try {
      const dadosParaEnviar = {
        ...funcionarioEditado,
        data_nascimento: funcionarioEditado.dataNascimento,
      };
      delete dadosParaEnviar.dataNascimento;

      if (dadosParaEnviar.foto instanceof File) {
        const formData = new FormData();
        Object.keys(dadosParaEnviar).forEach(key => {
          formData.append(key, dadosParaEnviar[key]);
        });

        const response = await axios.put(
          `http://localhost:3000/api/funcionarios/${editandoId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        const funcionariosAtualizados = funcionarios.map((f) =>
          f.id === editandoId ? { ...f, ...response.data } : f
        );
        setFuncionarios(funcionariosAtualizados);
      } else {
        const response = await axios.put(
          `http://localhost:3000/api/funcionarios/${editandoId}`,
          dadosParaEnviar
        );

        const funcionariosAtualizados = funcionarios.map((f) =>
          f.id === editandoId ? { ...f, ...response.data } : f
        );
        setFuncionarios(funcionariosAtualizados);
      }

      setEditandoId(null);
      setFuncionarioEditado({});
      alert("Funcionário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert(error.response?.data?.erro || "Erro ao atualizar funcionário.");
    } finally {
      setLoading(false);
    }
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFuncionarioEditado({});
  };

  const toggleStatusFuncionario = async (id) => {
    if (window.confirm("Tem certeza que deseja alterar o status deste funcionário?")) {
      setLoading(true);
      try {
        const response = await axios.put(`http://localhost:3000/api/funcionarios/${id}/toggle-status`);
        setFuncionarios(funcionarios.map(f =>
          f.id === id ? { ...f, ativo: response.data.ativo } : f
        ));
        alert(response.data.message);
      } catch (error) {
        console.error("Erro ao alterar status:", error);
        alert(error.response?.data?.erro || "Erro ao alterar status");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFuncionarioEditado({
        ...funcionarioEditado,
        foto: e.target.files[0]
      });
    }
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
          <Group />
          Gerenciamento de Funcionários
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Gerencie todos os funcionários da empresa. Edite informações, altere status e adicione novos funcionários.
        </Typography>

        {loading ? (
          <Typography align="center">Carregando...</Typography>
        ) : (
          <TableContainer sx={{ 
            flex: 1,
            maxHeight: 'calc(100vh - 300px)',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            }
          }}>
            <Table stickyHeader aria-label="tabela de funcionários">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Identificador</TableCell>
                  <TableCell>Usuário</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Endereço/Rua</TableCell>
                  <TableCell>Data Nasc.</TableCell>
                  <TableCell>Senha</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {funcionarios.length > 0 ? (
                  funcionarios.map((funcionario) => (
                    <TableRow key={funcionario.id} sx={{ backgroundColor: funcionario.status === 'inativo' ? 'rgba(255, 0, 0, 0.1)' : 'inherit' }}>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            value={funcionarioEditado.nome || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, nome: e.target.value })}
                          />
                        ) : funcionario.nome}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            value={funcionarioEditado.identificador || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, identificador: e.target.value })}
                          />
                        ) : funcionario.identificador}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            value={funcionarioEditado.usuario || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, usuario: e.target.value })}
                          />
                        ) : funcionario.usuario}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            value={funcionarioEditado.email || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, email: e.target.value })}
                          />
                        ) : funcionario.email}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            value={funcionarioEditado.telefone || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, telefone: e.target.value })}
                          />
                        ) : funcionario.telefone}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            value={funcionarioEditado.cargo || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, cargo: e.target.value })}
                          />
                        ) : funcionario.cargo}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            value={funcionarioEditado.rua || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, rua: e.target.value })}
                          />
                        ) : funcionario.rua}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            value={funcionarioEditado.dataNascimento || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, dataNascimento: e.target.value })}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                          />
                        ) : (
                          funcionario.data_nascimento ? new Date(funcionario.data_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ''
                        )}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <TextField
                            size="small"
                            type={showPassword[funcionario.id] ? 'text' : 'password'}
                            value={funcionarioEditado.senha || ''}
                            onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, senha: e.target.value })}
                            InputProps={{
                              endAdornment: (
                                <IconButton onClick={() => handleClickShowPassword(funcionario.id)} edge="end">
                                  {showPassword[funcionario.id] ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              )
                            }}
                          />
                        ) : (
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>{showPassword[funcionario.id] ? funcionario.senha : '••••••••'}</Typography>
                            <IconButton onClick={() => handleClickShowPassword(funcionario.id)} size="small">
                              {showPassword[funcionario.id] ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </Stack>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => toggleStatusFuncionario(funcionario.id)}
                          color={funcionario.ativo ? 'success' : 'error'}
                          size="small"
                        >
                          {funcionario.ativo ? <CheckCircle /> : <Block />}
                        </IconButton>
                        {funcionario.ativo ? 'Ativo' : 'Inativo'}
                      </TableCell>
                      <TableCell>
                        {editandoId === funcionario.id ? (
                          <Stack direction="row" spacing={1}>
                            <Button variant="contained" color="success" size="small" onClick={salvarEdicao} disabled={loading}>
                              Salvar
                            </Button>
                            <Button variant="outlined" color="error" size="small" onClick={cancelarEdicao} disabled={loading}>
                              Cancelar
                            </Button>
                          </Stack>
                        ) : (
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              sx={{
                                backgroundColor: 'var(--secondary-color)',
                                borderRadius: '4px',
                                '&:hover': { backgroundColor: '#c45024' }
                              }}
                              onClick={() => editarDados(funcionario.id)}
                              disabled={loading}
                              size="small"
                            >
                              <Edit sx={{ color: 'white' }} />
                            </IconButton>
                            
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">Nenhum funcionário cadastrado</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px' }}
            onClick={() => navigate('/cadastrofun')}
            disabled={loading}
          >
            Adicionar Funcionário
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#4CAF50',
              color: 'white',
              width: '200px',
              '&:hover': { backgroundColor: '#3e8e41' }
            }}
            onClick={carregarFuncionarios}
            disabled={loading}
          >
            Atualizar Lista
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default GerenciamentoFuncionarios;