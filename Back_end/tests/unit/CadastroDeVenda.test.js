import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CadastroDeVenda from '../../src/components/CadastroDeVenda';

// Mock dos dados
const mockProdutos = [
  {
    id: 1,
    marca: 'Fiat',
    modelo: 'Uno',
    ano: '2020',
    placa: 'ABC1234',
    valor: 20000,
    ativo: true
  }
];

const mockFuncionarios = [
  {
    identificador: 'joabe123',
    nome: 'Joabe',
    ativo: true
  },
  {
    identificador: 'arthur123',
    nome: 'Arthur',
    ativo: false
  }
];

// Mock do useGlobal
jest.mock('../../src/contexts/GlobalProvider', () => ({
  useGlobal: () => ({
    produtos: mockProdutos,
    funcionarios: mockFuncionarios,
    updateProdutos: jest.fn()
  })
}));

// Mock da API
jest.mock('../../src/api/vendasApi', () => ({
  cadastrarVenda: jest.fn(),
  fetchProdutosAtivos: jest.fn().mockResolvedValue(mockProdutos)
}));

describe('CadastroDeVenda', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Cenário: Cadastro de venda com informações válidas', () => {
    it('deve registrar a venda com sucesso', async () => {
      const mockOnClose = jest.fn();
      const mockOnVendaCadastrada = jest.fn();
      
      const { cadastrarVenda } = require('../../src/api/vendasApi');
      cadastrarVenda.mockResolvedValue({
        id_produto: 1,
        produto: 'Fiat Uno',
        valor: 20000,
        identificador_vendedor: 'joabe123',
        auth_code: 'A1B2C3'
      });

      render(
        <CadastroDeVenda 
          onClose={mockOnClose} 
          onVendaCadastrada={mockOnVendaCadastrada} 
        />
      );

      // Selecionar veículo
      fireEvent.change(screen.getByLabelText('Veículo'), { target: { value: '1' } });
      
      // Preencher campos
      fireEvent.change(screen.getByLabelText('Identificador do Vendedor'), {
        target: { value: 'joabe123' }
      });
      fireEvent.change(screen.getByLabelText('Código de Autorização'), {
        target: { value: 'A1B2C3' }
      });

      // Clicar em salvar
      fireEvent.click(screen.getByText('Cadastrar Venda'));

      await waitFor(() => {
        expect(cadastrarVenda).toHaveBeenCalledWith({
          id_produto: 1,
          valor: 20000,
          identificador_vendedor: 'joabe123',
          auth_code: 'A1B2C3'
        });
        expect(mockOnVendaCadastrada).toHaveBeenCalled();
      });
    });
  });

  describe('Cenário: Cadastro de venda sem identificador do vendedor', () => {
    it('deve mostrar mensagem de erro', async () => {
      render(<CadastroDeVenda onClose={jest.fn()} />);

      // Selecionar veículo
      fireEvent.change(screen.getByLabelText('Veículo'), { target: { value: '1' } });
      
      // Não preencher identificador do vendedor
      // Preencher código autenticador
      fireEvent.change(screen.getByLabelText('Código de Autorização'), {
        target: { value: 'A1B2C3' }
      });

      // Clicar em salvar
      fireEvent.click(screen.getByText('Cadastrar Venda'));

      await waitFor(() => {
        expect(screen.getByText('Informe o vendedor')).toBeInTheDocument();
      });
    });
  });

  describe('Cenário: Cadastro de venda com funcionário inativo', () => {
    it('deve mostrar mensagem de erro', async () => {
      const { cadastrarVenda } = require('../../src/api/vendasApi');
      cadastrarVenda.mockRejectedValue(new Error('Funcionário inativo'));

      render(<CadastroDeVenda onClose={jest.fn()} />);

      // Selecionar veículo
      fireEvent.change(screen.getByLabelText('Veículo'), { target: { value: '1' } });
      
      // Preencher com identificador de funcionário inativo
      fireEvent.change(screen.getByLabelText('Identificador do Vendedor'), {
        target: { value: 'arthur123' }
      });
      fireEvent.change(screen.getByLabelText('Código de Autorização'), {
        target: { value: 'Z3X2Y1' }
      });

      // Clicar em salvar
      fireEvent.click(screen.getByText('Cadastrar Venda'));

      await waitFor(() => {
        expect(screen.getByText(/Funcionário inativo/)).toBeInTheDocument();
      });
    });
  });
});