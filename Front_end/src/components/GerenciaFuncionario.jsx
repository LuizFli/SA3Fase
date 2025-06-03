import { Avatar, Box, Button, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { Delete, Edit, Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router'

function GerenciamentoFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [showPassword, setShowPassword] = useState({})
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
    navigate('/funcionarios', {
      state: {
        funcionarioParaEditar: funcionarios[index],
        indiceParaEditar: index
      }
    });
    
    const novosFuncionarios = [...funcionarios]
    novosFuncionarios.
    setFuncionarios(novosFuncionarios)
    localStorage.setItem('funcionarios', JSON.stringify(novosFuncionarios))
  }

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
      backgroundColor: 'whitesmoke', 
      display: 'flex', 
      flexDirection: 'row',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        p: '0', 
        m: '0', 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#EBDFD7', 
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
          <Typography variant="h3" component="h2" sx={{color: '#133337', fontWeight: 'bold'}}>
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
                    <TableCell>CPF</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Cargo</TableCell>
                    <TableCell>Senha</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {funcionarios.length > 0 ? (
                    funcionarios.map((funcionario, index) => (
                      <TableRow key={index}>
                        <TableCell>{funcionario.nome}</TableCell>
                        <TableCell>{funcionario.usuario}</TableCell>
                        <TableCell>{funcionario.cpf}</TableCell>
                        <TableCell>{funcionario.telefone}</TableCell>
                        <TableCell>{funcionario.cargo}</TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center">
                            {showPassword[index] ? funcionario.senha : '••••••••'}
                            <IconButton onClick={() => handleClickShowPassword(index)} size="small">
                              {showPassword[index] ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <IconButton color="primary" aria-label="editar" onClick={() => editarDados(index)}>
                              <Edit />
                            </IconButton>
                            <IconButton color="error" aria-label="deletar" onClick={() => handleDelete(index)}>
                              <Delete />
                            </IconButton>
                          </Stack>
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
                onClick={() => navigate('/funcionarios')}
              >
                Adicionar Funcionário
              </Button>

              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ width: '200px' }}
                onClick={() => {
                  localStorage.removeItem('funcionarios')
                  setFuncionarios([])
                }}
              >
                Limpar Todos
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
            </Stack>

          </Box>

        </Box>

      </Box>
    </Box>
  )
}

export default GerenciamentoFuncionarios