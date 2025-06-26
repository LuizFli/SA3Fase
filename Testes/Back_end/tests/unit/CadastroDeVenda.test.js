import request from 'supertest';
import app from '../../server.js';
import pool from '../../database.js';

describe('Testes para as rotas de vendas', () => {
  beforeAll(async () => {
    await pool.query('TRUNCATE TABLE vendas RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE produtos RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE funcionarios RESTART IDENTITY CASCADE');

    await pool.query(`
      INSERT INTO produtos (id, marca, modelo, ano, km, placa, cor, valor, ativo) VALUES
      (1, 'Toyota', 'Corolla', 2023, 10000, 'ABC123', 'Preto', 90000.00, true),
      (2, 'Honda', 'Civic', 2022, 20000, 'XYZ567', 'Branco', 85000.00, false)
    `);

    await pool.query(`
      INSERT INTO funcionarios (
        nome, usuario, data_nascimento, sexo, cpf, rg, identificador, email, telefone, cargo,
        rua, numero, cidade, estado, cep, senha, foto_url, ativo
      ) VALUES
      (
        'João', 'joao123', '1990-01-01', 'M', '123.456.789-00', 'MG1234567', 'vendedor1',
        'joao@email.com', '(31) 98765-4321', 'Vendedor', 'Rua A', '123', 'Belo Horizonte', 'MG',
        '30123-456', 'senha123', NULL, true
      ),
      (
        'Maria', 'maria456', '1985-05-15', 'F', '987.654.321-00', 'SP9876543', 'vendedor2',
        'maria@email.com', '(11) 91234-5678', 'Vendedor', 'Rua B', '456', 'São Paulo', 'SP',
        '01234-567', 'senha456', NULL, false
      )
    `);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /api/vendas', () => {
    it('Deve cadastrar uma nova venda com sucesso', async () => {
      const novaVenda = {
        id_produto: 1,
        valor: 50000,
        identificador_vendedor: 'vendedor1',
        auth_code: 'AUTH1234',
      };

      const response = await request(app).post('/api/vendas').send(novaVenda);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('produto', 'Toyota Corolla');
      expect(response.body).toHaveProperty('nome_vendedor', 'João');
    });

    it('Deve retornar erro ao tentar cadastrar venda com produto inativo', async () => {
      const novaVenda = {
        id_produto: 2,
        valor: 40000,
        identificador_vendedor: 'vendedor1',
        auth_code: 'AUTH5678',
      };

      const response = await request(app).post('/api/vendas').send(novaVenda);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('erro', 'Erro ao cadastrar venda');
      expect(response.body).toHaveProperty('mensagem', 'Produto inativo');
    });

    it('Deve retornar erro ao tentar cadastrar venda com vendedor inativo', async () => {
      const novaVenda = {
        id_produto: 1,
        valor: 40000,
        identificador_vendedor: 'vendedor2',
        auth_code: 'AUTH5678',
      };

      const response = await request(app).post('/api/vendas').send(novaVenda);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('erro', 'Erro ao cadastrar venda');
      expect(response.body).toHaveProperty('mensagem', 'Vendedor inativo');
    });
  });
});