import FuncionarioController from '../../controllers/FuncionarioController.js';
import pool from '../../database.js';

jest.mock('../../database.js', () => ({
  query: jest.fn(),
}));

describe('FuncionarioController - Cadastro com sucesso', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve cadastrar funcionário quando todos campos obrigatórios são preenchidos', async () => {
    const funcionarioValido = {
      nome: 'Ana Silva',
      usuario: 'ana.silva',
      data_nascimento: '1990-01-01',
      sexo: 'F',
      cpf: '12345678901',
      rg: '1234567',
      identificador: 'func123',
      email: 'ana@empresa.com',
      telefone: '11999999999',
      cargo: 'Atendente',
      rua: 'Rua das Flores',
      numero: '100',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01001000',
      senha: 'senhaSegura123',
      foto: 'foto.jpg'
    };

    const mockResultado = { id: 1, ...funcionarioValido };
    pool.query.mockResolvedValue({ rows: [mockResultado] });

    const req = { body: funcionarioValido };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await FuncionarioController.postFuncionario(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResultado);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test('deve retornar erro quando campos obrigatórios não são preenchidos', async () => {
    const funcionarioIncompleto = {
      nome: 'Ana Silva',
      usuario: '',
      data_nascimento: '',
      sexo: '',
      cpf: '',
      rg: '1234567',
      identificador: '',
      email: '',
      telefone: '11999999999',
      cargo: 'Atendente',
      rua: 'Rua das Flores',
      numero: '100',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01001000',
      senha: 'senhaSegura123',
      foto: 'foto.jpg'
    };

    // Mock para simular erro do banco ao tentar inserir dados incompletos
    pool.query.mockRejectedValue(new Error('valor nulo na coluna "usuario" viola restrição não nula'));

    const req = { body: funcionarioIncompleto };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await FuncionarioController.postFuncionario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: "Erro ao criar funcionário" });
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test('deve editar dados de um funcionário existente com sucesso', async () => {
    const funcionarioId = 1;
    const dadosAtualizados = {
      nome: 'Ana Silva Santos',
      usuario: 'ana.santos',
      data_nascimento: '1990-01-01',
      sexo: 'F',
      cpf: '12345678901',
      rg: '1234567',
      identificador: 'func123',
      email: 'ana.santos@empresa.com', 
      telefone: '11888888888', 
      cargo: 'Gerente',
      rua: 'Rua das Flores',
      numero: '100',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01001000',
      senha: 'novaSenhaSegura123',
      foto: 'nova_foto.jpg'
    };

    const mockResultadoAtualizado = { id: funcionarioId, ...dadosAtualizados };
    pool.query.mockResolvedValue({ rows: [mockResultadoAtualizado] });

    const req = { 
      params: { id: funcionarioId },
      body: dadosAtualizados 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await FuncionarioController.putFuncionario(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResultadoAtualizado);
    expect(pool.query).toHaveBeenCalledTimes(1);
    
    const queryCall = pool.query.mock.calls[0];
    expect(queryCall[0]).toContain('UPDATE funcionarios SET');
    expect(queryCall[1]).toContain(funcionarioId); 
  });
});