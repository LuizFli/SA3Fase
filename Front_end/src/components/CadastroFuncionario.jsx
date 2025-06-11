import { Avatar, Box, Button, Stack, TextField, Typography, MenuItem, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import NavBar from './NavBar'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useGlobal } from '../contexts/GlobalProvider'

function CadastroFuncionario() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [sexo, setSexo] = React.useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const [modoEdicao, setModoEdicao] = useState(false);
  const [indiceEdicao, setIndiceEdicao] = useState(null);
  const { funcionarios, setFuncionarios } = useGlobal();


  const [funcionario, setFuncionario] = useState({
    nome: '',
    usuario: '',
    dataNascimento: '',
    sexo: '',
    cpf: '',
    rg: '',
    identificador: '',
    email: '',
    telefone: '',
    cargo: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    cep: '',
    senha: '',
    confirmacaoSenha: '',
    foto: '',
    financeiro: {
      meta: '',
      vendaTotal: '',
      comissao: ''
    }

  })

  // UseEfeito para carregar dados quando em modo de edição
  useEffect(() => {
    if (location.state?.funcionarioParaEditar) {
      setFuncionario(location.state.funcionarioParaEditar);
      setModoEdicao(true);
      setIndiceEdicao(location.state.indiceParaEditar);
    }
  }, [location]);

  function mudarValores(e) {
    const { id, value } = e.target;
    setFuncionario({
      ...funcionario,
      [id]: value
    });
  }

  function Cadastrar() {

    const camposObrigatorios = [
      'nome', 'usuario', 'dataNascimento', 'sexo', 'cpf', 'rg', 'identificador', 'email',
      'telefone', 'cargo', 'rua', 'numero', 'cidade', 'estado', 'cep',
      'senha', 'confirmacaoSenha'
    ];

    const campoFaltante = camposObrigatorios.find(campo => !funcionario[campo]);
    if (campoFaltante) {
      alert(`Por favor, preencha o campo ${campoFaltante}`);
      return;
    }

    if (funcionario.senha !== funcionario.confirmacaoSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // Obter lista existente ou criar nova
    const listaFuncionarios = JSON.parse(localStorage.getItem('funcionarios') || '[]');

    if (modoEdicao) {
      // Modo edição - atualiza o funcionário existente
      listaFuncionarios[indiceEdicao] = funcionario;
      localStorage.setItem('funcionarios', JSON.stringify(listaFuncionarios));
      setFuncionarios(listaFuncionarios);
      alert("Funcionário atualizado com sucesso!");
      navigate('/gerenciaFun');
      return;
    }

    // Atualiza o estado global
    setFuncionarios(listaFuncionarios); //provalvelmente vai ser elimanada daqui essa linha

    // Modo cadastro: Verificar se usuário já existe
    const usuarioExistente = listaFuncionarios.some(
      f => f.usuario === funcionario.usuario
    );

    if (usuarioExistente) {
      alert('Já existe um funcionário com este nome de usuário');
      return;
    }

    // Adiciona novo funcionário
    const novaLista = [...listaFuncionarios, funcionario];
    localStorage.setItem('funcionarios', JSON.stringify(novaLista));
    // Atualiza o estado global
    setFuncionarios(novaLista);
    alert("Funcionário cadastrado com sucesso!");
    navigate('/gerenciaFun');
    ApagarDados();

  };

  // Validação CPF
  const validarCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11 || cpf.length === 14; // 11 dígitos ou 14 com formatação
  };

  const validarRG = (rg) => {
    rg = rg.replace(/\D/g, '');
    // validação de RG
    return rg.length >= 7;
  };

  const validarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, '');
    return telefone.length >= 10; // DDD + número (8 ou 9 dígitos)
  };


  function ApagarDados() {

    setFuncionario({
      nome: '',
      usuario: '',
      dataNascimento: '',
      sexo: '',
      cpf: '',
      rg: '',
      identificador: '',
      email: '',
      telefone: '',
      cargo: '',
      rua: '',
      numero: '',
      cidade: '',
      estado: '',
      cep: '',
      senha: '',
      confirmacaoSenha: ''
    })

  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
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
                <TextField fullWidth size='small' id="nome" label="Nome Completo" variant="outlined" onChange={mudarValores} value={funcionario.nome}></TextField>
                <TextField fullWidth size='small' id="usuario" label="Nome de usuário" variant="outlined" onChange={mudarValores} value={funcionario.usuario}></TextField>
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
                  onChange={mudarValores}
                  value={funcionario.dataNascimento}
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
                  onBlur={() => setFuncionario({ ...funcionario, sexo })} // atualizar o estado do funcionário quando o sexo muda/altera
                >
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Feminino</MenuItem>

                </TextField>
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField fullWidth size='small' id="cpf" label="CPF" variant="outlined" onChange={mudarValores} value={funcionario.cpf} error={funcionario.cpf && !validarCPF(funcionario.cpf)}
                  helperText={funcionario.cpf && !validarCPF(funcionario.cpf) ? "CPF inválido" : ""}></TextField>
                <TextField fullWidth size='small' id="rg" label="RG" variant="outlined" onChange={mudarValores} value={funcionario.rg} error={funcionario.rg && !validarRG(funcionario.rg)}
                  helperText={funcionario.rg && !validarRG(funcionario.rg) ? "RG inválido (mínimo 7 dígitos)" : ""}></TextField>
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField fullWidth size='small' id="email" label="E-mail" type="email" variant="outlined" onChange={mudarValores} value={funcionario.email}></TextField>
                <TextField fullWidth size='small' id="telefone" label="Telefone" variant="outlined" onChange={mudarValores} value={funcionario.telefone} error={funcionario.telefone && !validarTelefone(funcionario.telefone)}
                  helperText={funcionario.telefone && !validarTelefone(funcionario.telefone) ? "Telefone inválido (DDD + número)" : ""}></TextField>
                <TextField fullWidth size='small' id="identificador" label="Identificador" variant="outlined" onChange={mudarValores} value={funcionario.identificador}></TextField>
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField fullWidth size='small' id="cargo" label="Cargo do funcionário" variant="outlined" onChange={mudarValores} value={funcionario.cargo}></TextField>
                <TextField fullWidth size='small' id="foto" label="foto do funcionário" type='file' variant="outlined" onChange={mudarValores} value={funcionario.foto}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& input[type="file"]': {
                      color: 'black',
                    },
                    '& input[type="file"]::-picture': {
                      filter: 'invert(1)',
                    },
                  }}
                ></TextField>
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField fullWidth size='small' id="rua" label="Endereço / Nome da Rua" variant="outlined" onChange={mudarValores} value={funcionario.rua}></TextField>
                <TextField type='' size='small' id="numero" label="Número" variant="outlined" sx={{ width: '120px' }} onChange={mudarValores} value={funcionario.numero}></TextField>
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField fullWidth size='small' id="cidade" label="Cidade" variant="outlined" onChange={mudarValores} value={funcionario.cidade}></TextField>
                <TextField type='text' size='small' id="estado" label="Estado" variant="outlined" sx={{ width: '400px' }} onChange={mudarValores} value={funcionario.estado}></TextField>
                <TextField type='text' size='small' id="cep" label="CEP" variant="outlined" sx={{ width: '220px' }} onChange={mudarValores} value={funcionario.cep}></TextField>
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
                  value={funcionario.senha}
                  onChange={mudarValores}
                />
                <TextField
                  fullWidth
                  size='small'
                  id="confirmacaoSenha"
                  label="Confirmação de senha"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  onChange={mudarValores}
                  value={funcionario.confirmacaoSenha}
                />
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px', justifyContent: 'center' }}>
                <Button sx={{ backgroundColor: 'orange', color: 'white', width: '200px' }} onClick={Cadastrar}>Cadastrar Dados</Button>
                <Button sx={{ backgroundColor: '#ff6961', color: 'white', width: '200px' }} onClick={ApagarDados}>Cancelar/Apagar</Button>
              </Stack>

            </Stack>

          </Box>

        </Box>

      </Box>

    </Box>


  )
}


export default CadastroFuncionario