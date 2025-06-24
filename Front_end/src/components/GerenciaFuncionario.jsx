import { Avatar, Box, Button, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { Delete, Edit, Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import axios from 'axios'

function GerenciamentoFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [showPassword, setShowPassword] = useState({})
  const [editandoId, setEditandoId] = useState(null)
  const [funcionarioEditado, setFuncionarioEditado] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Carrega os funcionários do backend quando o componente é montado
  useEffect(() => {
    carregarFuncionarios()
  }, [])

  const carregarFuncionarios = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/api/funcionarios')
      setFuncionarios(response.data)
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error)
      alert("Erro ao carregar funcionários")
    } finally {
      setLoading(false)
    }
  }

  const handleClickShowPassword = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Função para editar dados de um funcionário
  const editarDados = (id) => {
    setEditandoId(id)
    const funcionario = funcionarios.find(f => f.id === id)
    setFuncionarioEditado({ ...funcionario })
  }

  const salvarEdicao = async () => {
    if (!editandoId) return
    
    try {
      setLoading(true)
      await axios.put(`http://localhost:3000/api/funcionarios/${editandoId}`, funcionarioEditado)
      await carregarFuncionarios() // Recarrega a lista após edição
      setEditandoId(null)
      setFuncionarioEditado({})
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error)
      alert(error.response?.data?.erro || "Erro ao atualizar funcionário")
    } finally {
      setLoading(false)
    }
  }

  const cancelarEdicao = () => {
    setEditandoId(null)
    setFuncionarioEditado({})
  }

  // Função para deletar um funcionário
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este funcionário?")) return
    
    try {
      setLoading(true)
      await axios.delete(`http://localhost:3000/api/funcionarios/${id}`)
      await carregarFuncionarios() // Recarrega a lista após exclusão
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error)
      alert(error.response?.data?.erro || "Erro ao deletar funcionário")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ padding: '20px', minHeight: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Cabeçalho */}
      <Paper elevation={3} sx={{ padding: '15px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '10px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.8rem' }}>
          Gerenciamento de Funcionários
        </Typography>
        <Avatar alt="Usuário" src="/Imagens/Adm.png" sx={{ width: 45, height: 45 }} />
      </Paper>

      {/* Conteúdo principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {loading ? (
            <Typography align="center">Carregando...</Typography>
          ) : (
            <TableContainer sx={{ flex: 1 }}>
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
                    funcionarios.map((funcionario) => (
                      <TableRow key={funcionario.id}>
                        <TableCell>
                          {editandoId === funcionario.id ? (
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
                          {editandoId === funcionario.id ? (
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
                          {editandoId === funcionario.id ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.email || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, email: e.target.value })}
                            />
                          ) : (
                            funcionario.email
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoId === funcionario.id ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.telefone || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, telefone: e.target.value })}
                            />
                          ) : (
                            funcionario.telefone
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoId === funcionario.id ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.cargo || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, cargo: e.target.value })}
                            />
                          ) : (
                            funcionario.cargo
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoId === funcionario.id ? (
                            <TextField
                              size="small"
                              value={funcionarioEditado.rua || ''}
                              onChange={(e) => setFuncionarioEditado({ ...funcionarioEditado, rua: e.target.value })}
                            />
                          ) : (
                            funcionario.rua
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
                              <Typography>
                                {showPassword[funcionario.id] ? funcionario.senha : '••••••••'}
                              </Typography>
                              <IconButton onClick={() => handleClickShowPassword(funcionario.id)} size="small">
                                {showPassword[funcionario.id] ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </Stack>
                          )}
                        </TableCell>

                        <TableCell>
                          {editandoId === funcionario.id ? (
                            <Stack direction="row" spacing={1}>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={salvarEdicao}
                                disabled={loading}
                              >
                                Salvar
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={cancelarEdicao}
                                disabled={loading}
                              >
                                Cancelar
                              </Button>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={1}>
                              <Button
                                sx={{ backgroundColor: 'var(--secondary-color)', width: '90px' }}
                                onClick={() => editarDados(funcionario.id)}
                                disabled={loading}
                              >
                                <IconButton>
                                  <Edit sx={{ color: 'white' }} />
                                </IconButton>
                              </Button>
                              <Button
                                sx={{ backgroundColor: 'var(--primary-color)', width: '90px' }}
                                onClick={() => handleDelete(funcionario.id)}
                                disabled={loading}
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
                      <TableCell colSpan={8} align="center">
                        Nenhum funcionário cadastrado
                      </TableCell>
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
    </Box>
  )
}

export default GerenciamentoFuncionarios