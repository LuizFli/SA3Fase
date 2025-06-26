import { Avatar, Box, Button, Stack, TextField, Typography, MenuItem, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'

function CadastroFuncionario() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [sexo, setSexo] = React.useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const [modoEdicao, setModoEdicao] = useState(false);
  const [indiceEdicao, setIndiceEdicao] = useState(null);

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
  });

  useEffect(() => {
    const carregarFuncionarioParaEdicao = async () => {
      if (location.state?.indiceParaEditar) {
        const idFuncionario = location.state.indiceParaEditar;
        setModoEdicao(true);
        setIndiceEdicao(idFuncionario);
        try {
          const response = await axios.get(`http://localhost:3000/api/funcionarios/${idFuncionario}`);
          const dados = response.data;
          const dataFormatada = dados.data_nascimento ? new Date(dados.data_nascimento).toISOString().split('T')[0] : '';
          setFuncionario({
            ...dados,
            dataNascimento: dataFormatada,
            confirmacaoSenha: dados.senha
          });
          setSexo(dados.sexo || '');
        } catch (error) {
          console.error("Erro ao carregar funcionário:", error);
          alert("Não foi possível carregar os dados do funcionário para edição.");
        }
      }
    };
    carregarFuncionarioParaEdicao();
  }, [location.state]);

  const mudarValores = (e) => {
    const { id, value } = e.target;
    setFuncionario({ ...funcionario, [id]: value });
  };
  
  const mudarSexo = (e) => {
    const novoSexo = e.target.value;
    setSexo(novoSexo);
    setFuncionario({ ...funcionario, sexo: novoSexo });
  };

  const Cadastrar = async () => {
    if (funcionario.senha !== funcionario.confirmacaoSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const dadosParaEnviar = {
        ...funcionario,
        data_nascimento: funcionario.dataNascimento
    };
    delete dadosParaEnviar.dataNascimento;
    delete dadosParaEnviar.confirmacaoSenha;

    try {
      if (modoEdicao) {
        await axios.put(`http://localhost:3000/api/funcionarios/${indiceEdicao}`, dadosParaEnviar);
        alert("Funcionário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/api/funcionarios", dadosParaEnviar);
        alert("Funcionário cadastrado com sucesso!");
      }
      navigate('/gerenciaFun');
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
      alert(error.response?.data?.erro || "Erro ao salvar funcionário");
    }
  };

  // Validação CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11 || cpf.length === 14;
  };

  const validarRG = (rg) => {
    rg = rg.replace(/\D/g, '');
    return rg.length >= 7;
  };

  const validarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, '');
    return telefone.length >= 10;
  };

  const validarCEP = (cep) => {
    cep = cep.replace(/\D/g, '');
    return cep.length === 8;
  }

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
      confirmacaoSenha: '',
      foto: ''
    });
    setSexo('');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
            {modoEdicao ? 'Edição de Funcionário' : 'Cadastro de Funcionários'}
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
                <TextField 
                  fullWidth 
                  size='small' 
                  id="nome" 
                  label="Nome Completo" 
                  variant="outlined" 
                  type='text' 
                  onChange={mudarValores} 
                  value={funcionario.nome}
                />
                <TextField 
                  fullWidth 
                  size='small' 
                  id="usuario" 
                  label="Nome de usuário" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.usuario}
                />
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
                  onChange={mudarSexo}
                >
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Feminino</MenuItem>
                </TextField>
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField 
                  fullWidth 
                  size='small' 
                  id="cpf" 
                  label="CPF" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.cpf} 
                  error={funcionario.cpf && !validarCPF(funcionario.cpf)}
                  helperText={funcionario.cpf && !validarCPF(funcionario.cpf) ? "CPF inválido" : ""}
                />
                <TextField 
                  fullWidth 
                  size='small' 
                  id="rg" 
                  label="RG" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.rg} 
                  error={funcionario.rg && !validarRG(funcionario.rg)}
                  helperText={funcionario.rg && !validarRG(funcionario.rg) ? "RG inválido (mínimo 7 dígitos)" : ""}
                />
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField 
                  fullWidth 
                  size='small' 
                  id="email" 
                  label="E-mail" 
                  type="email" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.email}
                />
                <TextField 
                  fullWidth 
                  size='small' 
                  id="telefone" 
                  label="Telefone" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.telefone} 
                  error={funcionario.telefone && !validarTelefone(funcionario.telefone)}
                  helperText={funcionario.telefone && !validarTelefone(funcionario.telefone) ? "Telefone inválido (DDD + número)" : ""}
                />
                <TextField 
                  fullWidth 
                  size='small' 
                  id="identificador" 
                  label="Identificador" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.identificador}
                />
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField 
                  fullWidth 
                  size='small' 
                  id="cargo" 
                  label="Cargo do funcionário" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.cargo}
                />
                <TextField 
                  fullWidth 
                  size='small' 
                  id="foto" 
                  label="Foto do funcionário" 
                  type='file' 
                  variant="outlined" 
                  onChange={mudarValores}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& input[type="file"]': {
                      color: 'black',
                    },
                  }}
                />
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField 
                  fullWidth 
                  size='small' 
                  id="rua" 
                  label="Endereço / Nome da Rua" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.rua}
                />
                <TextField 
                  type='number' 
                  size='small' 
                  id="numero" 
                  label="Número" 
                  variant="outlined" 
                  sx={{ width: '120px' }} 
                  onChange={mudarValores} 
                  value={funcionario.numero}
                />
              </Stack>

              <Stack direction="row" sx={{ p: '20px', gap: '20px' }}>
                <TextField 
                  fullWidth 
                  size='small' 
                  id="cidade" 
                  label="Cidade" 
                  variant="outlined" 
                  onChange={mudarValores} 
                  value={funcionario.cidade}
                />
                <TextField 
                  type='text' 
                  size='small' 
                  id="estado" 
                  label="Estado" 
                  variant="outlined" 
                  sx={{ width: '400px' }} 
                  onChange={mudarValores} 
                  value={funcionario.estado}
                />
                <TextField 
                  type='text' 
                  size='small' 
                  id="cep" 
                  label="CEP" 
                  variant="outlined" 
                  sx={{ width: '220px' }} 
                  onChange={mudarValores} 
                  value={funcionario.cep} 
                  error={funcionario.cep && !validarCEP(funcionario.cep)}
                  helperText={funcionario.cep && !validarCEP(funcionario.cep) ? "CEP inválido (8 dígitos)" : ""}
                />
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
                <Button 
                  sx={{ backgroundColor: 'orange', color: 'white', width: '200px' }} 
                  onClick={Cadastrar}
                >
                  {modoEdicao ? 'Atualizar Dados' : 'Cadastrar Dados'}
                </Button>
                <Button 
                  sx={{ backgroundColor: '#ff6961', color: 'white', width: '200px' }} 
                  onClick={ApagarDados}
                >
                  Cancelar/Apagar
                </Button>
              </Stack>

            </Stack>

          </Box>

        </Box>

      </Box>

    </Box>
  )
}

export default CadastroFuncionario;