import { Avatar, Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import NavBar from './NavBar'

function CadastroFuncionario() {
  return (
    <div>

      <Box sx={{ p: 0, m: '0', width: '100vw', height: '100vh', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'row' }}>

        <Box sx={{ p: '0', m: '0', width: '17%', height: '100%', backgroundColor: 'cyan', display: 'flex', flexDirection: 'column' }}>
          <NavBar />
        </Box>

        <Box sx={{ p: '0', m: '0', width: '83%', height: '100%', backgroundColor: 'gray', display: 'flex', flexDirection: 'column' }}>

          <Box sx={{ p: '0', m: '0', width: '100%', height: '15%', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'row' }}>

            <Stack sx={{ p: '0', m: '0', width: '70%', height: '100%', backgroundColor: 'blue', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h3" component="h2" sx={{}}>Cadastor de funcionários</Typography>
            </Stack>

            <Stack sx={{ p: '0', m: '0', width: '30%', height: '100%', backgroundColor: 'grey', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'end' }}>
              <Avatar alt="Luís"
                src="public/Imagens/166057870.png" sx={{ width: 60, height: 60, marginRight: '15px' }}></Avatar>
            </Stack>

          </Box>

          <Box sx={{ p: '0', m: '0', width: '100%', height: '85%', backgroundColor: 'pink', display: 'flex', flexDirection: 'row' }}>

            <Stack direction="column" sx={{ width: '68%', backgroundColor: 'gray', padding: '15px' }}>

              <Stack direction="row" size={{ xs: 12 }} sx={{ p: '20px', m: 0, backgroundColor: 'white', borderRadius: '20px', gap: '50px' }}>
                <TextField size='small' id="nome" label="Nome Completo" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="nomeUsuario" label="Nome de usuário" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="dataNascimento" label="Data de Nascimento" variant="outlined" sx={{ width: '30%' }}></TextField>
              </Stack>

              <Stack direction="row" size={{ xs: 12 }} sx={{ p: '20px', m: 0, backgroundColor: 'white', borderRadius: '20px', gap: '50px' }}>
                <TextField size='small' id="sexo" label="Sexo (M/F)" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="Cpf" label="CPF" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="Rg" label="RG" variant="outlined" sx={{ width: '30%' }}></TextField>
              </Stack>

              <Stack direction="row" size={{ xs: 12 }} sx={{ p: '20px', m: 0, backgroundColor: 'white', borderRadius: '20px', gap: '50px' }}>
                <TextField size='small' id="Email" label="E-mail" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="telefone" label="telefone" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="cargo" label="Cargo do funcionário" variant="outlined" sx={{ width: '30%' }}></TextField>
              </Stack>

              <Stack direction="row" size={{ xs: 12 }} sx={{ p: '20px', m: 0, backgroundColor: 'white', borderRadius: '20px', gap: '15px' }}>
                <TextField size='small' id="rua" label="Endereço / Nome da Rua" variant="outlined" sx={{ width: '50%' }}></TextField>
                <TextField size='small' id="numero" label="Número" variant="outlined" sx={{ width: '15%' }}></TextField>
                <TextField size='small' id="estado" label="Estado" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="cidade" label="Cidade" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="cep" label="CEP" variant="outlined" sx={{ width: '30%' }}></TextField>
              </Stack>

              <Stack direction="row" size={{ xs: 12 }} sx={{ p: '20px', m: 0, backgroundColor: 'white', borderRadius: '20px', gap: '50px' }}>
                <TextField size='small' id="senha" label="Senha" variant="outlined" sx={{ width: '30%' }}></TextField>
                <TextField size='small' id="confirmacaoSenha" label="Confirmação de senha" variant="outlined" sx={{ width: '30%' }}></TextField>
              </Stack>

              <Stack direction="row" size={{ xs: 12 }} sx={{ p: '20px', m: 0, backgroundColor: 'white', borderRadius: '20px', gap: '50px' }}>
                <Button>
                  
                </Button>
              </Stack>


            </Stack>

          </Box>

        </Box>

      </Box>

    </div>
  )
}

export default CadastroFuncionario
