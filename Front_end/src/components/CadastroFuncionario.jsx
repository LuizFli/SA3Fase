import { Avatar, Box, Button, Stack, TextField, Typography, MenuItem, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import NavBar from './NavBar'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function CadastroFuncionario() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [sexo, setSexo] = React.useState('')
  const [funcionarios, setFuncionarios] = useState({
    nome: '',
    usuario: '',
    dataNascimento: '',
    sexo: '',
    cpf: '',
    rg: '',
    email: '',
    telefone: '',
    cargo: '',
    rua: '', 
    numero: '',
    cidade: '',
    estado: '', 
    cep: '',
    


  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
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
              Cadastro de funcionários
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
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 3,
              overflow: 'hidden'
            }}>

              <Stack direction="column" sx={{ width: '90%', padding: '20px' }}>

                <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                  <TextField fullWidth size='small' id="nome" label="Nome Completo" variant="outlined"></TextField>
                  <TextField fullWidth size='small' id="nomeUsuario" label="Nome de usuário" variant="outlined"></TextField>
                </Stack>

                <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    id="dataNascimento"
                    label="Data de Nascimento"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& input[type="date"]': {
                        color: 'black', 
                      },
                      '& input[type="date"]::-webkit-calendar-picker-indicator': {
                        filter: 'invert(1)', 
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    size='small'
                    id="sexo"
                    label="Sexo"
                    select
                    variant="outlined"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                  >
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Feminino</MenuItem>
                  </TextField>
                </Stack>

                <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                  <TextField fullWidth size='small' id="Cpf" label="CPF" variant="outlined" value={cpf} onChange={(e) => setCpf(e.target.value)}></TextField>
                  <TextField fullWidth size='small' id="Rg" label="RG" variant="outlined"></TextField>
                </Stack>

                <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                  <TextField fullWidth size='small' id="Email" label="E-mail" type="email" variant="outlined"></TextField>
                  <TextField fullWidth size='small' id="telefone" label="Telefone" variant="outlined"></TextField>
                </Stack>

                <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                  <TextField fullWidth size='small' id="cargo" label="Cargo do funcionário" variant="outlined"></TextField>
                </Stack>

                <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                  <TextField fullWidth size='small' id="rua" label="Endereço / Nome da Rua" variant="outlined"></TextField>
                  <TextField size='small' id="numero" label="Número" variant="outlined" sx={{ width: '120px' }}></TextField>
                </Stack>

                <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                  <TextField fullWidth size='small' id="cidade" label="Cidade" variant="outlined"></TextField>
                  <TextField size='small' id="estado" label="Estado" variant="outlined" sx={{ width: '120px' }}></TextField>
                  <TextField size='small' id="cep" label="CEP" variant="outlined" sx={{ width: '120px' }}></TextField>
                </Stack>

                <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                  <TextField
                    fullWidth
                    size='small'
                    id="senha"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    fullWidth
                    size='small'
                    id="confirmacaoSenha"
                    label="Confirmação de senha"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                  />
                </Stack>

                <Stack direction="row" sx={{ p: '20px', gap: '20px', justifyContent: 'center' }}>
                  <Button sx={{ backgroundColor: 'orange', color: 'white', width: '200px' }}>Cadastrar Dados</Button>
                  <Button sx={{ backgroundColor: '#ff6961', color: 'white', width: '200px' }}>Cancelar/Apagar</Button>
                </Stack>

              </Stack>

            </Box>

          </Box>

        </Box>

      </Box>

    
  )
}

export default CadastroFuncionario