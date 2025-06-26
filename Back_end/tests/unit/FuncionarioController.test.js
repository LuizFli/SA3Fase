// backend/tests/unit/FuncionarioController.test.js
import FuncionarioController from '../../controllers/FuncionarioController.js';
import pool from '../../database.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('FuncionarioController - Cadastro com sucesso', () => {
  afterEach(() => {
    sinon.restore(); // Limpa todos os stubs após cada teste
  });

  it('deve cadastrar funcionário quando todos campos obrigatórios são preenchidos', async () => {
    // 1. Setup - Dados de teste
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

    // 2. Mock - Simula o banco de dados
    const mockResultado = { id: 1, ...funcionarioValido };
    sinon.stub(pool, 'query').resolves({ rows: [mockResultado] });

    // 3. Execução - Chama a função do controller
    const req = { body: funcionarioValido };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await FuncionarioController.postFuncionario(req, res);

    // 4. Verificação - Confirma o comportamento esperado
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(mockResultado)).to.be.true;
    expect(pool.query.calledOnce).to.be.true;
  });
});