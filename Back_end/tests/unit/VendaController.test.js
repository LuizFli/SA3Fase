
import VendaService from '../../services/vendasServices.js';

// Mock completo do serviço
jest.mock('../../services/vendasServices.js');

describe('VendaController', () => {
  // Objetos mock para simular requisições e respostas
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockRequest = {
      query: {},
      params: {},
      body: {}
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('GET /vendas - Filtros', () => {
    // Teste para filtro por data
    it('deve filtrar vendas por intervalo de datas', async () => {
      const mockVendas = [{
        id: 1,
        produto: "Fiat Argo",
        data: "2023-06-15",
        valor: 75000
      }];

      // Configura o mock do serviço
      VendaService.getVendas.mockResolvedValue(mockVendas);
      
      // Simula os query params
      mockRequest.query = {
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      };

      await VendaController.getVendas(mockRequest, mockResponse);

      // Verificações
      expect(VendaService.getVendas).toHaveBeenCalledWith({
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockVendas);
    });

    // Teste para filtro por vendedor
    it('deve filtrar vendas por identificador do vendedor', async () => {
      const mockVendas = [{
        id: 2,
        produto: "VW Gol",
        identificador_vendedor: "VEND-001",
        nome_vendedor: "João Silva"
      }];

      VendaService.getVendas.mockResolvedValue(mockVendas);
      mockRequest.query = { searchTerm: 'VEND-001' };

      await VendaController.getVendas(mockRequest, mockResponse);

      expect(VendaService.getVendas).toHaveBeenCalledWith({
        searchTerm: 'VEND-001'
      });
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            identificador_vendedor: 'VEND-001'
          })
        ])
      );
    });

    // Teste para filtro por carro (marca/modelo)
    it('deve filtrar vendas por marca/modelo do carro', async () => {
      const mockVendas = [{
        id: 3,
        id_produto: 10,
        produto: "Fiat Strada",
        marca: "Fiat",
        modelo: "Strada"
      }];

      VendaService.getVendas.mockResolvedValue(mockVendas);
      mockRequest.query = { searchTerm: 'Strada' };

      await VendaController.getVendas(mockRequest, mockResponse);

      expect(VendaService.getVendas).toHaveBeenCalledWith({
        searchTerm: 'Strada'
      });
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            modelo: 'Strada'
          })
        ])
      );
    });

    // Teste para combinação de filtros
    it('deve combinar filtros de data, vendedor e carro', async () => {
      const mockVendas = [{
        id: 4,
        produto: "Fiat Toro",
        data: "2023-03-20",
        identificador_vendedor: "VEND-002",
        nome_vendedor: "Maria Souza"
      }];

      VendaService.getVendas.mockResolvedValue(mockVendas);
      mockRequest.query = {
        searchTerm: 'Toro',
        identificador_vendedor: 'VEND-002',
        startDate: '2023-01-01',
        endDate: '2023-06-30'
      };

      await VendaController.getVendas(mockRequest, mockResponse);

      expect(VendaService.getVendas).toHaveBeenCalledWith({
        searchTerm: 'Toro',
        identificador_vendedor: 'VEND-002',
        startDate: '2023-01-01',
        endDate: '2023-06-30'
      });
    });
  });
});