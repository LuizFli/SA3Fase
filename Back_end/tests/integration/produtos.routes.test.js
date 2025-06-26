// Importações necessárias para os testes de rota
import request from 'supertest';
import express from 'express';
import { expect } from 'chai'; // Usando chai para asserções
import sinon from 'sinon'; // Para mockar o pool de banco de dados
import pool from '../database.js'; // Importe o pool de banco de dados real

// Importa o controlador e cria um router simples para as rotas de produtos
import ProdutoController from '../controllers/ProdutoController.js';
const router = express.Router();

// Define as rotas essenciais para os testes
router.get('/produtos', ProdutoController.getProdutos);
router.post('/produtos', ProdutoController.postProduto);

const app = express();
app.use(express.json());
app.use(router);

describe('Rotas de Produtos', () => {
  let poolQueryStub;

  // Antes de cada teste, stub o pool.query
  beforeEach(() => {
    poolQueryStub = sinon.stub(pool, 'query');
  });

  // Após cada teste, restaure o stub
  afterEach(() => {
    sinon.restore();
  });

  // Teste: POST /produtos - deve criar um novo produto com campos válidos
  it('POST /produtos - deve criar um novo produto com campos válidos', async () => {
    const novoProduto = {
      placa: 'ABC-1234',
      marca: 'Toyota',
      modelo: 'Corolla',
      km: 50000,
      cor: 'Prata',
      valor: 85000.00,
      ano: 2020,
    };

    // Mockar o retorno do pool.query para a inserção
    poolQueryStub.resolves({ rows: [{ id: 1, ...novoProduto }] });

    const response = await request(app)
      .post('/produtos')
      .send(novoProduto);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.placa).to.equal(novoProduto.placa);
  });

  // Teste: POST /produtos - deve retornar erro quando campos obrigatórios estão faltando
  it('POST /produtos - deve retornar erro quando campos obrigatórios estão faltando', async () => {
    const produtoIncompleto = {
      placa: 'DEF-5678',
      marca: 'Honda',
      // Faltando outros campos obrigatórios para simular o erro
    };

    const response = await request(app)
      .post('/produtos')
      .send(produtoIncompleto);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('erro', 'Todos os campos são obrigatórios.');
  });

  // Teste: GET /produtos - deve retornar lista de produtos com paginação e ordenação padrão
  it('GET /produtos - deve retornar lista de produtos com paginação e ordenação padrão', async () => {
    const mockProdutos = [
      { id: 1, placa: 'ABC-1234', marca: 'Toyota', modelo: 'Corolla', km: 50000, cor: 'Prata', valor: 85000, ano: 2020, ativo: true },
      { id: 2, placa: 'XYZ-5678', marca: 'Honda', modelo: 'Civic', km: 30000, cor: 'Preto', valor: 70000, ano: 2021, ativo: true },
    ];

    // Mockar o retorno para a contagem total
    poolQueryStub.onFirstCall().resolves({ rows: [{ count: 2 }] });
    // Mockar o retorno para a lista de produtos
    poolQueryStub.onSecondCall().resolves({ rows: mockProdutos });

    const response = await request(app).get('/produtos');

    expect(response.status).to.equal(200);
    expect(response.body.produtos).to.be.an('array').with.lengthOf(2);
    expect(response.body.total).to.equal(2);
    expect(response.body.page).to.equal(1);
  });
});
