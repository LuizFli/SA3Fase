import VendaService from '../../services/vendasServices.js';
import pool from '../../database.js';

jest.mock('../../database.js', () => ({
  query: jest.fn(),
  connect: jest.fn()
}));

describe('Testes para cadastro de vendas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProdutos = {
    1: { id: 1, marca: 'Toyota', modelo: 'Corolla', valor: 90000.00, ativo: true },
    2: { id: 2, marca: 'Honda', modelo: 'Civic', valor: 85000.00, ativo: false }
  };

  const mockFuncionarios = {
    'vendedor1': { identificador: 'vendedor1', nome: 'João', ativo: true },
    'vendedor2': { identificador: 'vendedor2', nome: 'Maria', ativo: false }
  };

  const mockClient = {
    query: jest.fn(),
    release: jest.fn()
  };

  describe('Cadastro de vendas', () => {
    test('Deve cadastrar uma nova venda com sucesso', async () => {
      // Mock das consultas do banco
      pool.query
        .mockResolvedValueOnce({ rows: [mockProdutos[1]] }) // Consulta produto
        .mockResolvedValueOnce({ rows: [mockFuncionarios['vendedor1']] }); // Consulta vendedor

      pool.connect.mockResolvedValue(mockClient);
      
      mockClient.query
        .mockResolvedValueOnce() // BEGIN
        .mockResolvedValueOnce({ // INSERT venda
          rows: [{
            id: 1,
            id_produto: 1,
            valor: 50000,
            data: new Date().toISOString(),
            identificador_vendedor: 'vendedor1',
            auth_code: 'AUTH1234'
          }]
        })
        .mockResolvedValueOnce() // UPDATE produto
        .mockResolvedValueOnce(); // COMMIT

      const novaVenda = {
        id_produto: 1,
        valor: 50000,
        identificador_vendedor: 'vendedor1',
        auth_code: 'AUTH1234',
      };

      const result = await VendaService.createVenda(novaVenda);

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('produto', 'Toyota Corolla');
      expect(result).toHaveProperty('nome_vendedor', 'João');
      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    });

    test('Deve retornar erro ao tentar cadastrar venda com produto inexistente', async () => {
      // Mock para produto não encontrado
      pool.query.mockResolvedValueOnce({ rows: [] });

      const novaVenda = {
        id_produto: 999,
        valor: 40000,
        identificador_vendedor: 'vendedor1',
        auth_code: 'AUTH5678',
      };

      await expect(VendaService.createVenda(novaVenda))
        .rejects
        .toThrow('Produto não encontrado');
    });

    test('Deve retornar erro ao tentar cadastrar venda com vendedor inexistente', async () => {
      // Mock das consultas
      pool.query
        .mockResolvedValueOnce({ rows: [mockProdutos[1]] }) // Produto existe
        .mockResolvedValueOnce({ rows: [] }); // Vendedor não existe

      const novaVenda = {
        id_produto: 1,
        valor: 40000,
        identificador_vendedor: 'vendedor999',
        auth_code: 'AUTH5678',
      };

      await expect(VendaService.createVenda(novaVenda))
        .rejects
        .toThrow('Vendedor não encontrado');
    });
  });
});