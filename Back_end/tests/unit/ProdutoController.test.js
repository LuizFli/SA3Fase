import ProdutoController from '../../controllers/ProdutoController.js';
import pool from '../../database.js';

jest.mock('../../database.js', () => ({
  query: jest.fn(),
}));

describe('ProdutoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postProduto', () => {
    test('deve criar um produto com sucesso quando todos os campos obrigatórios são fornecidos', async () => {
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
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNewProduct = { id: 1, ...req.body };
      pool.query.mockResolvedValue({ rows: [mockNewProduct] });

      await ProdutoController.postProduto(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewProduct);
    });

    test('deve retornar erro quando campos obrigatórios estão faltando', async () => {
      const req = {
        body: {
          placa: 'INCO-0000',
          marca: 'Fiat',
          // Faltando modelo, km, cor, valor, ano para simular o erro
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ProdutoController.postProduto(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ erro: "Todos os campos são obrigatórios." });
    });
  });

  describe('getProdutos', () => {
    test('deve retornar lista de produtos com paginação e ordenação padrão', async () => {
      const req = { query: { page: '1', pageSize: '10' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockProdutos = [
        { id: 1, placa: 'ABC-1234', marca: 'Toyota', modelo: 'Corolla', km: 50000, cor: 'Prata', valor: 85000, ano: 2020, ativo: true },
        { id: 2, placa: 'XYZ-5678', marca: 'Honda', modelo: 'Civic', km: 30000, cor: 'Preto', valor: 70000, ano: 2021, ativo: true },
      ];

      // Mock para a query de contagem
      pool.query
        .mockResolvedValueOnce({ rows: [{ count: 2 }] }) // Primeira chamada - contagem
        .mockResolvedValueOnce({ rows: mockProdutos }); // Segunda chamada - produtos

      await ProdutoController.getProdutos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        produtos: mockProdutos,
        total: 2,
        page: 1,
        pageSize: 10,
      });
    });
  });
});
