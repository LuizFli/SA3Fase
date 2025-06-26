import request from 'supertest';
import express from 'express';
import router from '../../routes.js';

const app = express();
app.use(express.json());
app.use(router);

describe('Rotas de Funcionários', () => {
  it('POST /funcionarios - deve criar um novo funcionário com campos válidos', async () => {
    const novoFuncionario = {
      nome: 'Maria Oliveira',
      usuario: 'maria.oliveira',
      data_nascimento: '1985-05-15',
      sexo: 'F',
      cpf: '98765432109',
      rg: '7654321',
      identificador: '456',
      email: 'maria@example.com',
      telefone: '11988888888',
      cargo: 'Gerente',
      rua: 'Rua B',
      numero: '456',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '20020000',
      senha: 'senha456',
      foto: 'maria.jpg'
    };

    const response = await request(app)
      .post('/funcionarios')
      .send(novoFuncionario);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novoFuncionario.nome);
  });

  it('POST /funcionarios - deve retornar erro quando campos obrigatórios estão faltando', async () => {
    const funcionarioIncompleto = {
      nome: 'Carlos Souza',
      usuario: 'carlos.souza'
      // Faltando outros campos obrigatórios
    };

    const response = await request(app)
      .post('/funcionarios')
      .send(funcionarioIncompleto);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('erro', 'Erro ao criar funcionário');
  });

  it('GET /funcionarios - deve retornar lista de funcionários ordenada por nome', async () => {
    const response = await request(app).get('/funcionarios');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Verifica se está ordenado por nome
    const nomes = response.body.map(f => f.nome);
    const nomesOrdenados = [...nomes].sort();
    expect(nomes).toEqual(nomesOrdenados);
  });
});