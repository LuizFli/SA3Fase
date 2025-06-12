import { Avatar, Box, Button, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { Delete, Edit, Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router'

function GerenciamentoFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [showPassword, setShowPassword] = useState({})
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [funcionarioEditado, setFuncionarioEditado] = useState({});
  const navigate = useNavigate();

  // Carrega os funcionários do localStorage quando o componente é montado
  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = () => {
    const funcionariosSalvos = localStorage.getItem('funcionarios');
    if (funcionariosSalvos) {
      setFuncionarios(JSON.parse(funcionariosSalvos));
    }
  };

  const handleClickShowPassword = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  //Botão para editar dados de um funcionário
  const editarDados = (index) => {
    setEditandoIndex(index);
    setFuncionarioEditado({ ...funcionarios[index] });
  };

  const salvarEdicao = () => {
    if (editandoIndex !== null) {
      const novosFuncionarios = [...funcionarios];
      novosFuncionarios[editandoIndex] = funcionarioEditado;

      setFuncionarios(novosFuncionarios);
      localStorage.setItem('funcionarios', JSON.stringify(novosFuncionarios));

      setEditandoIndex(null);
      setFuncionarioEditado({});
    }
  };

  const cancelarEdicao = () => {
    setEditandoIndex(null);
    setFuncionarioEditado({});
  };

  //Botão para deletar um funcionário
  const handleDelete = (index) => {
    const novosFuncionarios = [...funcionarios]
    novosFuncionarios.splice(index, 1)
    setFuncionarios(novosFuncionarios)
    localStorage.setItem('funcionarios', JSON.stringify(novosFuncionarios))
  }

  return (
    <Box sx={{
      p: 0,
      m: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden'
    }}>
      <Box sx={{
        p: '0',
        m: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>

        <Box sx={{
          p: '0',
          m: '0',
          width: '100%',
          height: '15%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="h3" component="h2" sx={{ color: '#133337', fontWeight: 'bold' }}>
            Gerenciamento de Funcionários
          </Typography>
        </Box>

        <Box sx={{
          p: '0',
          m: '0',
          width: '100%',
          height: '85%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>

          <Box sx={{
            width: '90%',
            height: '90%',
            backgroundColor: 'var(--box-color)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            boxShadow: 3,
            overflow: 'hidden',
            padding: '20px'
          }}>

            <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '70vh' }}>
              <Table stickyHeader aria-label="tabela de funcionários">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Usuário</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Cargo</TableCell>
                    <TableCell>Endereço/Rua</TableCell>
                    <TableCell>Senha</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {funcionarios.length > 0 ? (
                    funcionarios.map((funcionario, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {editandoIndex === index ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.nome || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, nome: e.target.value })}
                            />
                          ) : (
                            funcionario.nome
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoIndex === index ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.usuario || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, usuario: e.target.value })}
                            />
                          ) : (
                            funcionario.usuario
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoIndex === index ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.email || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, usuario: e.target.value })}
                            />
                          ) : (
                            funcionario.email
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoIndex === index ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.telefone || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, usuario: e.target.value })}
                            />
                          ) : (
                            funcionario.telefone
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoIndex === index ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.cargo || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, usuario: e.target.value })}
                            />
                          ) : (
                            funcionario.cargo
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoIndex === index ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.rua || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, usuario: e.target.value })}
                            />
                          ) : (
                            funcionario.rua
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoIndex === index ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.senha || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, usuario: e.target.value })}
                            />
                          ) : (
                            funcionario.senha
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoIndex === index ? (
                            <Stack direction="row" spacing={1}>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={salvarEdicao}
                              >
                                Salvar
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={cancelarEdicao}
                              >
                                Cancelar
                              </Button>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={1}>
                              <Button
                                sx={{ backgroundColor: 'var(--secondary-color)', width: '90px' }}
                                onClick={() => editarDados(index)}
                              >
                                <IconButton>
                                  <Edit sx={{ color: 'white' }} />
                                </IconButton>
                              </Button>
                              <Button
                                sx={{ backgroundColor: 'var(--primary-color)', width: '90px' }}
                                onClick={() => handleDelete(index)}
                              >
                                <IconButton>
                                  <Delete sx={{ color: 'white' }} />
                                </IconButton>
                              </Button>
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Nenhum funcionário cadastrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '200px' }}
                onClick={() => navigate('/cadastrofun')}
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
              >
                Atualizar Lista
              </Button>

              <Button
                variant="contained"
                color="secondary"
                sx={{ width: '200px', backgroundColor: "var(--primary-color)" }}
                onClick={() => {
                  localStorage.removeItem('funcionarios')
                  setFuncionarios([])
                }}
              >
                Limpar Todos
              </Button>

            </Stack>

          </Box>

        </Box>

      </Box>
    </Box>
  )
}

export default GerenciamentoFuncionarios