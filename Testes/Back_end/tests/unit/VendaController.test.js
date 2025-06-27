import VendaService from '../../../Back_end/services/vendasServices.js';
import pool from '../../../Back_end/database.js';

jest.mock('../../../Back_end/database.js', () => ({
  query: jest.fn(),
}));

describe('VendaService - Filtros de Busca', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock mais inteligente que filtra os resultados
  const mockQueryImplementation = (query, params) => {
    const mockVendas = [
      {
        id: 1,
        produto: 'Samsung Galaxy S20',
        nome_vendedor: 'João Silva'
      },
      {
        id: 2,
        produto: 'iPhone 13',
        nome_vendedor: 'Maria Souza'
      },
      {
        id: 3,
        produto: 'Xiaomi Redmi Note 10',
        nome_vendedor: 'João Silva'
      }
    ];

    // Filtra os resultados baseado nos parâmetros
    let filtered = [...mockVendas];
    
    if (params?.includes('%iPhone%')) {
      filtered = mockVendas.filter(v => v.produto.includes('iPhone'));
    }
    
    if (params?.includes('%João%')) {
      filtered = mockVendas.filter(v => v.nome_vendedor.includes('João'));
    }

    return { rows: filtered };
  };

  test('Deve filtrar vendas por período de datas', async () => {
    pool.query.mockImplementation(mockQueryImplementation);
    
    const filters = {
      startDate: '2023-01-01',
      endDate: '2023-02-28'
    };

    await VendaService.getVendas(filters);
    
    // Verificação mais flexível
    expect(pool.query.mock.calls[0][0]).toMatch(/v\.data >= \$1 AND v\.data <= \$2/);
    expect(pool.query.mock.calls[0][1]).toEqual([filters.startDate, filters.endDate]);
  });

  test('Deve filtrar vendas por nome do vendedor', async () => {
    pool.query.mockImplementation(mockQueryImplementation);
    
    const filters = {
      searchTerm: 'João'
    };

    const result = await VendaService.getVendas(filters);
    
    expect(result).toHaveLength(2);
    expect(result.every(v => v.nome_vendedor.includes('João'))).toBeTruthy();
  });

  test('Deve filtrar vendas por nome/marca do produto', async () => {
    pool.query.mockImplementation(mockQueryImplementation);
    
    const filters = {
      searchTerm: 'iPhone'
    };

    const result = await VendaService.getVendas(filters);
    
    expect(result).toHaveLength(1);
    expect(result[0].produto).toBe('iPhone 13');
  });
});