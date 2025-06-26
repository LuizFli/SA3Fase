import FuncionarioController from '../../controllers/FuncionarioController.js';
import pool from '../../database.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('FuncionarioController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('postFuncionario', () => {
    it('deve criar um funcionário com sucesso quando todos os campos obrigatórios são fornecidos', async () => {
      const req = {
        body: {
          nome: 'João Silva',
          usuario: 'joao.silva',
          data_nascimento: '1990-01-01',
          sexo: 'M',
          cpf: '12345678901',
          rg: '1234567',
          identificador: '123',
          email: 'joao@example.com',
          telefone: '11999999999',
          cargo: 'Vendedor',
          rua: 'Rua A',
          numero: '123',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01001000',
          senha: 'senha123',
          foto: 'foto.jpg'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      const mockRows = [{ id: 1, ...req.body }];
      sinon.stub(pool, 'query').resolves({ rows: mockRows });

      await FuncionarioController.postFuncionario(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(mockRows[0])).to.be.true;
    });

    it('deve retornar erro quando campos obrigatórios estão faltando', async () => {
      const req = {
        body: {
          // Faltando vários campos obrigatórios
          nome: 'João Silva',
          usuario: 'joao.silva'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await FuncionarioController.postFuncionario(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ erro: 'Erro ao criar funcionário' })).to.be.true;
    });
  });

  describe('getFuncionarios', () => {
    it('deve retornar lista de funcionários ordenada por nome', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      const mockRows = [
        { id: 1, nome: 'Ana Souza' },
        { id: 2, nome: 'João Silva' }
      ];
      sinon.stub(pool, 'query').resolves({ rows: mockRows });

      await FuncionarioController.getFuncionarios(req, res);

      expect(pool.query.calledWith('SELECT * FROM funcionarios ORDER BY nome')).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockRows)).to.be.true;
    });
  });
});