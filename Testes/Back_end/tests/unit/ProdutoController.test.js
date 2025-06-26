// Importações necessárias para os testes de unidade
import ProdutoController from '../../controllers/ProdutoController.js';
import pool from '../../database.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('ProdutoController', () => {
  // Restaura os stubs após cada teste
  afterEach(() => {
    sinon.restore();
  });

  describe('postProduto', () => {
    // Deve criar um produto com sucesso quando todos os campos obrigatórios são fornecidos
    it('deve criar um produto com sucesso quando todos os campos obrigatórios são fornecidos', async () => {
      const req = {
        body: {
          placa: 'TEST-1234',
          marca: 'Ford',
          modelo: 'Focus',
          km: 25000,
          cor: 'Branco',
          valor: 60000.00,
          ano: 2018,
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      const mockNewProduct = { id: 1, ...req.body };
      sinon.stub(pool, 'query').resolves({ rows: [mockNewProduct] });

      await ProdutoController.postProduto(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(mockNewProduct)).to.be.true;
    });

    // Deve retornar erro quando campos obrigatórios estão faltando
    it('deve retornar erro quando campos obrigatórios estão faltando', async () => {
      const req = {
        body: {
          placa: 'INCO-0000',
          marca: 'Fiat',
          // Faltando modelo, km, cor, valor, ano para simular o erro
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await ProdutoController.postProduto(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ erro: "Todos os campos são obrigatórios." })).to.be.true;
    });
  });

  describe('getProdutos', () => {
    // Deve retornar lista de produtos com paginação e ordenação padrão
    it('deve retornar lista de produtos com paginação e ordenação padrão', async () => {
      const req = { query: { page: '1', pageSize: '10' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      const mockProdutos = [
        { id: 1, placa: 'ABC-1234', marca: 'Toyota', modelo: 'Corolla', km: 50000, cor: 'Prata', valor: 85000, ano: 2020, ativo: true },
        { id: 2, placa: 'XYZ-5678', marca: 'Honda', modelo: 'Civic', km: 30000, cor: 'Preto', valor: 70000, ano: 2021, ativo: true },
      ];

      // Stub para a query de contagem
      sinon.stub(pool, 'query').onFirstCall().resolves({ rows: [{ count: 2 }] });
      // Stub para a query de seleção de produtos
      pool.query.onSecondCall().resolves({ rows: mockProdutos });

      await ProdutoController.getProdutos(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({
        produtos: mockProdutos,
        total: 2,
        page: 1,
        pageSize: 10,
      })).to.be.true;
    });
  });
});
